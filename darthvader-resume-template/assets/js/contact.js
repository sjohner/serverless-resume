function sendMessage(event){
	//event.preventDefault;
    // Get data entered and create data to send to the API
	var name = document.getElementById("name").value;
	var subject = document.getElementById("subject").value;
	var email = document.getElementById("email").value;
	var message = document.getElementById("message").value;
	var formData = {
		name : name,
		subject : subject,
		email : email,
		message : message
	};

	// Post the request to the API
	// Change the url to either /rest/contact/ for the AWS lab or to your function endpoint URL for the Azure lab
	$.ajax({
		url : "",
		type: "POST",
		contentType: "application/json; charset=utf-8",
		//dataType: "json",
		data: JSON.stringify(formData),
		cache: false
	})
	// using the done promise callback
	.done(function(data) {
		console.log('complete done');
		// log data to the console so we can see
		console.log(data);
		$('form').html('<div class="alert alert-success">' + data.status + '</div>');
	});

	// stop the form from submitting the normal way and refreshing the page
	event.preventDefault();
}
