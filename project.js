var app = angular.module("myApp",[]);
var mainURL = "https://maps.googleapis.com/maps/api/geocode/json?";
var addressP;
var key = "AIzaSyATw30tgbosz8iKN0zi2WVL5y-jxEBPGto";
app.controller("myCtrl", function($scope,$http){
	$scope.myFunction = function() {
		addressP = angular.element("#locationdata").val().trim();
		console.log(addressP);
		$http({
			method: "GET",
			url: mainURL + "address=" + addressP + "&key=" + key
		}).then(function (response){
			//.log(response.data.results[0].geometry.location.lat);
			console.log("Latitude is " + response.data.results[0].geometry.location.lat);
			console.log("Longitude is " + response.data.results[0].geometry.location.lng);
		});
	}
});