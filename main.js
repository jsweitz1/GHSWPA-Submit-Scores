//Javascript file
function setYear() {
    //Set year option to current year
    var year = new Date().getFullYear();
    var selectElement = document.getElementById("gameYear");
    var opt = document.createElement("option");
    opt.value = year;
    opt.text = year;
    selectElement.add(opt);  
    console.log("If you're reading this, I hope you have a great day!")
}

function titleCase(str) {
    // convert string to title case
  return str.toLowerCase().split(' ').map(function(word) {
    return (word.charAt(0).toUpperCase() + word.slice(1));
  }).join(' ');
}


function sendMail(e) {
    e.preventDefault();
    
    // Get results
    var team1Name = titleCase(document.getElementById("team1Name").value); // Convert team name input to title case
    var team1Score = document.getElementById("team1Score").value;
    var team2Name = titleCase(document.getElementById("team2Name").value); // Convert team name input to title case
    var team2Score = document.getElementById("team2Score").value;
    
    // Get date, location, time
    var dateMonth = document.getElementById("gameMonth").value;
    var dateDay = document.getElementById("gameDay").value;
    var dateYear = document.getElementById("gameYear").value;
    var location = document.getElementById("gameFacility").value;
    var timeObj = document.getElementById("gameTime"); 
    var displayTime = getDisplayTime(timeObj); // Convert 24hr time to 12hr with am/pm for display
    
    // Get user identity
    var submittedBy = document.getElementById("submittedBy").value;
    //var submittedEmail = document.getElementById("submittedEmail").value;
    
    // Get special atributes
    var team1Forfeit = document.getElementById("team1Forfeit");
    var team1Exhib = document.getElementById("team1Exhib");
    var team2Forfeit = document.getElementById("team2Forfeit");
    var team2Exhib = document.getElementById("team2Exhib");
    

    // Add special attributes to team scores
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
    
    
    // Compile messages
    var subjectMessage = " // " + team1Name + ": " + team1Score + "  |  " + team2Name + ": " + team2Score + " //  " + dateMonth + " " + dateDay + ", " + dateYear + " // " + location + ", " + displayTime + " //";
    
    var bodyMessage = "Submitted by: " + submittedBy + " <br><br> --using GAPolo's Score Submission web app--";
    
    //console.log(subjectMessage);
    //console.log(bodyMessage);
    //console.log(senderEmail)
    
    // Set params to send to emailJS
    var templateParams = {
        subject: subjectMessage,
        message: bodyMessage
        //sender: submittedEmail
    };
    
    // Send params to emailJS and return result
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

function getDisplayTime(timeObj) {
    // Convert 24hr time to 12hr with am/pm for display
    var timeSplit = timeObj.value.split(':'),
    hours,
    minutes,
    meridian;
    hours = timeSplit[0];
    minutes = timeSplit[1];
    if (hours > 12) {
        meridian = 'PM';
        hours -= 12;
    } else if (hours < 12) {
        meridian = 'AM';
        if (hours == 0) {
        hours = 12;
        }
    } else {
        meridian = 'PM';
    }
    var displayTime = hours + ':' + minutes + ' ' + meridian;
    return displayTime;
}






