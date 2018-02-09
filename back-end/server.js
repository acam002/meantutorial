var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var checkAuthenticated = require('./services/checkAuthenticated');

var auth = require('./controllers/auth');
var message = require('./controllers/message');
var cors = require('./services/cors');

// Middleware to parse json
app.use(bodyParser.json());

// Allows Cross Origin Resource Sharing with Express
app.use(cors);


//Get method to get the documents in the database
app.get('/api/message', message.get);


// An express endpoint that receives a post and saves into mongo
// ee the main controller in the front end which does an HTTP post, url is the endpoint
app.post('/api/message', checkAuthenticated, message.post);

app.post('/auth/register', auth.register);



// Connect application to mongo
mongoose.connect("mongodb://localhost:27017/test", function(err,db) {
    if (!err){
        console.log("We are connected to mongo");
    }
})

// Server code with callback function
var server = app.listen(5000, function(){
    console.log('Listening on port ', server.address().port);
})
