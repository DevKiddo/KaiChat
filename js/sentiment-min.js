var sentiment;function calculateSentiment(a){$.ajax({type:"POST",url:"https://apiv2.indico.io/sentiment?key=6c7eb1df70bc0bcebb3eb51861e6ba15",data:{data:a},success:function(b){sentiment=(JSON.parse(b).results)},async:false});return sentiment};