const crypto = require('crypto');
const Note = require('../model/Note');

const secretKey = 'your-secret-key'; // Replace with a secure key
const algorithm = 'aes-256-ctr';

function encryptContent(content) {
  const cipher = crypto.createCipher(algorithm, secretKey);
  let encrypted = cipher.update(content, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

function decryptContent(content) {
  const decipher = crypto.createDecipher(algorithm, secretKey);
  let decrypted = decipher.update(content, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

exports.create = async (req, res, next) => {
  try {
    const noteObject = { ...req.body };
    delete noteObject.id;
    delete noteObject.userId;

    const encryptedContent = encryptContent(noteObject.content);

    const note = new Note({
      ...req.body,
      content: encryptedContent,
      userId: req.auth.userId,
    });

    const savedNote = await note.save();

    savedNote.content = decryptContent(savedNote.content);
    res.status(201).json(savedNote);
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const notes = await Note.find({ userId: req.auth.userId });

    const decryptedNotes = notes.map((note) => ({
      ...note.toObject(),
      content: decryptContent(note.content),
    }));
    res.status(200).json(decryptedNotes);
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.getById = async (req, res, next) => {
  try {
    const note = await Note.findOne({ _id: req.params.id });

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    if (note.userId !== req.auth.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    note.content = decryptContent(note.content);
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.updateById = async (req, res, next) => {
  try {
    const noteObject = { ...req.body };
    delete noteObject.userId;

    const note = await Note.findOne({ _id: req.params.id });

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    if (note.userId !== req.auth.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const encryptedContent = encryptContent(noteObject.content);

    await Note.updateOne(
      { _id: req.params.id },
      {
        ...noteObject,
        content: encryptedContent,
        _id: req.params.id,
        userId: req.auth.userId,
      }
    );

    const updatedNote = await Note.findOne({ _id: req.params.id });

    updatedNote.content = decryptContent(updatedNote.content);
    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.deleteById = (req, res, next) => {
  Note.findOne({ _id: req.params.id })
    .then((note) => {
      if (note.userId != req.auth.userId) {
        res.status(401).json({ message: 'Unauthorized' });
      }
      Note.deleteOne({ _id: req.params.id })
        .then(() => {
          res.status(200).json({ message: 'Note deleted' });
        })
        .catch((error) => res.status(401).json({ error }));
    })
    .catch((err) => req.status(400).json({ err }));
};
