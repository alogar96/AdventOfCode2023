// Solution for day 4 part 1 
// Puzzle: https://adventofcode.com/2023/day/4

const fs = require('node:fs');
const data = fs.readFileSync('input.txt', 'utf8').toString().trim().split('\n');

let result = 0;

data.forEach((line, lineIndex) => {
    let scratchcard = line.split(':');
    let nums = scratchcard[1].split('|');
    let winningNums = nums[0].split(/\s+/).filter(e => e);
    let myNums = nums[1].split(/\s+/).filter(e => e);
    let resultNums = parseInt(winningNums.filter(arr => myNums.includes(arr)).length); 

    if (resultNums > 0)
        result = result + Math.pow(2, (resultNums-1))
});

console.log(result);