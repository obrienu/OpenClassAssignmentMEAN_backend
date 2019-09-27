const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

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


module.exports = app;