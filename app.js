var express  = require('express');
var mongoose = require('mongoose');
var app      = express();
var database = require('./config/database');
var bodyParser = require('body-parser');         // pull information from HTML POST (express4)


// Import path module, to work with file and directory paths
var path = require('path');
//Add Express-Handlebars (template engine) to the project
const exphbs = require('express-handlebars');
//Set root folder for serving static assets
app.use(express.static(path.join(__dirname, 'public')));
// Initialize built-in middleware for urlencoding and json
app.use(express.urlencoded({extended: true}));
app.use(express.json());


var port     = process.env.PORT || 8000;
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json


mongoose.connect(database.url);

var Movie = require('./models/movie');

 
//get all books data from db
app.get('/api/movies', function(req, res) {
	// use mongoose to get all todos in the database
	Movie.find(function(err, movies) {
		// if there is an error retrieving, send the error otherwise send data
		if (err)
			res.send(err)
		res.json(movies); // return all books in JSON format
	});
});

app.listen(port);
console.log("App listening on port : " + port);

