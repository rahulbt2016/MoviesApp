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

const fetch = require('cross-fetch');


var port     = process.env.PORT || 8000;
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

app.engine('.hbs', exphbs.engine({ extname: '.hbs'}));
app.set('view engine', 'hbs');
 

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
		
		Movie.find(filter, {},  {skip: skip, limit: perPage, sort: {_id: 1}}, (err, movies) => {
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

//Insert a new movie to the db
app.post('/api/movies', function(req, res) {
	
	let genres, cast, languages, countries, directors, writers;

	if(req.body.genres)
		genres = req.body.genres.split(",");

	if(req.body.cast)
		cast = req.body.cast.split(",");

	if(req.body.languages)
		languages = req.body.languages.split(",");

	if(req.body.countries)
		countries = req.body.countries.split(",");
	
	if(req.body.directors)
		directors = req.body.directors.split(",");

	if(req.body.writers)
		writers = req.body.writers.split(",");

	Movie.create({
		plot: req.body.plot,
		genres: genres,
		runtime: req.body.runtime,
		rated: req.body.rated,
		cast: cast,
		num_mflix_comments: req.body.num_mflix_comments,
		poster: req.body.poster,
		title: req.body.title,
		metacritic: req.body.metacritic,
		fullplot: req.body.fullplot,
		languages: languages,
		countries: countries,
		released: req.body.released,
		directors: directors,
		writers: writers,
		awards: {
		  wins: req.body.awards_wins,
		  nominations: req.body.awards_nominations,
		  text: req.body.awards_text
		},
		lastupdated: req.body.lastUpdated,
		year: req.body.year,
		imdb: {
		  rating: req.body.imdb_rating,
		  votes: req.body.imdb_votes,
		  id: req.body.imdb_id
		},
		type: req.body.type,
		tomatoes: {
		  viewer: {
			rating: req.body.tomatoes_viewer_rating,
			numReviews: req.body.tomatoes_viewer_numReviews,
			meter: req.body.tomatoes_viewer_meter
		  },
		  dvd: req.body.tomatoes_dvd,
		  critic: {
			rating: req.body.tomatoes_critic_rating,
			numReviews: req.body.tomatoes_critic_numReviews,
			meter: req.body.tomatoes_critic_meter
		  },
		  lastUpdated: req.body.tomatoes_lastUpdated,
		  boxOffice: req.body.tomatoes_boxOffice,
		  website: req.body.tomatoes_website,
		  consensus: req.body.tomatoes_consensus,
		  rotten: req.body.tomatoes_rotten,
		  production: req.body.tomatoes_production,
		  fresh: req.body.tomatoes_fresh
		}
	}, function(err, movies) {
		if (err)
			res.render('error', { title: 'Error', message:'Something went wrong! Please try again later' });
		res.redirect('/');
	});
});

app.put('/api/movies/:Id', function(req, res) {
	// create mongose method to update an existing record into collection
	let genres, cast, languages, countries, directors, writers;

	if(req.body.genres)
		genres = req.body.genres.split(",");

	if(req.body.cast)
		cast = req.body.cast.split(",");

	if(req.body.languages)
		languages = req.body.languages.split(",");

	if(req.body.countries)
		countries = req.body.countries.split(",");
	
	if(req.body.directors)
		directors = req.body.directors.split(",");

	if(req.body.writers)
		writers = req.body.writers.split(",");

	let data = 
	{plot: req.body.plot,
	genres: genres,
	runtime: req.body.runtime,
	rated: req.body.rated,
	cast: cast,
	num_mflix_comments: req.body.num_mflix_comments,
	poster: req.body.poster,
	title: req.body.title,
	metacritic: req.body.metacritic,
	fullplot: req.body.fullplot,
	languages: languages,
	countries: countries,
	released: req.body.released,
	directors: directors,
	writers: writers,
	awards: {
	  wins: req.body.awards_wins,
	  nominations: req.body.awards_nominations,
	  text: req.body.awards_text
	},
	lastupdated: req.body.lastUpdated,
	year: req.body.year,
	imdb: {
	  rating: req.body.imdb_rating,
	  votes: req.body.imdb_votes,
	  id: req.body.imdb_id
	},
	type: req.body.type,
	tomatoes: {
	  viewer: {
		rating: req.body.tomatoes_viewer_rating,
		numReviews: req.body.tomatoes_viewer_numReviews,
		meter: req.body.tomatoes_viewer_meter
	  },
	  dvd: req.body.tomatoes_dvd,
	  critic: {
		rating: req.body.tomatoes_critic_rating,
		numReviews: req.body.tomatoes_critic_numReviews,
		meter: req.body.tomatoes_critic_meter
	  },
	  lastUpdated: req.body.tomatoes_lastUpdated,
	  boxOffice: req.body.tomatoes_boxOffice,
	  website: req.body.tomatoes_website,
	  consensus: req.body.tomatoes_consensus,
	  rotten: req.body.tomatoes_rotten,
	  production: req.body.tomatoes_production,
	  fresh: req.body.tomatoes_fresh
	}
}

	// save the movie
	Movie.findByIdAndUpdate({_id:req.params.Id}, data).then(function(err, movie) {
	

	res.send('Successful! Movie has been Updated.');
	}).catch((err) => res.send(err));
});



app.delete('/api/movies/:Id',function(req,res)
{
    Movie.findByIdAndRemove({_id:req.params.Id}).then(function(result)
    {
        console.log(result.toString());
        res.send('Successful! Movie has been Deleted.');
    })
    .catch((err) => res.send(err));

});

//Render Insert Movie Form
app.get('/addMovie', (req, res) => {

	res.render('addMovieForm', {title: "Movies App - Add Movie"});
});

//Render Update Movie Form
app.get('/updateMovie/:id', (req, res) => {
	let id = req.params.id;
	Movie.findById(id, function(err, book) {
		if (err)
			res.render('error', { title: 'Error', message:'Something went wrong! Please try again later' });
 
		res.render('updateMovieForm', {title: "Movies App - Update Movie", data: JSON.parse(JSON.stringify(book))});
	});
});

//Render Show Movies Page
app.get('/', function(req, res) {
	
	let page = req.query.page;
	let perPage = req.query.perPage;
	let title = req.query.title;
	
	if(!page) {
		page = 0;
	}

	if(!perPage) {
		perPage = 10;
	}

	if(!title) {
		title = "";
	}

	let regex = new RegExp(title, "i");

	let filter = {title: regex};

	Movie.find(filter).count((err, count) => {

		let url = "://" + req.headers.host + "/api/movies?perPage=" 
				+ perPage + "&page=" + page + "&title=" + title;

		if(req.headers.host == "localhost:" + port)
			url = "http" + url;
		else 
			url = "https" + url;

		
		fetch(url)
		.then((response) => response.json())
		.then((jsonData) => {
			
			res.render('showMovies', {data: jsonData, totalPages: (Math.ceil(count/perPage) - 1)});
		})
		.catch(function (err) {
			console.log("Unable to fetch -", err);
			res.render('error', { title: 'Error', message:err });
		});
	});

});

//Wrong route
app.get('*', function(req, res) {
	res.status(404).render('error', { title: 'Error', message:'Wrong Route' });   //Render error.hbs
});



