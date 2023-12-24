// Solution for day 7 part 1 
// Puzzle: https://adventofcode.com/2023/day/7

const fs = require('node:fs');
const data = fs.readFileSync('input.txt', 'utf8').trim().split('\n').map(x => x.split(" "));
let cards = {"T":10, "J":11, "Q":12, "K":13, "A":14};
let result = 0;

// Get card value
function getCardValue(card) {
    if (!isNaN(card)) {
        return parseInt(card);
    }
    else {
        return cards[card];
    }
}

// Count cards in hand
function countCards(hand) {
    let obj = {};
    for (let i = 0; i < hand.length; i++) {
        if (typeof obj[hand[i]] !== "undefined") {
            obj[hand[i]] = obj[hand[i]] +1;
        }
        else {
            obj[hand[i]] = 1;
        }
    }
    return obj;
}

// Set hand type
function handType(hand) {
    let cards = countCards(hand);
    let count = Object.keys(cards).length;
    let firstValue = cards[Object.keys(cards)[0]];

    if (count == 1) {
        return 21; // Five of a kind
    }
    else if (count == 2) {
        if (firstValue == 1 || firstValue == 4)
            return 20;  // Four of a kind
        else
            return 19;  // Full house
    }
    else if (count == 3) {
        let secondValue = cards[Object.keys(cards)[1]];
        let thirdValue = cards[Object.keys(cards)[2]];
        if (firstValue == 3 || secondValue == 3 || thirdValue == 3)
            return 18;  // Three of a kind
        else 
            return 17;  // Two pairs
    }
    else if (count == 4) {
        return 16;  // One pair
    }
    else if (count == 5) {
        return 15;  // High card
    }

}

// Get hand values
for (let i = 0; i < data.length; i++) {
    let handValue = handType(data[i][0]);
    data[i].push(handValue)
}
data.sort((a, b) => {
    let i = 0;
    if (a[2] == b[2])
    {
        while (i < 5) {
            if (getCardValue([a[0][i]]) < getCardValue([b[0][i]]))
                return -1;
    
            if (getCardValue([a[0][i]]) > getCardValue([b[0][i]]))
                return 1;     
    
            i++;    
        }    
        return 0;
    }
    else {
        return a[2] - b[2];
    }
});

// Get result
for (let i = 0; i < data.length; i++) {
    result = result + ((i+1) * parseInt(data[i][1]));
}

console.log(result);