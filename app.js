const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const noteRoutes = require('./routes/note');
const userRoutes = require('./routes/user');

const dbUrl = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_URL}`;

mongoose
  .connect(dbUrl)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONT_END_DOMAIN);
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', process.env.FRONT_END_DOMAIN);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(200);
});

app.use('/api/note', noteRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
