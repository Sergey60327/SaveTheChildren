$("#information").hide();
$("#previous").hide();

var app = angular.module("myApp",[]);
var mainURL = "https://maps.googleapis.com/maps/api/geocode/json?";
var addressP;
var key = "AIzaSyATw30tgbosz8iKN0zi2WVL5y-jxEBPGto";

var weatherURL = "api.openweathermap.org/data/2.5/weather?q="


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
			var queryURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query="+addressP+"&location="+response.data.results[0].geometry.location.lat+","+response.data.results[0].geometry.location.lng+"&key=AIzaSyB0TQy5qiEIcvgm0puF1VdzKCbMXu1tgPA"
;

			$http({
			method: "GET",
			url: queryURL
		}).then(function (childResponse){
			console.log("HELLO", childResponse.data);
			var photoReference = childResponse.data.results[0].photos[0].photo_reference;

			var imageURL = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference="+photoReference+"&key=AIzaSyB0TQy5qiEIcvgm0puF1VdzKCbMXu1tgPA"
			$http({
				method: "GET",
				url: imageURL
		}).then(function (secondChildResponse){
			$("#information").show();
			$("#previous").show();
			$("#city").html(addressP);
			console.log(secondChildResponse.config.url);
			var image = $("<img>");
			image.attr("src",secondChildResponse.config.url);
			$(".background").hide();
			$(".search").hide();
			$("#background").empty();
			$("#background").append(image);
			image.addClass("backgroundImage");

			var widget = $("<div id='widget'></div>");
			widget.css({
			    position: 'absolute',
    			top: '53%',
    			left: '35%',
			});
			$("#background").append(widget);
			_aqiFeed({    
  display:"<div style='color:#ffffff;max-width:180px;text-align:center;'><small>Air Quality Index:</small> <div style='font-size:88px;height:100px;padding-bottom:30px;'>%aqiv</div> %impact</div>",  
  container:"widget",    
  city: addressP
  });  
		});
		})

var weatherURL = "http://api.openweathermap.org/data/2.5/weather?lat="+response.data.results[0].geometry.location.lat+"&lon="+response.data.results[0].geometry.location.lng+"&appid=2e0b1f9b2b01a0eac68955d495e769b7";
		
		$http({
				method: "GET",
				url: weatherURL
		}).then(function (thirdChildResponse){
			var temp = thirdChildResponse.data.main.temp;
			var fahrenheitTemp = temp*(9/5)-(459.67);
			console.log(fahrenheitTemp);
		})

		});

		


	}
});

$("#home").on("click",function(){
	$("#information").hide();
	$("#previous").hide();
	$(".background").show();
	$(".search").show();
	widget.hide();

})
