// requirements
const express = require('express')
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
require('./data/reddit-db');

var exphbs = require('express-handlebars');
const app = express()

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

//Midleware
const postsController = require('./controllers/posts');
postsController(app);

const Post = require('./models/post');



//Run the app
app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
