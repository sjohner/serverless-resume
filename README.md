# Introduction

The goal is to create your very own resume and publish it as a public website. For this you are going to use AWS serverless technologies.

The solution will look similar to the following diagram. You will use Amazon S3 storage and CloudFront to serve your static site.

In order for the visitors to get in touch with you, you will need a contact form. Completing the form will trigger an AWS Lambda function which in turn sends you an email with the form content. An example of this can be found here [https://d1hv5lii4xzlzo.cloudfront.net/](https://d1hv5lii4xzlzo.cloudfront.net/)



<p id="gdcalert1" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image1.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert2">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image1.png "image_tooltip")



## Some important side notes



*   Always select **region EU (Frankfurt) eu-central-1** to deploy your resource.
*   There is a [Google Sheets document available](https://docs.google.com/spreadsheets/d/1gHl6J_weZPpGoVSe850mGb1zTAI5aH3rNVbWeCZVkx0/edit?usp=sharing) where you can document the resources you created in the AWS account. **Please add all the resources you create to the spreadsheet**


## More information about Cloud and AWS

If you want to get familiar with essential AWS concepts and services. There are plenty of free training sessions available on [AWS training and certification](https://aws.training) or Youtube. You will need a (free) Amazon account for this.



*   [What is Cloud Computing?](https://youtu.be/dH0yz-Osy54) - 5min
*   [What is AWS?](https://youtu.be/a9__D53WsUs) - 5min
*   [How does Microsoft Azure Work](https://youtu.be/KXkBZCe699A) - 5min
*   [Inside a Google Datacenter](https://youtu.be/XZmGGAbHqa0) - 5min
*   [AWS Foundations: Getting Started with the AWS Cloud Essentials](https://www.aws.training/Details/Video?id=49639) - 1h

Login with your AWS credentials and get familiar with the [AWS console](https://powercoders.signin.aws.amazon.com/console?region=eu-central-1).

🚨 Since your accounts are only allowed to create resources in the EU (Frankfurt) eu-central-1 region, make sure you change the region accordingly.

Let me know if you were able to login and browse the AWS console. [This guide will help you to get started with the AWS console.](https://docs.aws.amazon.com/awsconsolehelpdocs/latest/gsg/getting-started.html)


# Step 1 - Create your HTML resume

First of all you need a resume. Some great examples of static websites built with HTML and CSS can be found [here](https://html5up.net/). All the templates you find there are 100% Free under the \
[Creative Commons](https://html5up.net/license) license This means you may use them but you need to give HTML5 UP credit for the design. There is a note in the footer section of the website that mentions HTML5 UP. Just leave it as is and you are done with attribution.

This lab is based on the [Read Only template from HTML5 UP](https://html5up.net/read-only) so it is recommended to use this one. The template contains a simple contact form which you are going to use later on.

Download the above mentioned template and adopt it to represent your resumé. You might want to add a profile pic and some basic information about you.

Adjust the _index.html_ file accordingly and replace the images in the _images_ folder if you want to. To check out your work you can launch index.html in your browser on your local machine.

To modify the template you can use whatever text editor you have. There are plenty of options out there which are free to use. Two great options to use are:



*   [Visual Studio Code](https://code.visualstudio.com/)
*   [Sublime Text](https://www.sublimetext.com/)

Don’t spend too much time on your resume. It just serves as an example and you can still tweak it later on when it is online.


# Step 2 - Deploy your resumé online

Deploy your resume online as an [Amazon S3 static website](https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html).

You might want to complete the following training sessions to get some basic understanding of Amazon Simple Storage Service



*   [Introduction to Amazon Simple Storage Service (S3)](https://www.aws.training/Details/eLearning?id=32727) - 15min
*   [Foundation of Amazon S3](https://www.aws.training/Details/eLearning?id=32728) - 35min

Whenever you are ready, start creating your resources. You can use [this walkthrough](https://docs.aws.amazon.com/AmazonS3/latest/dev/HostingWebsiteOnS3Setup.html) to get started with static website hosting on Amazon S3

The walkthrough mentioned above is using _example.com_ as the name for the S3 bucket. To ensure you can better identify the correct resources later on in the lab, **please make sure you name your S3 bucket according to the following convention:**


```
powercoders-resume-<firstname><lastname>
```


(e.g. powercoders-resume-darthvader)

🚨 Some hints regarding the walkthrough:



*   Use `index.html `and `error.html` for your index and error document.
*   When adding the bucket policy which makes your bucket publicly accessible, make sure you replace _example.com_ with the name of your bucket. Otherwise you will see an error that says `Policy has invalid resource`
*   In Step 5 of the walkthrough you do not have to create an index.html file since you already created your resume website in step 1 of this lab. Just upload the content of your website folder including all subfolders

Add the resources you created to the spreadsheet and post the S3 Static Website URL where your resumé website is available in the Slack Channel.

If your resume is available online and you still want to explore Amazon S3 a little more you can 



*   [Add a custom error document](https://docs.aws.amazon.com/AmazonS3/latest/dev/CustomErrorDocSupport.html) to further personalize your website


# Step 3 - Logging web traffic

Server access logging provides detailed records for the requests that are made to your bucket.

You can use [this walkthrough](https://docs.aws.amazon.com/AmazonS3/latest/dev/LoggingWebsiteTraffic.html) to get started with server access logging for your static website.

The walkthrough mentioned above is using _logs.example.com_ as the name for the S3 bucket. To ensure you can better identify the correct resources later on in the lab, **please make sure you name your S3 bucket according to the following convention:**


```
powercoders-accesslogs-<firstname><lastname>
```


(e.g. powercoders-accesslogs-darthvader)

🚨 Some hints regarding the walkthrough:



*   When asked to create a folder for the log files, create one named `logs` for the S3 buckets logs and another one named `cdn `for the CloudFront logs. The cdn folder is used in the next step of this lab
*   Access logging has to be activated on the previously created S3 bucket hosting your resume

Add the resources you created to the spreadsheet.


# Step 4 - Enable HTTPS for your website

The S3 website URL should use HTTPS for security. Since S3 does not support HTTPS connections out of the box you will need to use [Amazon CloudFront ](https://aws.amazon.com/cloudfront/)to help with this

You might want to complete the following training sessions to get some basic understanding of Amazon CloudFront and HTTPS



*   [What is HTTPS](https://www.cloudflare.com/learning/ssl/what-is-https/)
*   [Introduction to Amazon CloudFront](https://www.aws.training/Details/Video?id=15891) - 10min

Whenever you are ready, start creating your resources. You can use [this walkthrough](https://docs.aws.amazon.com/AmazonS3/latest/dev/website-hosting-cloudfront-walkthrough.html) to get started with securing your website with Amazon CloudFront.

🚨 Some hints regarding the walkthrough:



*   In Step 1 for the _Origin Domain Name_ select the correct S3 bucket you created in the previous step.
*   When configuring _Default Cache Behaviour Settings _in Step 5 make sure that you select _Redirect HTTP to HTTPS_ for the Viewer Protocol Policy \


<p id="gdcalert2" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image2.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert3">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image2.png "image_tooltip")

*   When configuring _Default Cache Behaviour Settings _in Step 5 make sure that you select _GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE_ as the _Allowed HTTP Methods_ \


<p id="gdcalert3" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image3.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert4">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image3.png "image_tooltip")

*   Skip steps 6a and 6b in the walkthrough since we are not working with custom domain names for now.
*   When configuring _S3 Bucket for Logs _choose the S3 Log Bucket you created in the previous step.
*   As _Log Prefix _enter _cdn _to make use of the folder you created in the previous step.
*   The creation of the CloudFront distribution point can take up to 5 minutes

You can now securely access your website using the domain name of the newly created distribution point 👍



<p id="gdcalert4" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image4.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert5">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image4.png "image_tooltip")


Add the resources you created to the spreadsheet and post the CloudFront URL on which your resumé website is available in the Slack Channel.

🥳 Congratulations, you built your first static website using Amazon S3!


# Step 5 - Send emails using Amazon SES

Now that you published your resume, you need a way to get in contact with you. This is where [Amazon SES](https://aws.amazon.com/ses/) comes into play. Amazon Simple Email Service (SES) is a flexible and scalable email service that enables you to send mail from within any application.

Setting up Amazon SES is quite simple:



*   [Verify an email address in Amazon SES](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/verify-email-addresses-procedure.html) to which you want to send your emails. This is probably your own personal email address
*   Check if you are able to send and receive emails by [using the Amazon SES console](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/send-an-email-from-console.html)

Send a test email to one of your classmates and the teacher using the AWS SES console.


# Step 6 - Create a Hello World REST API with Lambda and API Gateway

To be able to POST your contact form content and trigger the sending of an email, you will need to build a corresponding REST API. This can be done using AWS Lambda and Amazon API Gateway.

You might want to complete the following training sessions to get some basic understanding of AWS Lambda and Amazon API Gateway



*   [What is REST](https://www.codecademy.com/articles/what-is-rest)
*   [Introduction to AWS Lambda](https://www.aws.training/Details/Video?id=16360) - 10min
*   [AWS Lambda Foundations](https://www.aws.training/Details/eLearning?id=27197) - 60min
*   [Introduction to Amazon API Gateway](https://www.aws.training/Details/Video?id=16452) - 10min
*   [Amazon API Gateway for serverless applications](https://www.aws.training/Details/eLearning?id=27199) - 75min

Whenever you are ready, start creating your resources. You can use [this walkthrough](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-lambda.html) to get started. It will guide you through the process of building a “Hello World” REST API with Lambda and API Gateway.

The walkthrough mentioned above is using_ GetStartedLambdaProxyIntegration_ as the name for the Lambda function and _LambdaSimpleProxy_ as the name for the API Gateway. To ensure you can better identify the correct resources later on in the lab, **please make sure you name your Lambda function according to the following convention:**

Lambda function: `powercoders-helloworld-&lt;firstname>&lt;lastname>`

(e.g. powercoders-helloworld-darthvader)

API Gateway: `powercoders-resumecontact-&lt;firstname>&lt;lastname>`

(e.g powercoders-resumecontact-darthvader)

🚨 Some hints regarding the walkthrough:



*   Use `Node.js 12.x `as runtime.
*   When asked to create a new role instead _Use an existing role_ and select the role `powercocers-resumelab-lambdaexecutionrole \
`

<p id="gdcalert5" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image5.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert6">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image5.png "image_tooltip")

*   Don't forget to hit _Deploy_ after every change to the Function code.

Add the resources you created to the spreadsheet and post the corresponding URL where your Hello World REST API can be invoked in the Slack Channel.


# Step 7 - Send emails using AWS Lambda and API Gateway

Now that you have a working Hello World sample for a REST API with Lambda function, go ahead and try to adopt the sample to be able to send emails via Amazon SES. [This example from the JavaScript Developer guide](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/ses-examples-sending-email.html) will help to get you started.

Leave the existing Hello World example as is but create another Lambda function as you did in the previous step. This time, name it according to the following convention:


```
powercoders-sendemail-<firstname><lastname>
```


(e.g. powercoders-sendemail-darthvader)

Instead of using the function code provided in the tutorial, get the [code from this Github repository](https://github.com/sjohner/serverless-resume-lab/blob/main/sendmail.js). Make sure you change the following:



*   The sender and recipient address need to match with the email address you registered with Amazon SES.
*   Change the _Access-Control-Allow-Origin _header to match with our CloudFront URL. This is necessary because the function is called from another origin. See [What is CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) for more information. HTTPS?

After you created your new _sendemail_ function, you will have to extend the existing API Gateway with a new resource.

Get back to the walkthrough and create a new resource (Step 4 in the _Create a "Hello, World!" API _section). Instead of naming it _helloworld_, this time name it _sendemail._

Now you should have two resources in your API. The sendemail resource needs some methods. But instead of adding an _ANY_ method to the new resource, add the following methods for your _sendemail_ resource:



*   OPTIONS
*   POST

🚨 For both methods make sure that you integrate with the new sendemail Lambda function and that you check _Use Lambda Proxy integration_

Once you created and deployed your API, you can now test if you can send emails by using the API.

You can find examples for corresponding curl command on this [Github repository](https://github.com/sjohner/serverless-resume-lab/blob/main/curl-samples.txt)


# Step 8 - Add a contact form to your static website

Congrats, you are almost done! Last thing you need is to enhance the contact form to your static website.

To make your contact form work, you will need some JavaScript magic which sends the form input to your API. You can find a sample JavaScript function [on this Github repository](https://github.com/sjohner/serverless-resume-lab/blob/main/resume-template/assets/js/contact.js).

Copy the `contact.js` file to the `asstes/js` folder within your website project.

For the JavaScript code to work you need to do some minor tweaks in your index.html:



*   Add the path to the script in the scripts section at the end of index.html
*   Add `onSubmit="JavaScript:sendMessage()" `to the form definition to make sure that submitting the form sends the message

Now that you have a working contact form, upload the newly created JavaScript file and the updated index.html file.

🥳 Congratulations, you successfully completed this lab!


# Bonus tasks

Integrate a visitor counter on your website [using AWS Lambda and DynamoDB](https://aws.amazon.com/getting-started/projects/build-serverless-web-app-lambda-apigateway-s3-dynamodb-cognito/module-4/)

Add [Google reCaptcha](https://www.google.com/recaptcha/about/) to protect your website from abuse

If you want to learn more about AWS you might want to check out the [AWS Cloud Practitioner Essentials](https://www.aws.training/Details/Curriculum?id=27076 ) training
