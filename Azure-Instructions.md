# Introduction

The goal of this lab is to create your very own resume and publish it as a public website. For this you are going to use Azure serverless technologies.

The solution will look similar to the following diagram. You will use Azure Storage static website storage to publish your static site.

Check out the [Darth Vader](https://darthvader.jhnr.ch) example resume website if you want to see it in action.

If you find any ambiguities, errors or typos, please open an issue. Or even better, correct the relevant files and create a pull request 😉

## Some important side notes

* Since your accounts are only allowed to create resources in the EU (Frankfurt) eu-central-1 region, make sure you change the region accordingly. Always select **region EU (Frankfurt) eu-central-1** to deploy your resource.
* Students cannot create or modify identity and access related configuration in the Powercoders AWS account. Therefor the necessary Lambda execution roles required to complete this lab have already been created for you. In case you are working on this lab in your own AWS account you will need to create the corresponding Lambda execution role and assign it the corresponding policies to access CloudWatch and Amazon SES.

## More information about Cloud and Azure

If you want to get familiar with essential AWS concepts and services. There are plenty of free training sessions available on [AWS training and certification](https://aws.training) or Youtube. You will need a (free) Amazon account for this.

*   [What is Cloud Computing?](https://youtu.be/dH0yz-Osy54) - 5min
*   [What is Microsoft Azure?](https://www.youtube.com/watch?v=KXkBZCe699A) - 5min
*   [Azure Fundamentals part 1: Describe core Azure concepts](https://docs.microsoft.com/en-us/learn/paths/az-900-describe-cloud-concepts/) - 1h

Login with your Azure credentials and get familiar with the [Azure console](https://portal.azure.com).

Let the teacher know if you were able to login and browse the Azure portal. Check out [this guide](https://docs.microsoft.com/en-us/azure/azure-portal/azure-portal-overview) which will help you to get started with the Azure portal.

# Step 1 - Create your HTML resume

First of all you need a resume. Some great examples of static websites built with HTML and CSS can be found [here](https://html5up.net/). All the templates you find there are 100% Free under the [Creative Commons](https://html5up.net/license) license. This means you may use the templates but you need to give HTML5 UP credit for the design. There is a note in the footer section of each template that mentions HTML5 UP and a corresponding comment in the `index.html`file. Please do not remove those attributions or be sure to check out [Pixelarity](https://pixelarity.com/) which offers attribution-free usage of the template in exchange for a small amount of money.

This lab is based on the [Read Only template from HTML5 UP](https://html5up.net/read-only) so it is recommended to use this one. The template is optimized for a personal website and contains a simple contact form which you are going to use later on.

For this lab we will use a a slightly modified version of the above mentioned template and adopt it to represent your resume. You can download this template from [this github repository](darthvader-resume-template/).

The following modifications were added to the template to match the requirements for this lab:
* To make the contact form work, some JavaScript magic which sends the form input to the AWS API Gateway is needed. Therefor a [JavaScript function](darthvader-resume-template/assets/js/contact.js) was added which will post the message from the contact form to your API. The function requires an API endpoint to be available under `<base url>/rest/contact`. You will create this endpoint as part of this lab.
* The [form definition](https://github.com/sjohner/serverless-resume/blob/5d29ea0e909dedb80c385ade0ffcad6da20fd0bd/darthvader-resume-template/index.html#L113) was slightly modified to call the `sendMessage` function when a user submits the form
* [All form fields](https://github.com/sjohner/serverless-resume/blob/5d29ea0e909dedb80c385ade0ffcad6da20fd0bd/darthvader-resume-template/index.html#L115-L118) are configured as required. When present, this attribute specifies that an input field must be filled out before submitting the form
* The `contact.js` JavaScript file containing the `sendMessage` function is [included in the `index.html`file](https://github.com/sjohner/serverless-resume/blob/5d29ea0e909dedb80c385ade0ffcad6da20fd0bd/darthvader-resume-template/index.html#L150)
* The [`form.css`CSS file](https://github.com/sjohner/serverless-resume/blob/main/darthvader-resume-template/assets/css/form.css) containing the formatting for the form success message is [included in the `index.html`file](https://github.com/sjohner/serverless-resume/blob/7370fea8918e44f87db50636cf707c10c716b42a/darthvader-resume-template/index.html#L13)

You might want to add a profile pic and some basic information about you. Adjust the `index.html` file accordingly and replace the images in the `images` folder if you want to. To check out your work you can launch `index.html` in your browser on your local machine.

To modify the template you can use whatever text editor you have. There are plenty of options out there which are free to use. Two great options to use are:

*   [Visual Studio Code](https://code.visualstudio.com/)
*   [Sublime Text](https://www.sublimetext.com/)

Don’t spend too much time on your resume. It just serves as an example and you can still tweak it later on when it is online.

# Step 2 - Deploy your resume online

Deploy your resume online as an [Azure Storage static website](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-static-website).

You might want to complete the following training sessions to get some basic understanding of Azure Storage Storage Service before starting with the actual deployment.

*   [Azure Storage Fundamentals](https://docs.microsoft.com/en-us/learn/modules/azure-storage-fundamentals/) - 30min
*   [Choose a data storage approach in Azure](https://docs.microsoft.com/en-us/learn/modules/choose-storage-approach-in-azure/) - 30min

Whenever you are ready, start creating your resources. You can use [this walkthrough](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-static-website-how-to?tabs=azure-portal) to get started with static website hosting on Azure Storage. The afore mentioned guide requires you to first create an Azure Storage Account. Use [this walkthrough](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-portal) to create an Azure Storage Account.

🚨 Some hints regarding the walkthrough:

*   There is no need to change default settings for Networking, Data protection and Advanced options
*   Use `index.html `and `error.html` for your index and error document.
*   It is easier if you use Azure CLI or PowerShell to upload the website files. This way you can upload entire folders.

Document the resources you created and let the teacher know the Static Website endpoint URL where your resume website is available.

If your resume is available online you can add a custom `error.html` document to further personalize your website.
