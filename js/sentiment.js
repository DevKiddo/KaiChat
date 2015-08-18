//Sentiment Analysis - calculates sentiment score for every message argument given to the function call

var sentiment;

//calculateSentiment is called in line 486 of the firechat.js library - makes a post request to Indico.io

function calculateSentiment(message) { 
	$.ajax({
		type: 'POST',
		url: 'https://apiv2.indico.io/sentimenthq?key=6c7eb1df70bc0bcebb3eb51861e6ba15',
		data: {'data': message},
		success: function(res) {sentiment = (JSON.parse(res).results);},
		async:false //synchronous request
	});

	return sentiment;

}




