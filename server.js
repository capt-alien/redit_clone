// requirements
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
var exphbs = require('express-handlebars');


require('./controllers/posts.js')(app);
require('./data/reddit-db');


// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//Midleware

app.get('/', (req, res) => {
  res.render('home', {msg:'Handlebars are awesome!'});
})



//Run the app
app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
