// Solution for day 6 part 1 
// Puzzle: https://adventofcode.com/2023/day/6

const fs = require('node:fs');
const data = fs.readFileSync('input.txt', 'utf8').toString().trim().split('\n');

let result = 1;

let timeLine = data[0].split(":");
let DistLine = data[1].split(":");
let times = timeLine[1].split(/\s+/).filter(e => e).map(x => parseInt(x));
let dists = DistLine[1].split(/\s+/).filter(e => e).map(x => parseInt(x));

for (let i = 0; i < times.length; i++) {
    let countWins = 0;
    for (let hold = 0; hold < times[i]; hold++) {
        let distance = hold * (times[i]-hold);
        if (distance > dists[i])
            countWins = countWins + 1;
    }
    result = result * countWins;
}

console.log(result);