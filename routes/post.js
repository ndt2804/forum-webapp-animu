var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var schemas = require('../models/schemas.js');
const { multiMongooseToObj }  = require('../utils/mongoose.js');


/* GET home page. */
router.get('/', async(req, res, next) => {
    const post = schemas.post;
    const postResult = await post.find({}).then( (postData) => {
       res.render('post', {title:'Menu App', post: multiMongooseToObj(postData)});

    });
});

router.get('/:id', async(req, res) => {
    let sesh = req.session;

    if (!sesh.loggedIn) {
        res.render('post', {title:'Edit', loggedIn:false, error:'Invalid Request'});
    } else {
        let id = req.params.id;
        let err = '';

        let post = schemas.post;
        let qry = {_id:id};

        let postResult = await post.find(qry).then( (postData) => {
            if (postData == null) {
                err = 'Invalid ID';
            }

            res.render('post', {title:'Edit Menu', post:postData, loggedIn:sesh.loggedIn, error:err});
        });
    }
});

router.get('/delete/:slug', async(req, res) => {
    let sesh = req.session;

    if (!sesh.loggedIn) {
        res.redirect('/login');
    } else {
        let post = schemas.post;
        let slug = req.params.slug;
        let qry = {_id:slug};
        let deleteResult = await post.deleteOne(qry);
        res.redirect('/');
    }
});

router.post('/save', async(req, res) => {
    let sesh = req.session;

    if (!sesh.loggedIn) {
        res.redirect('/login');
    } else {
        let postTitle = req.body.title;
        let postDescription = req.body.description;
        let postImage = req.body.image;

        let post = schemas.post;


        let saveData = {
            $set: {
                title: postTitle,
                description: postDescription,
                image: postImage
            }
        }

        let updateResult = await menu.updateOne( saveData);
        res.redirect('/');
    }
});

router.post('/new', async(req, res) => {
         let postTitle = req.body.title;
         let postDescription = req.body.description;
         let postImage = req.body.image;

    let newPost = new schemas.post({
                         title: postTitle,
                         description: postDescription,
                         image: postImage
                     });
        newPost.save()
         .then(() => res.redirect('/'))
         .catch(error => {      
         });


    // if (!sesh.loggedIn) {
    //     res.redirect('/login');
    // } else {
    //     let postId = req.body.postId;
    //     let postTitle = req.body.postTitle;
    //     let postDescription = req.body.postDescription;
    //     let postImage = req.body.postImage;
    //     let post = schemas.post;
    //     let qry = {title:postTitle};

    //     let searchResults = await post.findOne(qry).then( async(userData) => {
    //         if (!userData) {
    //             // ok to add menu
    //             let newPost = new schemas.post({
    //                 title: postTitle,
    //                 description: postDescription,
    //                 image: postImage
    //             });

    //             let savePost = await newPost.save();
    //         }
    //     });

    //     res.redirect('/');
    // }
});

module.exports = router;