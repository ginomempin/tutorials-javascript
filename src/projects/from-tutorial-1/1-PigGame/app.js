// -----------------------------------------------------------------------------
// Coding Challenge 5
// -----------------------------------------------------------------------------
// See Section 4: JavaScript in the Browser: DOM Manipulation and Events
//     Lesson 47: Project Setup and Details

/*
GAME RULES:

The game has 2 players, playing in rounds

In each turn, a player rolls a dice as many times as he whishes. Each result gets
added to his ROUND score. BUT, if the player rolls a 1, all his ROUND score gets lost.
The player can choose to 'Hold', which means that his ROUND score gets added to his
GLOBAL score.

After that, it's the next player's turn.

The first player to reach 100 points on GLOBAL score wins the game.
*/

var player1, player2;
var activePlayer;
var isThereAWinner;

initGame();

function initGame() {
    player1 = {
        id: 1,
        roundScore: 0,
        globalScore: 0,
    }
    player2 = {
        id: 2,
        roundScore: 0,
        globalScore: 0,
    }
    activePlayer = player1;
    isThereAWinner = false;

    document.querySelector(".dice").style.display = "none";

    document.getElementById("score-1").textContent = 0;
    document.getElementById("score-2").textContent = 0;

    document.getElementById("current-1").textContent = 0;
    document.getElementById("current-2").textContent = 0;

    let player1Panel = document.querySelector(".player-1-panel");
    player1Panel.classList.remove("active", "winner");
    player1Panel.classList.add("active");

    let player2Panel = document.querySelector(".player-2-panel");
    player2Panel.classList.remove("active", "winner");

    document.getElementById("name-1").textContent = "Player 1";
    document.getElementById("name-2").textContent = "Player 2";
}

function switchPlayer() {
    document.querySelector(`.player-${activePlayer.id}-panel`).classList.toggle("active");
    activePlayer = activePlayer.id == player1.id ? player2 : player1;
    document.querySelector(`.player-${activePlayer.id}-panel`).classList.toggle("active");
}

function declareWinner() {
    isThereAWinner = true;

    document.querySelector(`.player-${activePlayer.id}-panel`).classList.remove("active");
    document.querySelector(`.player-${activePlayer.id}-panel`).classList.add("winner");
    document.getElementById(`name-${activePlayer.id}`).textContent = "WINNER!";
}

document.querySelector(".btn-roll")
        .addEventListener("click", function() {
            if (isThereAWinner) {
                return;
            }

            // Generate a random number
            let diceVal = Math.floor(Math.random() * 6) + 1;

            // Display the result
            let diceImg = document.querySelector(".dice");
            diceImg.style.display = "block";
            diceImg.src = `dice-${diceVal}.png`;

            // If user rolled 1, zero out the round score and pass to the other player.
            // If user rolled 2-6, update the round score
            let roundScoreTxtId = `current-${activePlayer.id}`;
            let roundScoreTxt = document.getElementById(roundScoreTxtId);
            if (diceVal > 1) {
                activePlayer.roundScore += diceVal;

                roundScoreTxt.textContent = activePlayer.roundScore;
            } else {
                activePlayer.roundScore = 0;

                roundScoreTxt.textContent = 0;

                switchPlayer();
            }

            // console.dir(activePlayer);
            // console.dir(player1);
            // console.dir(player2);
        });

document.querySelector(".btn-hold")
        .addEventListener("click", function() {
            if (isThereAWinner) {
                return;
            }

            // Add the round score to the global score
            // And reset the round score
            activePlayer.globalScore += activePlayer.roundScore;
            activePlayer.roundScore = 0;

            // Update the UI
            let globalScoreTxtId = `score-${activePlayer.id}`;
            let globalScoreTxt = document.getElementById(globalScoreTxtId);
            globalScoreTxt.textContent = activePlayer.globalScore;
            let roundScoreTxtId = `current-${activePlayer.id}`;
            let roundScoreTxt = document.getElementById(roundScoreTxtId);
            roundScoreTxt.textContent = activePlayer.roundScore;

            // Check if player already won the game
            // If the player did not win yet, pass to the other player
            if (activePlayer.globalScore >= 100) {
                declareWinner();
            } else {
                switchPlayer();
            }
        });

document.querySelector(".btn-new")
        .addEventListener("click", initGame);
