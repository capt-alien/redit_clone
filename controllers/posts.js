const Post = require('../models/post');
const User = require('../models/user');




module.exports = (app) => {
    //index
    app.get('/', (req, res) => {
        var currentUser = req.user;
        // res.render('home', {{posts}});
        console.log(req.cookies);
        Post.find().populate('author')
        .then(posts => {
            res.render("posts-index", { posts, currentUser});
        }).catch(err => {
            console.log(err.message);
        });
    });

    // NEW
    app.get('/post/new', (req, res) => {
        res.render('posts-new.handlebars');
    })

    // CREATE
    app.post("/post/new", (req, res) => {
        if (req.user) {
            var post = new Post(req.body);
            post.author = req.user._id;

            post
            .save()
            .then(post => {
                return User.findById(req.user._id);
            })
            .then(user => {
                user.posts.unshift(post);
                user.save();
                // REDIRECT TO THE NEW POST
                res.redirect(`/post/${post._id}`);
            })
            .catch(err => {
                console.log(err.message);
            });
        } else {
            return res.status(401); // UNAUTHORIZED
        }
    });



    // SHOW
    app.get("/post/:id", function (req, res) {
        var currentUser = req.user;
        Post.findById(req.params.id).populate('comments').lean()
        .then(post => {
            res.render("posts-show", { post, currentUser });
        })
        .catch(err => {
            console.log(err.message);
        });
    });

    // SUBREDDIT
    app.get("/n/:subreddit", function (req, res) {
        var currentUser = req.user;
        Post.find({ subreddit: req.params.subreddit }).lean()
        .then(posts => {
            res.render("posts-index", { posts, currentUser });
        })
        .catch(err => {
            console.log(err);
        });
    });


};
