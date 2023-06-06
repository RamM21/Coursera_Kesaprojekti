const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');


const app = express();
app.use(bodyparser.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());


module.exports = app;