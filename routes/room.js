var express = require('express');
var router = express.Router();
var schemas = require('../models/schemas.js');
const { multiMongooseToObj }  = require('../utils/mongoose.js');


router.get('/', async(req, res) => {
    let room = schemas.room;
    let roomResult = await room.find({}).then( (roomData) => {
       res.render('room', {title:'Menu App', data: multiMongooseToObj(roomData)});

    });
  });
  
module.exports = router;