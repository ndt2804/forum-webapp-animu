var express = require('express');
var router = express.Router();
var schemas = require('../models/schemas.js');
const { multiMongooseToObj }  = require('../utils/mongoose.js');

const index = async (req, res, next) => {
    try {
      let room = schemas.room;
      let roomData = await room.find({});
      res.render('room', { title: 'Menu App', data: multiMongooseToObj(roomData) });
    } catch (err) {
      next(err);
    }
  };
module.exports = { index };
