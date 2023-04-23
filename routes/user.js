var express = require('express');
var router = express.Router();
var schemas = require('../models/schemas.js');
const { multiMongooseToObj }  = require('../utils/mongoose.js');


router.get('/', async(req, res) => {
    let users = schemas.users;
    let userResult = await users.find({}).then( (userData) => {
       res.render('user', {title:'Menu App', data: multiMongooseToObj(userData)});

    });
  });
  
module.exports = router;