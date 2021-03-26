'use strict';
console.log('Loading sendemail function');

// AWS SDK is needed to interact with Amazon SES
const AWS = require('aws-sdk');
const SES = new AWS.SES();

// Replace sender@example.com with your "From" address.
// This address must be verified with Amazon SES.
const sender = "Resume Website Contact Form <sender@example.com>";

// Replace sender@example.com with a "To" address
const recipient = "sender@example.com";

// The character encoding for the email.
const charset = "UTF-8";
 
exports.handler = async (event) => {
    // Handle OPTIONS requests (e.g. CORS preflight requests)
    if (event.httpMethod === 'OPTIONS') {
        return sendResponse("204", null)
    }
    // Handle POST Requests
    if (event.httpMethod === 'POST') {
        if (event.body !== null && event.body !== undefined) {
            let name = '';
            let subject = '';
            let email = '';
            let message = '';
            let status = '';
            let responseCode;
            console.log("request: " + JSON.stringify(event));
            
            // Parse request body
            if (event.body) {
                let body = JSON.parse(event.body)
                if (body.name) 
                    name = body.name;
                if (body.subject) 
                    subject = body.subject;
                if (body.email) 
                    email = body.email;
                if (body.message) 
                    message = body.message;
            }
            
            // The email body for recipients with non-HTML email clients.
            let body_text = "Someone wants to contact you!\r\n\r\n"
                        + "Name: " + name + "\nEmail: " + email + "\nMessage:\r\n" + message
                        + "\r\n\r\n--- This email was sent with Amazon SES ---";
            console.log("message_body: " + body_text);
            
            // Prepare email
            let params = { 
                Source: sender, 
                Destination: { 
                    ToAddresses: [
                        recipient 
                    ],
                },
                Message: {
                    Subject: {
                        Data: subject,
                        Charset: charset
                    },
                    Body: {
                        Text: {
                            Data: body_text,
                            Charset: charset 
                        },
                    }
                },
            };
            
            // Send email using Amazon SES
            console.log("trying to send email");
            try {
                console.log("try");
                await SES.sendEmail(params).promise();
                console.log("params" + JSON.stringify(params));
                responseCode = 200;
                status = "Email sent!"
            } catch (e) {
                console.log("catcg");
                console.error(e);
                responseCode = 400;
                status = "Sending failed"
            };
            
            // Create response body
            let responseBody = {
                name: name,
                subject: subject,
                email: email,
                message: message,
                input: event,
                status: status
            };

            return sendResponse(responseCode, responseBody)
        }
    };
}

// Create response
// Make sure that the function response includes the allow origin header which points to your resume website
// Add the URL of your resume website to "Access-Control-Allow-Origin"
function sendResponse(responseCode, responseBody) {
    let response = {
    statusCode: responseCode,
        headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "<CloudFront URL of your resume website>",
            "Access-Control-Allow-Methods": "OPTIONS,POST"
        },
        body: JSON.stringify(responseBody)
    };
    console.log("response: " + JSON.stringify(response));
    return response;
}