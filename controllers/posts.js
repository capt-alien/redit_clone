const Post = require('../models/post');

module.exports = (app) => {

    // SHOW  FIX THIS!!!
    app.get('/posts/:id', (req, res) => {
      Review.findById(req.params.id).then((review) => {
        res.render('reviews-show', { review: review })
      }).catch((err) => {
        console.log(err.message);
      })
    })

  // CREATE
  app.post('/posts/new', (req, res) => {
    // INSTANTIATE INSTANCE OF POST MODEL
    const post = new Post(req.body);

    // SAVE INSTANCE OF POST MODEL TO DB
    post.save((err, post) => {
      // REDIRECT TO THE ROOT
      return res.redirect(`/`);
    })
  });

};
