// Solution for day 9 part 2
// Puzzle: https://adventofcode.com/2023/day/9

const fs = require('node:fs');
const data = fs.readFileSync('input.txt', 'utf8').toString().trim().split('\n');

let result = 0;

function getNextSeq(arr) {
    let nextArr = [];
    for (let i = 1; i < arr.length; i++) {
        nextArr.push(arr[i] - arr[i-1]);
    }
    return nextArr;
}

data.forEach(line => {
    let seq = line.split(" ").map(x => parseInt(x));
    let firstValues = [seq[0]];
    let nextArr = seq;

    // find difference
    do {
        nextArr = getNextSeq(nextArr);
        firstValues.push(nextArr[0]); 
    }  
    while (!nextArr.every(e => e === nextArr[0]));

    // extrapolate
    let ext = 0;
    for(let i = firstValues.length-1; i >= 0; i--) {
        ext = firstValues[i] - ext;
    }

    result = result + ext;
});

console.log(result);