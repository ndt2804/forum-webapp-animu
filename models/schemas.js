var mongoose = require('mongoose');
var schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

let menuSchema = new schema({
    name: {type:String, require:true},
    icon: {type:String, require:true},
    menuUrl: {type:String, require:true},
    entryDate: {type:Date, default:Date.now}
});

const postSchema = new schema({
    title: { type:String, require:true },
    description: { type:String, require:true },
    image:{ type:String, require:true },
    roomPost: [{ type: schema.Types.ObjectId, ref: 'roomSchema' }],
    createAt: { type: Date, default: Date.now },
    userPost: { type: schema.Types.ObjectId, ref: 'usersSchema' },
    slug: { type: String, slug: 'title', unique: true},


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
let post = mongoose.model('post', postSchema, 'post')
let mySchemas = {'menu':menu, 'users':users, 'room':room, 'post':post};

module.exports = mySchemas;