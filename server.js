// creating HTTP server

// so that we can use express
const express = require('express');
// so that we can use dotenv
const dotenv = require('dotenv');
// so that we can use morgan [used to debug the requests] [helpful in finding errors]
const morgan = require('morgan');
// so that we can use bodyparser [middleware] [used for JSON]
const bodyparser = require('body-parser');
// so that we can use path so that we can access diff files from this
const path = require('path');
// so that we can connect database which is in database file
const connectDB  = require('./server/database/connection')

const app = express();
// giving the path of config.env file taki waha se variables lele
dotenv.config({path:'config.env'});
// we will keep our port in .env file and if not there then 3000
const PORT = process.env.PORT || 3000;


// log requests
app.use(morgan('tiny'));

// mongoDB connection
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}));


// set view engine [ejs] is used , it will convert the code to HTML
app.set("view engine", "ejs");
// Below statement you can use if create a new folder in views and keep your files there
// app.set("views",path.resolve(__dirname,"views/"))

// loading assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")));
app.use('/img',express.static(path.resolve(__dirname,"assets/img")));
app.use('/js',express.static(path.resolve(__dirname,"assets/js")));


// loading routers
// isse kya hoga ki hum routes ko alag file se access krege
app.use('/',require('./server/routes/router'));

// listening on PORT    
app.listen(PORT,(req,res) =>{
    // yai puchna hai why port is not accessed
    console.log(`Server is running on HTTP localhost:${PORT}`)
});