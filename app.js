const express = require("express");
const mongoose = require("mongoose");

const noteRoutes = require("./routes/note");

mongoose
  .connect("mongodb+srv://zouyos:Aouvoa1b@cluster0.4zx65dt.mongodb.net/")
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/api/notes", noteRoutes);

module.exports = app;
