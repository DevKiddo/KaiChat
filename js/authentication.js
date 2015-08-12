// Create a new Firebase reference, and a new instance of the Login client
var isInitialized = false;
var firebaseRef = new Firebase('https://amber-inferno-5910.firebaseio.com/');

// Auto authenticate user 

firebaseRef.onAuth(function(authData) {
  // Once authenticated, instantiate Firechat with the user id and user name
  if (authData && !isInitialized) {
  	initChat(authData);
  	$('#container_demo').hide(); //hides login/registration form
  	$('#firechat-wrapper').show(); //shows chat
  }
});

// Create new user

function registerUser() {
	var username = document.getElementById("registerUsername").value;
	if (comparePasswords())
	var password = document.getElementById("registerPassword").value;
	firebaseRef.createUser({
		email    : username,
		password : password
	}, function(error, userData) {
		if (error) {
			alert(error, error);
		} else {
			console.log("Successfully created user account with uid:", userData.uid);
			loginUser(username, password); //automatically logs user in after registering

		}
	});
}

// Login user

function loginUser(username, password) {
	if (checkVariable(username)) {var username = document.getElementById("loginUsername").value;}
	if (checkVariable(password)) {var password = document.getElementById("loginPassword").value;}
	firebaseRef.authWithPassword({
		email    : username,
		password : password
	}, function(error, authData) {
		if (error) {
			alert("Login Failed! "+ error, error);
		} else {
			console.log("Authenticated successfully with payload:", authData);
			$('#container_demo').hide(); //hides login/registration form
			$('#firechat-wrapper').show(); //shows chat
		}

	}, {
		remember: checkLoginTerm() //login term for user 
	});
}

// Initialize FireChat after user has been authenticated

function initChat(authData) {
	var chat = new FirechatUI(firebaseRef, document.getElementById('firechat-wrapper'));
	chat.setUser(authData.uid, authData[authData.provider].email);
}


// Checks if variable does not exist

function checkVariable(variable) {
	if (typeof variable !== 'undefined')
		return false;
	return true;
}

// Checks if the user wants to remain logged in or not

function checkLoginTerm() {
	var result;
	if(document.getElementById('loginkeeping').checked) {
		result =  "default";
	} else {
		result = "sessionOnly";
	}
	return result;
}

// Compares for password equality when user is signing up

function comparePasswords(){
	if($('#passwordsignup').val()!=$('#registerPassword').val()){
		alert('Passwords do not match.');
		return false;
	}
	return true;
}



