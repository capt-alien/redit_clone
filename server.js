// requirements
const express = require('express')
const app = express()

// midleware
app.get('/',(req,res) =>
    res.send('What up Bitches!!?')
})

app.listen(3000, () =>{
    console.log('App listening on port 3000!')
})
