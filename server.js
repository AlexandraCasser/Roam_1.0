var express = require('express');
var bodyParser = require('body-parser');
var app = express();
// var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost/ancient-brook-75923';
var mongoose = require('mongoose');

// mongoose.connect(mongoUri);

app.use(bodyParser.json());

app.use(express.static('public'));

var sightingsController = require('./controllers/sightings.js');
app.use('/sightings', sightingsController);

mongoose.connect('mongodb://localhost:27017/roam');

mongoose.connection.once('open', function(){
		app.listen(3000, function(){
		console.log('====================')
		console.log('running on 3000')
		console.log('====================')
	})
})
