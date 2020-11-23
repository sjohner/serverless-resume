function sendMessage(){
    // Get data entered and create data to send to the API
	var name = document.getElementById("name").value;
	var subject = document.getElementById("subject").value;
	var email = document.getElementById("email").value;
	var message = document.getElementById("message").value;
	var data = {
		name : name,
		subject : subject,
		email : email,
		message : message
    };
    
    // Post the request to the API
	$.ajax({
		type: "POST",
		url : "<API Stage Invoke URL>/sendemail",
		dataType: "json",
		crossDomain: "true",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(data), 
		success: function () {
			// Clear form and show a success message
			alert("Thank you for your message!");
			document.getElementById("contact-form").reset();
			location.reload();
		},
	  	error: function () {
			// Show an error message
			console.log(textStatus);
			console.log(errorThrown)
			alert("Unfortunately an error occured. Please try again.");
		  }
	});
}
