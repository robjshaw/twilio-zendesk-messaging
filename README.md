# zendesk-messaging
 
Add's a conversational messaging channel to zendesk, in this demo via SMS and a twilio phonenumber.

## Install

Please add a .env 

```
ACCOUNT_SID=twilio_account_sid
AUTH_TOKEN=twilio_auth_token
ZENDESK_TOKEN=your_zendesk_users_api_key
ZENDESK_SUBDOMAIN=your_zendesk_sandbox_subdomain
PHONENUMBER=your_twilio_number
```

You can get access to a zendesk sandbox, however I just signed up for a 14 day trial.

This was built ontop the twilio serverless toolkit - if you are in a rush you could just copy the two functions into the console and add the environment vars.

`npm install`

`npm start`

And then this video explains how to get it going inside zendesk via triggers and actions.

https://drive.google.com/file/d/18W-NPOpr2v7NjTruRg2NqiwJ7-JvzLrD/view?usp=sharing