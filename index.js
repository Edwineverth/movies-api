const express = require('express');

const app = express();

const {config} = require('./config/index');

// app.get('/', function(req,res){
//     res.send('hello world')
// });

// app.get('/json', (req,res)=>{
//     res.json({hello:'world'})
// });


const moviesApi = require('./routers/movies');

moviesApi(app);

app.listen(config.port, function() {
    console.log(`listening http://localhost:${config.port}`)
});