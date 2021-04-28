exports.handler = function(context, event, callback) {

  var customer_zendesk_domain = 'https://' + process.env.ZENDESK_SUBDOMAIN + '.zendesk.com';
    
  console.log(customer_zendesk_domain + '/api/v2/search.json?query=type:ticket ' + event.From);
	
  var request = require('request');
	
    var options = {
      'method': 'GET',
      'url': customer_zendesk_domain + '/api/v2/search.json?query=type:ticket' + event.From,
      'headers': {
        'Authorization': 'Basic ' + process.env.ZENDESK_TOKEN
        }
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      
        var result = JSON.parse(response.body);

        console.log(response.body);
        
        if (result.results.length == 0){
            
            var options = {
              'method': 'POST',
              'url': customer_zendesk_domain + '/api/v2/tickets.json',
              'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + process.env.ZENDESK_TOKEN
              },
              body: JSON.stringify({"ticket":{  "subject":"New Message In",
                                                "comment":{"body":`${event.Body} - ${event.From}`},
                                                "tags": [`${event.From}`]
              }})
            
                };
                request(options, function (error, response) {
                  if (error) throw new Error(error);
                  callback(null, "Message received, we'll respond shortly");
                });            
        }else{
            var options = {
              'method': 'PUT',
              'url': customer_zendesk_domain + '/api/v2/tickets/' + result.results[0].id+ '.json',
              'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + process.env.ZENDESK_TOKEN + ','
              },
              body: JSON.stringify({"ticket":{"comment":{"body":`${event.Body} - ${event.From}`}}})
            
            };
            request(options, function (error, response) {
              if (error) throw new Error(error);
              callback(null, "Thank you for your response, this is now with our team.");
            });
        }
    });
}