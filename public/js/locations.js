$(function() {

	// Google Map Settings
	var initialize = function () {
		var map = new google.maps.Map(document.getElementById('map'), {
		  zoom: 6,
		  // maxZoom: 15,
		  // minZoom: 5,
		  streetViewControl: false,
		  mapTypeControl: false,
		  center: new google.maps.LatLng(40.870949, -75.19043)
		  // mapTypeId: google.maps.MapTypeId.SATELLITE
		});

		addMarkers(map);

	} // end initialize

	// Display the map
	google.maps.event.addDomListener(window, 'load', initialize);

}); // end window onload

var addMarkers = function(map) {

	//ajax call to get locations data from 'locations/json' route
	$.ajax('/sightings')
	 .done(function(result) {
	 	// console.log('RESULT:', result);
			// add location markers

			for (var i=0; i < result.length; i++) {
				marker = new google.maps.Marker ({
				    map: map,
				    icon: 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png',
				    position: { lat: result[i].lat, lng: result[i].lng }
				    // title: result[i].species
				});
				console.log(result[i].daytime)
		  };
		});
} // end addMarkers