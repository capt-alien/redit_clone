// requirements
require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
require('./data/reddit-db');


var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
var exphbs = require('express-handlebars');
const app = express();
app.use(cookieParser()); // Add this after you initialize express.

var checkAuth = (req, res, next) => {
  console.log("Checking authentication");
  if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
    req.user = null;
  } else {
    var token = req.cookies.nToken;
    var decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }

  next();
};
app.use(checkAuth);

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

//Midleware
require('./controllers/posts')(app);
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);

const Post = require('./models/post');
const Comment = require('./models/comment');



//Run the app
app.listen(3000, () => {
  console.log('App listening on port 3000!')
})

module.exports = app;
