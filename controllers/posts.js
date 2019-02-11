const Post = require('../models/post');




module.exports = (app) => {
    //index
      app.get('/', (req, res) => {
        // res.render('home', {{posts}});
        Post.find({})
        .then(posts => {
          res.render("posts-index", { posts });
        })
        .catch(err => {
          console.log(err.message);
        });

    // NEW
    app.get('/post/new', (req, res) => {
        res.render('posts-new.handlebars');
    })


  // CREATE
  app.post('/post/new', (req, res) => {
    // INSTANTIATE INSTANCE OF POST MODEL
    const post = new Post(req.body);
    // SAVE INSTANCE OF POST MODEL TO DB
    post.save((err, post) => {
      // REDIRECT TO THE ROOT
      return res.redirect(`/`);
    })
  });


// single post
  app.get("/posts/:id", function(req, res) {
    // LOOK UP THE POST
    Post.findById(req.params.id).populate('comments').then((post) => {
      res.render('posts-show.handlebars', { post })
    }).catch((err) => {
      console.log(err.message)
    });
});



  // SUBREDDIT
    app.get("/n/:subreddit", function(req, res) {
      Post.find({ subreddit: req.params.subreddit })
        .then(posts => {
          res.render("posts-index", { posts });
        })
        .catch(err => {
          console.log(err);
        });
    });


  })





};
