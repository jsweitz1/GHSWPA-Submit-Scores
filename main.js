//Javascript file
function myFunction() {
    //Set Year
    var year = new Date().getFullYear();
    var selectElement = document.getElementById("gameYear");
    var opt = document.createElement("option");
    opt.value = year;
    opt.text = year;
    selectElement.add(opt);  
    console.log("If you're reading this, I hope you have a great day!")
}

function titleCase(str) {
  return str.toLowerCase().split(' ').map(function(word) {
    return (word.charAt(0).toUpperCase() + word.slice(1));
  }).join(' ');
}


function sendMail(e) {
    e.preventDefault();
    var team1Name = titleCase(document.getElementById("team1Name").value);
    var team1Score = document.getElementById("team1Score").value;
    var team2Name = titleCase(document.getElementById("team2Name").value);
    var team2Score = document.getElementById("team2Score").value;
    var dateMonth = document.getElementById("gameMonth").value;
    var dateDay = document.getElementById("gameDay").value;
    var dateYear = document.getElementById("gameYear").value;
    var location = document.getElementById("gameFacility").value;
    var time = document.getElementById("gameTime").value;
    var submittedBy = document.getElementById("submittedBy").value;
    //var submittedEmail = document.getElementById("submittedEmail").value;
    
    var team1Forfeit = document.getElementById("team1Forfeit");
    var team1Exhib = document.getElementById("team1Exhib");
    var team2Forfeit = document.getElementById("team2Forfeit");
    var team2Exhib = document.getElementById("team2Exhib");
    
    if (team1Forfeit.checked){
        team1Score += " [F]";
    }
    if (team1Exhib.checked){
        team1Score += " [X]";
    }
    if (team2Forfeit.checked){
        team2Score += " [F]";
    }
    if (team2Exhib.checked){
        team2Score += " [X]";
    }
    
    
    
    var subjectMessage = " // " + team1Name + ": " + team1Score + "  |  " + team2Name + ": " + team2Score + " //  " + dateMonth + " " + dateDay + ", " + dateYear + " // " + location + ", " + time + " //";
    
    var bodyMessage = "Submitted by: " + submittedBy + " <br><br> --using GAPolo's Score Submission web app--";
    
    //console.log(subjectMessage);
    //console.log(bodyMessage);
    //console.log(senderEmail)
    
    var templateParams = {
        subject: subjectMessage,
        message: bodyMessage
        //sender: submittedEmail
    };
    
    emailjs.send("service_uzc0o1t", "template_nbf66wn", templateParams)
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
        alert('SUCCESS!', response.status, response.text);
        document.getElementById("scoresForm").reset();
        return false;
    }, function(error) {
       console.log('FAILED...', error);
        alert('FAILED...', error);
        return false;
        //failed
    }); 
    
}





