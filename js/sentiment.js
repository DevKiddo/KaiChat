var sentiment;

function calculateSentiment(message) {

	$.ajax({
		type: 'POST',
		url: 'https://apiv2.indico.io/sentiment?key=6c7eb1df70bc0bcebb3eb51861e6ba15',
		data: {'data': message},
		success: function(res) {sentiment = (JSON.parse(res).results);},
		async:false
	});

	return sentiment;

}





