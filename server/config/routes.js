const mongoose = require('mongoose');
const Fighter = mongoose.model('Fighter');
const fighters = require('../controllers/fighters.js');
const path = require('path');

module.exports = (app)=>{
  app.get('/dbfighters', (req, res, next)=>{fighters.getAll(req, res, next)});
  app.post('/dbfighters/add', (req, res, next)=>{fighters.addThis(req, res, next)});
  app.post('/dbfighters/delete/', (req, res, next)=>{fighters.deleteThis(req, res, next)});
  app.post('/dbfighters/update/', (req, res, next)=>{fighters.updateThis(req, res, next)});
  app.get('/dbfighters/:id', (req, res, next)=>{fighters.getThis(req, res, next)});

  app.all('*', (req, res, next)=>{
    res.sendFile(path.resolve('./public/dist/index.html'))
  });
}
