// Taken from https://aws.amazon.com/blogs/architecture/create-dynamic-contact-forms-for-s3-static-websites-using-aws-lambda-amazon-api-gateway-and-amazon-ses/
// and slightly adopted to match the resumé contact form we are using in this lab

function sendMessage(e) {
	e.preventDefault();
	
	// Do some basic input validation
	if ($("#name").val()=="") {
		alert ("Please enter your name");
		return;
	}
	if ($("#subject").val()=="") {
		alert ("Please enter a subjet to your message");
		return;
	}
	if ($("#email").val()=="") {
		alert ("Please enter your email address");
		return;
	}
	var reemail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,6})?$/;
	if (!reemail.test($("#email").val())) {
		alert ("Please enter valid email address");
		return;
	}

	// Get data entered and create data to send to the API
	var name = $("#name").val();
	var subject = $("#subject").val();
	var email = $("#email").val();
	var message = $("#message").val();
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