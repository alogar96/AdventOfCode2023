// Solution for day 4 part 2
// Puzzle: https://adventofcode.com/2023/day/4

const fs = require('node:fs');
const data = fs.readFileSync('input.txt', 'utf8').toString().trim().split('\n');

let result = 0;
let multipliers = {};

function setMx(index, win) {
    for (let i = index; i < index + win; i++) {
        if (multipliers[i] == null) 
            multipliers[i] = 1;
        else
            multipliers[i] = multipliers[i] + 1       
    }
}

data.forEach((line, lineIndex) => {
    let scratchcard = line.split(':');
    let nums = scratchcard[1].split('|');
    let winningNums = nums[0].split(/\s+/).filter(e => e);
    let myNums = nums[1].split(/\s+/).filter(e => e);
    let resultNums = parseInt(winningNums.filter(arr => myNums.includes(arr)).length); 

    if (multipliers[lineIndex] == null)
        multipliers[lineIndex] = 1;
    else
        multipliers[lineIndex] = multipliers[lineIndex] + 1;

    for (let m = 0; m < multipliers[lineIndex]; m++)
        setMx(lineIndex+1, resultNums)
});

result = Object.values(multipliers).reduce((x, y) => x + y, 0);
console.log(result);
