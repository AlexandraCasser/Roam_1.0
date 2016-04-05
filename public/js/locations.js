$(function() {
	// Google Map Settings
	var initialize = function () {
		var map = new google.maps.Map(document.getElementById('map'), {
		  zoom: 6,
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


//set custom icons
// var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
// var icons = {
//   wolf: {
//     icon: iconBase + 'silhouette.png'
//   },
  // library: {
  //   icon: iconBase + 'library_maps.png'
  // },
  // info: {
  //   icon: iconBase + 'info-i_maps.png'
  // }
// };

var addMarkers = function(map) {
	//ajax call to get locations data from 'locations/json' route
	$.ajax('/sightings')
	 .done(function(result) {
	 	// console.log('RESULT:', result);
			// add location markers
			console.log(result)
			var infoWindow = new google.maps.InfoWindow({
  		});
			for (var i=0; i < result.length; i++) {
				marker = new google.maps.Marker ({
				    map: map,
				    // icon: 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png',
				    position: { lat: result[i].lat, lng: result[i].lng },
				    // title: result[i].species
				    // if (result[i].species === "wolf") {
				    // 	(result[i].icon: 'css/icons/silhouete.png')
				    // }
				    // else {
				    // 	result[i].icon: 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png';
				    // }
				    info: result[i].species,
				    infowindow: infoWindow
				});

				google.maps.event.addListener( marker, 'click', function() {		
   				infoWindow.setContent( this.info );
   				infoWindow.open( map, this );		
				});
		  };
		});
} // end addMarkers