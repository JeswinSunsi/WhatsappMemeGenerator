var express = require('express');
var app = express();
var request = require('request');
const bodyParser = require('body-parser');


const accountSid = process.env.ACCOUNTSID
const authToken = process.env.AUTHTOKEN

// baseUrl - 'https://api.memegen.link/images/custom/top_caption/bottom_caption/_.png?background=image_link_with_https'

const client = require('twilio')(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended: false
}));

app.post('/incoming', (req, res) => {
	client.messages
	const twiml = new MessagingResponse()
	var userMessage = req.body.Body.split('#')

	try {
		const topCaption = userMessage[0].replace(/ /g, '_')
		const bottomCaption = userMessage[1].replace(/ /g, '_')
		const imageLink = userMessage[2]
		var newUrl = `https://api.memegen.link/images/custom/${topCaption}/${bottomCaption}/_.png?background=${imageLink}`

	} catch (err) {
		var newUrl = 'Something went wrong. Do report the error to the author 😔💔'
	}


	twiml.message(newUrl)
	res.writeHead(200, {
		'Content-Type': 'text/xml'
	})
	res.end(twiml.toString())
})


var listener = app.listen(process.env.PORT, function() {
	console.log('Your app is listening on port ' + listener.address().port);
});
