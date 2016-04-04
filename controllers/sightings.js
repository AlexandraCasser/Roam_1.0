var express = require('express');
var router = express.Router();
var Sighting = require('../models/sightings.js');

router.get('/', function(req, res){
	// 	res.send('here are locations');
	// 	var testSighting = new Sighting({ 
	// 		species: "wolf",
	// 		number: 3,
	// 		daytime: false
	// });
	// 	testSighting.save(function(err, data){
	// 		res.send("test target saved");

	Sighting.find({}, function(err, sightings){
		res.json(sightings);
	});
});

router.post('/', function(req, res){
	Sighting.create(req.body, function(err, sighting) {
		console.log("here's req.body" + req.body);
		res.send(sighting);
	});  
});

router.post('/edit/', function(req, res){
	Sighting.findByIdAndUpdate(req.params.id, function(err, data){
		console.log(req.body);
		res.send("edit route hit")
	});
});



router.delete('/delete/:id', function(req, res){
	Sighting.findByIdAndRemove(req.params.id, function(err, data){
		res.send("ice cream")
	});
});




module.exports = router;