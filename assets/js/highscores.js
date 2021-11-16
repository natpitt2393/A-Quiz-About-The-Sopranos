//console.log("highscores entered");

function displayHighScores() {
    console.log('displayHighScores')
    var highscores = JSON.parse(localStorage.getItem('scores'));

    highscores.sort(function(a, b) {
        // if positive returns, then switch positions
        // if 0 or negative, then positions remain the same 
        return b.score - a.score;
    })

    for (var i = 0; i < highscores.length; i++) {
        var liEl = document.createElement("li");
        liEl.textContent = highscores[i].score + " - " + highscores[i].initials;
        document.getElementById('high-scores').appendChild(liEl);
    }

};

displayHighScores();