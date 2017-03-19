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

			var app = angular.module("myApp",[]);
			var queryURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query="+addressP+"&location="+response.data.results[0].geometry.location.lat+","+response.data.results[0].geometry.location.lng+"&key=AIzaSyBvWpEwYyFy8iHSBTxIzk3zBJ405daGIG4"
;

			$http({
			method: "GET",
			url: queryURL
		}).then(function (childResponse){
			console.log(childResponse);
			var photoReference = childResponse.data.results[0].photos[0].photo_reference;

			var imageURL = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference="+photoReference+"&key=AIzaSyBvWpEwYyFy8iHSBTxIzk3zBJ405daGIG4"
			$http({
				method: "GET",
				url: imageURL
		}).then(function (secondChildResponse){
			console.log(secondChildResponse.config.url);
			var image = $("<img>");
			image.attr("src",secondChildResponse.config.url);
			$(".background").hide();
			$(".search").hide();
			$("#background").empty();
			$("#background").append(image);
			image.addClass("backgroundImage");
		});
		})


		});
	}
});