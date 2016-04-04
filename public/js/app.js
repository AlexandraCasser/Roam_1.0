var app = angular.module('roam', []);

app.controller('SightingsListController', ['$http', '$scope', function($http, $scope){
  this.sightings = [];
  this.species = [];
  var controller = this;

  var seeIfUnique = function(input) {
  for (var i=0; i < controller.species.length; i++) {
    if (controller.species[i] === input) {
     return false
        }
    }
  return true
}

  this.editSighting = false;
  // console.log("at the beginning, editSighting is: ", this.editSighting);
  //same as saying "go to the url /sightings"
	$http.get('/sightings').then(
  //success
	function(response){
    controller.sightings = response.data;
    controller.sightings.forEach(function(thing) {
        // console.log("this is the thing:" + thing);
        if (seeIfUnique(thing.species)) {
            controller.species.push(thing.species);
        }
    });


	console.log('Sightings from the server: ', response);
	 },
	function(err){
		console.log(err);
	}
);

this.delete = function(sighting, index){
    // console.log(id);
  $http({
    method: 'Delete',
    url: '/sightings/delete/' + sighting._id,
    data: this
    }).then(
    function(response){
      console.log($scope)
    $scope.sightingsCtrl.sightings.splice(index, 1)

    }
  )
};

  this.editMe = function(sightingToEdit){
    controller.editSighting = true;
    controller.editedSighting = sightingToEdit;
    // console.log("NOW editSighting is " + editSighting)
  };

  this.edit = function(index, sighting){
    controller.editSighting = false;
    // console.log(sighting);
    // console.log("edit button hit");
    // console.log(this)

  $http({
    method: 'POST',
    url: '/sightings/edit',
    data: controller.editedSighting
  }).then({
  function(response){
    console.log($scope);
    console.log(response);
    $scope.sightingsCtrl.sightings.species = response.data.species;
    $scope.sightingsCtrl.sightings.number = response.data.number;
    $scope.sightingsCtrl.sightings.daytime = response.data.daytime;
    $scope.sightingsCtrl.sightings.lat = response.data.lat;
    $scope.sightingsCtrl.sightings.lng = response.data.lng
  },
  function(err){
    console.log(err)
  }
 })
};


//         this.updatedata = {};
//         this.edit = function(sighting, index){
//         // console.log(id);
//         $http({
//             method: 'PUT',
//             url: '/sightings/edit/' + sighting._id,
//             data: this
//         }).then(
//             function(response){
//                 console.log($scope)
//             $scope.sightingsCtrl.sightings.getAll();

//         }
//     )
// }

//Allows users to place markers on map
function initMap() {
  // var myLatLng = {lat: -25.363, lng: 131.044};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: {lat: -25.363882, lng: 131.044922 }
});
    map.addListener('click', function(e) {
    placeMarkerAndPanTo(e.latLng, map);
  });
}
function placeMarkerAndPanTo(latLng, map) {
  var marker = new google.maps.Marker({
    position: {lat: -25.363882, lng: 131.044922},
    map: map
});
  map.panTo(latLng);
}
        // https://developers.google.com/maps/documentation/javascript/examples/event-arguments
}]);



app.controller('CreateSightingController', ['$scope','$http', function($scope, $http){
 

  var controller = this;
  this.species = [];
  this.formData = {}
  this.spec = "";
  this.number = 0;
  this.daytime = "";
  this.lat = "";
  this.lng = ""


var seeIfUnique = function(input) {
  for (var i=0; i < controller.species.length; i++) {
    if (controller.species[i] === input) {
     return false
        }
    }
  return true
}


$http({
    method: 'GET',
    url: '/sightings'
}).then(function(result) {
    console.log('sightings results from the server: ', result.data);
    result.data.forEach(function(thing) {
        // console.log("this is the thing:" + thing);
        if (seeIfUnique(thing.species)) {
            controller.species.push(thing.species);
        }
    });
});


this.create = function(){
  console.log('The type is: ', typeof(controller.spec));
  var selection = controller.spec
  var result = selection.match(/\w+/)[0];

  // console.log('Trying to extract the value: ', controller.spec.split("↵"));
  // var str="The rain in SPAIN falls mainly on the plain";
  // var res = str.match(/\w+/);
  // console.log(res);

  controller.formData = {
    species: result,
    number: controller.number,
    daytime: controller.daytime,
    lat: controller.lat,
    lng: controller.lng
  }

console.log('This is the form data: ', controller.formData);

$http({
    method: 'POST',
    // console.log("posting new data")
    url: '/sightings',
    data: controller.formData
}).then(
    //success
    function(response){
        // console.log('response from the server: ', response);
        $scope.$$prevSibling.sightingsCtrl.sightings.push(response.data);
       
        controller.number = undefined;
        // console.log("posting number");
        controller.daytime = undefined;
        // console.log("posting daytime" + controller.daytime);
        controller.lat = undefined;
        // console.log("posting lat" + controller.lat);
        controller.lng = undefined
        // console.log("posting long")
    },
    //fail
    function(){
        console.log('woops');
    }
)
}


}]);  