  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD056csgljl4TQJI0FoQOsg_6uP3CuXVsM",
    authDomain: "airqualityweathergroupproject.firebaseapp.com",
    databaseURL: "https://airqualityweathergroupproject.firebaseio.com",
    storageBucket: "airqualityweathergroupproject.appspot.com",
    messagingSenderId: "1010836363754"
  };
  firebase.initializeApp(config);
 
 //Global Variables Defined
  var emailAddress;
  var db = firebase.database();
  var cityToAdd;
    
  //Submission of Email Address
  $("#search").click(function(event){
  	firebaseFunction(event);
  });
  
  $("#previous").on("click",".city-buttons", function(event){
  	console.log("testing");
  	angular.element("#mycontroller").scope().myFunction();
  });
  
  
  	//#submit-btn is the submission button for the email
  function firebaseFunction(event){
    //#emailinput is the input field for the email
  	emailAddress = $("#email").val().trim().replace(".","").replace("@","").toLowerCase();
  	cityToAdd = $("#locationdata").val().trim();
  	console.log(app);
 	//localStorage.setItem("emailAddress", emailAddress);
  	db.ref("/userRecords/").once("value", function(snapshot){
  	//If firebase database is empty and not produce an error when checking if emailAddress already exists
  		if(snapshot.val() == null){
  			console.log("1");
  			db.ref("/userRecords/" + emailAddress + "/" + cityToAdd).set({
  				city: cityToAdd,
  				timeStamp: firebase.database.ServerValue.TIMESTAMP
 			});
 			db.ref("/userRecords/" + emailAddress).orderByChild("timeStamp").limitToLast(5).once("value", function(snapshot){
				$.each(snapshot.val(), function(i,val){
					createButtons(val.city);
				});
			});
  		}
  		//to check if emailAddress already exists in database
  		else if(snapshot.val().hasOwnProperty(emailAddress) === false){
  			console.log("2");
			console.log(snapshot.val().hasOwnProperty(emailAddress));
			db.ref("/userRecords/" + emailAddress + "/" + cityToAdd).set({
				city: cityToAdd,
				timeStamp: firebase.database.ServerValue.TIMESTAMP
			});
			db.ref("/userRecords/" + emailAddress).orderByChild("timeStamp").limitToLast(5).once("value", function(snapshot){
				$.each(snapshot.val(), function(i,val){
					createButtons(val.city);
				});
			});
		}
		//if emailAddress already exists in database, send and retrieve for buttons
		else if(snapshot.val().hasOwnProperty(emailAddress) === true){
			console.log("3");
			db.ref("/userRecords/" + emailAddress + "/" + cityToAdd).set({
					city: cityToAdd,
					timeStamp: firebase.database.ServerValue.TIMESTAMP
			});
			db.ref("/userRecords/" + emailAddress).orderByChild("timeStamp").limitToLast(5).once("value", function(snapshot){
				$.each(snapshot.val(), function(i,val){
					createButtons(val.city);
				});
			});
		}	
  	});
  }
  
  function createButtons(val){
  		var newBTN = $("<button>");
  		newBTN.attr("id","discover");
  		newBTN.attr("class","city-buttons");
  		newBTN.attr("ng-click","myFunction()");
  		$("#previous").append(newBTN);
  }
  
	
 	
  
  

