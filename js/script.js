var scores, raundScores, activePlayer, gamePlaying;

init();
//event
document.querySelector(".btn-roll").addEventListener('click', function () {
    if (gamePlaying) {
        //select random number
        var dice = Math.floor(Math.random() * 6) + 1;
        //display the dice img 
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';

        diceDOM.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/243004/dice-" + dice + ".png";
        //display the resault
        if (dice !== 1) {
            //add score
            raundScores += dice;
            document.querySelector('#current-' + activePlayer).textContent = raundScores;
        } else {
            //next player
            nextPlayer();
        }
    }
})

document.querySelector(".btn-hold").addEventListener('click', function () {
    if (gamePlaying){
        //add current score to global score
        scores[activePlayer] += raundScores;

        //update UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        //check if player won the game
        if (scores[activePlayer] >= 10) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;

        } else {
            //next player
            nextPlayer();
        }
    }
});
function nextPlayer() {
    //next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    raundScores = 0;

    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector(".dice").style.display = 'none';
}
document.querySelector(".btn-new").addEventListener('click', init);

function init() {
    scores = [0, 0];
    raundScores = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector(".dice").style.display = 'none';

    document.querySelector('#score-0').textContent = '0';
    document.querySelector('#score-1').textContent = '0';
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';

    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}