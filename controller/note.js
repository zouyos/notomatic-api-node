const Note = require("../model/Note");

exports.create = (req, res, next) => {
  const noteObject = { ...req.body };
  delete noteObject.id;
  delete noteObject.userId;
  const note = new Note({
    ...req.body,
    _userId: req.auth.userId,
  });
  note
    .save()
    .then((note) => res.status(201).json(note))
    .catch((err) => res.status(400).json({ err }));
};

exports.getAll = (req, res, next) => {
  Note.find({ userId: req.auth.userId })
    .then((notes) => res.status(200).json(notes))
    .catch((err) => res.status(400).json({ err }));
};

exports.getById = (req, res, next) => {
  Note.findOne({ _id: req.params.id })
    .then((note) => {
      if (note.userId != req.auth.userId) {
        res.status(401).json({ message: "Unauthorized" });
      }
      res.status(200).json(note);
    })
    .catch((error) => res.status(404).json({ error }));
};

exports.updateById = (req, res, next) => {
  const noteObject = { ...req.body };
  delete noteObject.userId;

  Note.findOne({ _id: req.params.id })
    .then((note) => {
      if (!note) {
        return res.status(404).json({ message: "Note not found" });
      }
      if (note.userId !== req.auth.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      Note.updateOne(
        { _id: req.params.id },
        { ...noteObject, _id: req.params.id }
      )
        .then(() => {
          Note.findOne({ _id: req.params.id })
            .then((updatedNote) => {
              res.status(200).json(updatedNote);
            })
            .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((err) => res.status(400).json({ error: err }));
};

exports.deleteById = (req, res, next) => {
  Note.findOne({ _id: req.params.id })
    .then((note) => {
      if (note.userId != req.auth.userId) {
        res.status(401).json({ message: "Unauthorized" });
      }
      Note.deleteOne({ _id: req.params.id })
        .then(() => {
          res.status(200).json({ message: "Note deleted" });
        })
        .catch((error) => res.status(401).json({ error }));
    })
    .catch((err) => req.status(400).json({ err }));
};
