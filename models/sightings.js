var mongoose = require('mongoose');

var sightingSchema = mongoose.Schema({
	species: String,
	number: Number,
	daytime: String,
	location: Number,
	lat: Number,
	lng: Number
});

var Sighting = mongoose.model('Sighting', sightingSchema);

// var sightingSchema.index({location: '2dsphere'});

module.exports = Sighting;