let dice = [0, 0, 0, 0, 0];
let dice2 = []
let hold = [false, false, false, false, false];
let roll = 3;

document.getElementById("klik").onclick = function () { rollDices() };

document.getElementById("dice-1").onclick = function () { holdDice(0); }
document.getElementById("dice-2").onclick = function () { holdDice(1); }
document.getElementById("dice-3").onclick = function () { holdDice(2); }
document.getElementById("dice-4").onclick = function () { holdDice(3); }
document.getElementById("dice-5").onclick = function () { holdDice(4); }

function updateDiceOnScreen() {
    document.getElementById("dice-1").innerText = dice[0]
    document.getElementById("dice-2").innerText = dice[1];
    document.getElementById("dice-3").innerText = dice[2];
    document.getElementById("dice-4").innerText = dice[3];
    document.getElementById("dice-5").innerText = dice[4];
    document.getElementById("ones").innerText = calculateScoreForNumber(1);
    document.getElementById("twos").innerText = calculateScoreForNumber(2);
    document.getElementById("threes").innerText = calculateScoreForNumber(3);
    document.getElementById("fours").innerText = calculateScoreForNumber(4);
    document.getElementById("fives").innerText = calculateScoreForNumber(5);
    document.getElementById("sixes").innerText = calculateScoreForNumber(6);
    document.getElementById("bonus").innerText = calculateScoreForBonus();
    document.getElementById("chance").innerText = calculateScoreForChance();
    document.getElementById("fullhouse").innerText = calculateScoreForFullHouse();
    document.getElementById("threeofakind").innerText = calculateScoreForThreeOfAKind();
    document.getElementById("fourofakind").innerText = calculateScoreForFourOfAKind();
    document.getElementById("smallstraight").innerText = calculateScoreForSmallStraight(dice);
    document.getElementById("largestraight").innerText = calculateScoreForLargeStraight(dice);
    document.getElementById("yahtzee").innerText = calculateScoreForYahtzee();
    document.getElementById("score").innerText = calculateScoreForScore(dice);
    document.getElementById("rolls-left").innerText = rollsLeft();
}

function rollsLeft() {
    roll--;
    if (roll == 0) {
        hold = [false, false, false, false, false];
    }
    if (roll == -1) {
        roll = 3
        return roll;
    }
    return roll;
}

function holdDice(num) {
    if (roll == -1 || dice[0] == 0) {
        hold = [false, false, false, false, false];
        return hold;
    } else {
        if (hold[num] == true) {
            hold[num] = false;

        } else {
            hold[num] = true;
        }
    }
}

function calculateScoreForScore() {
    if (roll == 1) {
        result = calculateScoreForNumber(1) + calculateScoreForNumber(2) + calculateScoreForNumber(3) + calculateScoreForNumber(4) + calculateScoreForNumber(5) + calculateScoreForNumber(6) + calculateScoreForBonus() + calculateScoreForChance() + calculateScoreForFullHouse() + calculateScoreForThreeOfAKind(dice) + calculateScoreForFourOfAKind(dice) + calculateScoreForSmallStraight(dice) + calculateScoreForLargeStraight(dice) + calculateScoreForYahtzee(dice);
        return result;
    }
    return 0;
}

function rollDices() {
    dice = randomDices();
    updateDiceOnScreen();
}

function calculateScoreForNumber(num) {
    return num * countNumber(num);
}

function countNumber(num) {
    let result = 0;
    for (let index = 0; index < 6; index++) {
        if (dice[index] === num) {
            result++;
        }
    }
    return result;
}

function calculateScoreForBonus() {
    if (calculateScoreForNumber(1) + calculateScoreForNumber(2) + calculateScoreForNumber(3) + calculateScoreForNumber(4) + calculateScoreForNumber(5) + calculateScoreForNumber(6) >= 63) {

        return 35;
    }
    return 0;
}

function calculateScoreForChance() {
    let result = 0;
    for (let index = 0; index < dice.length; index++) {
        result = result + dice[index];
    }
    return result;
}

function calculateScoreForFullHouse() {
    if (calculateScoreForTwoPair() == true && calculateScoreForThreeOfAKind() > 0) {
        return 25;

    } else {

        return 0;
    }
}


function calculateScoreForTwoPair() {
    for (let i = 0; i < 7; i++) {
        if (countNumber(i) == 2) {
            return true;
        }
    }
    return false;
}


function calculateScoreForThreeOfAKind() {

    for (let i = 1; i < 7; i++) {
        if (countNumber(i) >= 3) {

            return calculateScoreForChance();
        }
    }
    return 0;
}

function calculateScoreForFourOfAKind() {

    for (let i = 0; i < 7; i++) {
        if (countNumber(i) >= 4) {
            return calculateScoreForChance();
        }
    }
    return 0;
}

function calculateScoreForSmallStraight(diceValues) {
    if (diceValues.includes(1) && diceValues.includes(2) && diceValues.includes(3) && diceValues.includes(4)) {
        return 30;
    }


    if (diceValues.includes(2) && diceValues.includes(3) && diceValues.includes(4) && diceValues.includes(5)) {
        return 30;
    }


    if (diceValues.includes(3) && diceValues.includes(4) && diceValues.includes(5) && diceValues.includes(6)) {
        return 30;
    }

    return 0;
}

function calculateScoreForLargeStraight(diceValues) {
    if (diceValues.includes(1) && diceValues.includes(2) && diceValues.includes(3) && diceValues.includes(4) && diceValues.includes(5)) {
        return 40;
    }


    if (diceValues.includes(2) && diceValues.includes(3) && diceValues.includes(4) && diceValues.includes(5) && diceValues.includes(6)) {
        return 40;
    }

    return 0;
}

function calculateScoreForYahtzee() {
    for (let i = 0; i < 7; i++) {
        if (countNumber(i) >= 5) {
            return 50;
        }

    }
    return 0;
}

function randomDices() {
    let dice = [];
    for (let index = 0; index < 5; index++) {
        if (!hold[index]) {
            dice.push(Math.floor(Math.random() * 6) + 1);
        } else {
            dice[index] = dice2[index];
        }
    }
    dice2 = dice;
    return dice;
}