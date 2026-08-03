const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const noteRoutes = require('./routes/note');
const userRoutes = require('./routes/user');

const dbUrl = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_URL}`;

mongoose
  .connect(dbUrl)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((err) => {
    console.error('Connexion à MongoDB échouée !');
    console.error(err);
  });

const app = express();

app.use(
  cors({
    origin: process.env.FRONT_END_DOMAIN,
    credentials: true,
  }),
);

app.use(express.json());

app.use('/api/note', noteRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
