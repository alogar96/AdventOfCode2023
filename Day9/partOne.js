// Solution for day 9 part 1 
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
    let lastValues = [seq[seq.length-1]];
    let nextArr = seq;

    // find difference
    do {
        nextArr = getNextSeq(nextArr);
        lastValues.push(nextArr[nextArr.length-1]); 
    }  
    while (!nextArr.every(e => e === nextArr[0]));

    // extrapolate
    result = result + lastValues.reduce((x, y) => {return x + y}, 0);

});

console.log(result);