const Post = require('../models/post');

module.exports = (app) => {
    // NEW
    app.get('/posts/new', (req, res) => {
        res.render('posts-new.handlebars');
    })


  // CREATE
  app.post('/posts/new', (req, res) => {
      console.log(req.body)
    // INSTANTIATE INSTANCE OF POST MODEL
    const post = new Post(req.body);
    console.log(req.body)

    // SAVE INSTANCE OF POST MODEL TO DB
    post.save((err, post) => {
      // REDIRECT TO THE ROOT
      return res.redirect(`/`);
    })
  });

};
