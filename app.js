const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Recipe = require('./models/recipe');

// connect mongoose to mongoDB database server
mongoose
  .connect(
    'mongodb+srv://Neirles:Neirles28@cluster0-s6xli.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch(error => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });

const app = express();
app.use(bodyParser.json());

//handle routing between different servers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

// handles display of all recipe
app.get('/api/recipes', (req, res, next) => {
  Recipe.find()
    .then(things => {
      res.status(200).json(things);
    })
    .catch(error => {
      res.status(400).json({
        error: error
      });
    });
});

//post route to handle addition of new recipe

app.post('/api/recipes', (req, res, next) => {
  const recipe = new Recipe({
    title: req.body.title,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    time: req.body.time,
    difficulty: req.body.difficulty
  });
  recipe
    .save()
    .then(() => {
      res.status(201).json({
        message: 'Post saved successfully!'
      });
    })
    .catch(error => {
      res.status(400).json({
        error: error
      });
    });
});

// Add get route to show individual recipe

app.get('/api/recipes/:id', (req, res, next) => {
  Recipe.findOne({ _id: req.params.id })
    .then(recipe => {
      res.status(200).json(recipe);
    })
    .catch(error => {
      res.status(404).json({
        error: error
      });
    });
});

module.exports = app;
