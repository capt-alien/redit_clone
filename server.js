// requirements
const express = require('express')
const app = express()

//Midleware
app.get('/', (req, res) => {
  res.send('What up bitches!?!')
})


//Run the app
app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
