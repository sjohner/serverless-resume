'use strict';
console.log('Loading sendemail function');

// AWS SDK is needed to interact with Amazon SES
const AWS = require('aws-sdk');
const SES = new AWS.SES();

// Replace sender@example.com with your "From" address.
// This address must be verified with Amazon SES.
const sender = "Resume Website Contact Form <sender@example.com>";

// Replace recipient@example.com with a "To" address. If your account 
// is still in the sandbox, this address must be verified.
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
// The output from a Lambda proxy integration must be 
// in the following JSON object. The 'headers' property 
// is for custom response headers in addition to standard 
// ones. The 'body' property  must be a JSON string. For 
// base64-encoded payload, you must also set the 'isBase64Encoded'
// property to 'true'.
function sendResponse(responseCode, responseBody) {
    let response = {
    statusCode: responseCode,
        headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "http://jhnr.s3-website.eu-central-1.amazonaws.com",
            "Access-Control-Allow-Methods": "OPTIONS,POST"
        },
        body: JSON.stringify(responseBody)
    };
    console.log("response: " + JSON.stringify(response));
    return response;
}

