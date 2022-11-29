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


mongoose.connect(database.url)
.then(() => {
	app.listen(port);
	console.log("App listening on port : " + port);
})
.catch((err) => {console.log(err)})

var Movie = require('./models/movie');
const { title } = require('process');

 
//get all movies data from db
app.get('/api/movies', function(req, res) {

	Movie.find().count((err, count) => {
		
		let perPage = count;
		let page = 0;
		let filter = {};

		if(req.query.page && req.query.page > 0)
			page = req.query.page;
		
		if(req.query.perPage && req.query.perPage > 0)
			perPage = req.query.perPage;
		
		let skip = page * perPage;

		if(req.query.title) {
			let title = req.query.title;
			let regex = new RegExp(title, "i");

		filter = {title: regex};
		}
		
		Movie.find(filter, {},  {skip: skip, limit: perPage}, (err, movies) => {
			if (err)
				res.send(err)
 
			res.json(movies);
		});
	});

	
});

// get a movie from db by its id
app.get('/api/movies/:id', function(req, res) {
	let id = req.params.id;
	Movie.findById(id, function(err, book) {
		if (err)
			res.send(err)
 
		res.json(book);
	});
 
});



