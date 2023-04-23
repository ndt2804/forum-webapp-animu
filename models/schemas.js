var mongoose = require('mongoose');
var schema = mongoose.Schema;

let menuSchema = new schema({
    name: {type:String, require:true},
    icon: {type:String, require:true},
    menuUrl: {type:String, require:true},
    entryDate: {type:Date, default:Date.now}
});

let usersSchema = new schema({
    email: {type:String, require:true},
    pwd: {type:String, require:true},
    entryDate: {type:Date, default:Date.now}
});

let roomSchema = new schema({
    name: {type:String, require:true},
})

let menu = mongoose.model('menu', menuSchema, 'menu');
let users = mongoose.model('users', usersSchema, 'users');
let room = mongoose.model('room', roomSchema, 'room')
let mySchemas = {'menu':menu, 'users':users, 'room':room};

module.exports = mySchemas;