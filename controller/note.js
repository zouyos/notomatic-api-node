const Note = require("../model/Note");

exports.create = (req, res, next) => {
  const note = new Note({
    ...req.body,
  });
  note
    .save()
    .then((note) => res.status(201).json(note))
    .catch((err) => res.status(400).json({ err }));
};

exports.getAll = (req, res, next) => {
  Note.find()
    .then((notes) => res.status(200).json(notes))
    .catch((err) => res.status(400).json({ err }));
};

exports.getById = (req, res, next) => {
  Note.findOne({ _id: req.params.id })
    .then((note) => res.status(200).json(note))
    .catch((error) => res.status(404).json({ error }));
};

exports.updateById = (req, res, next) => {
  Note.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => {
      return Note.findOne({ _id: req.params.id })
        .then((note) => res.status(200).json(note))
        .catch((error) => res.status(404).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteById = (req, res, next) => {
  Note.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet supprimé" }))
    .catch((error) => res.status(400).json({ error }));
};
