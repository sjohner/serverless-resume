module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    context.log("request: " + JSON.stringify(req));

    let name = '';
    let subject = '';
    let email = '';
    let form_message = '';

    context.log("request: " + JSON.stringify(req.body));
            
    // Parse request body
    if (req.body) {
        if (req.body.name) 
            name = req.body.name;
        if (req.body.subject) 
            subject = req.body.subject;
        if (req.body.email) 
            email = req.body.email;
        if (req.body.message) 
            form_message = req.body.message;
    }
            
    // The email body for recipients
    let body_text = "Someone wants to contact you!\r\n\r\n"
        + "Name: " + name + "\nEmail: " + email + "\nMessage:\r\n" + form_message
        + "\r\n\r\n--- This email was sent using Azure Functions and SendGrid ---";
    
    console.log("message_body: " + body_text);

    var message = {
         "personalizations": [ { "to": [ { "email": "<your email address>" } ] } ],
        from: { email: "<your email address>" },        
        subject: req.body.subject,
        content: [{
            type: 'text/plain',
            value: body_text
        }]
    };

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: JSON.stringify({'status': "Message sent successfully"})
    };
    context.done(null, {message});
}