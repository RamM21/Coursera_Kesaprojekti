const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const mail = require('./routes/mail')


const app = express();
app.use(bodyparser.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use('/',mail)

module.exports = app;