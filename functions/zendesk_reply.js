exports.handler = function(context, event, callback) {
	const twilioClient = context.getTwilioClient();
	
	var comment = event.last_comment;
	var phonenumber = event.phonenumber;
	
	console.log(comment);
	
	if (comment.includes('+61') == false){
	   twilioClient.messages.create({
            from: process.env.PHONENUMBER,
            to: phonenumber,
            body: comment
        }, function(err, result) {
            console.log(result);
            callback(null, 'done');
        });
	}else{
	    callback(null, 'done - no message');
	}
};