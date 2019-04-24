/*
 * Jacky Wong
 * This is a project for GC 3400 at Clemson University.
 * April 26, 2019
 */

var deck = [];
var enemy = [];
var enemyScore = 0;
var hand = [];
var handScore = 0;
var suits = ["c", "d", "h", "s"];

function addPoints(score, card) {
    if (typeof card == "number")
        score += card;
    else
        score += 10;
}

// true if enemy draws again
// false if enemy stops
function drawChance() {
    // get a random integer from 0-total of enemy points
    var chance = Math.floor(Math.random() * enemyScore);
    if (chance % enemyScore === 1) { return true; }
    else { return false; }
}

function drawAction(player) {
    // get a random card via random index
    var ind = Math.floor(Math.random() * (deck.length - 1));
    var curCard = player.push(deck.splice(ind, 1));

    if (player === "enemy") {
        addPoints(enemyScore, curCard[1]);
        if (enemyScore > 21) {
            window.alert("Enemy has lost! Over 21");
        }
        else {
            // update number of enemy cards
            document.getElementById("enemy").innerHTML = "Enemy card: " + enemy[0][0] + 
                " and his number of cards: " + enemy.length;
        }
    }
    else {
        addPoints(handScore, curCard[1]);
        if (handScore > 21) {
            window.alert("You have lost! Over 21");
        }
        else {
            // update cards display
            var cardsPlayer = "";
            for (var i = 0; i < hand.length; i++) {
                cardsPlayer = cardsPlayer + " " + hand[i][0];
            }
            document.getElementById("info").innerHTML = "Your cards: " + cardsPlayer;
        }
    }
}

function start() {
    // reset and build deck
    deck = [];
    var ind = 0;
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j <= 10; j++) {
            deck[ind++] = [suits[i], j];
        }
        // add jack queen and king
        deck[ind++] = [suits[i], "j"];
        deck[ind++] = [suits[i], "q"];
        deck[ind++] = [suits[i], "k"];
    }

    // deal two cards to players
    drawAction(hand);
    drawAction(enemy);
    drawAction(hand);
    drawAction(enemy);

    // update html
    var cardsPlayer = hand[0][0] + " | " + hand[1][0];
    document.getElementById("info").innerHTML = "Your cards: " + cardsPlayer;

    // this never updates as you dont get to see new enemy cards
    var cardsEnemy = enemy[0][0] + enemy[0][1];
    document.getElementById("enemy").innerHTML = "Enemy faceup card: " + cardsEnemy;
}

function stand() {
    // let enemy draw once
    if (drawChance()) {
        drawAction(enemy);
    }

    // game ends whether enemy draws
    if (enemyScore > handScore) {
        document.getElementById("info").innerHTML = "Enemy has won";
        document.getElementById("enemy").innerHTML = "";
    }
    else if (enemyScore < handScore) {
        document.getElementById("info").innerHTML = "You have won!";
        document.getElementById("enemy").innerHTML = "";
    }
    else {
        document.getElementById("info").innerHTML = "Tie game";
        document.getElementById("enemy").innerHTML = "";
    }
}

function hit() {
    drawAction(hand);
    
    if (drawChance()) {
        drawAction(enemy);
    }
}
