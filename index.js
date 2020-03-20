const express = require('express');

const app = express();

const { config } = require('./config/index');

// app.get('/', function(req,res){
//     res.send('hello world')
// });

// app.get('/json', (req,res)=>{
//     res.json({hello:'world'})
// });

const moviesApi = require('./routers/movies');
const {
  logErrors,
  errorHandler,
  wrapErrors
} = require('./utils/moks/middleware/error-Handlers');

const notFoundHandler = require('./utils/moks/middleware/notFoundHandler');
//Middleware body parser
app.use(express.json());

//routes
moviesApi(app);

//Catch 404
app.use(notFoundHandler);
//Los middleware siempre van al final de las rutas;
// Manejadores de errores
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, function() {
  console.log(`listening http://localhost:${config.port}`);
});
