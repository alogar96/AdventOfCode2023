// Solution for day 6 part 2
// Puzzle: https://adventofcode.com/2023/day/6

const fs = require('node:fs');
const data = fs.readFileSync('input.txt', 'utf8').toString().trim().split('\n');

let result = 0;

let timeLine = data[0].split(":");
let DistLine = data[1].split(":");
let times = timeLine[1].split(/\s+/).filter(e => e).join('');
let dists = DistLine[1].split(/\s+/).filter(e => e).join('');

for (let hold = 0; hold < times; hold++) {
    let distance = hold * (times-hold);
    if (distance > dists)
        result = result + 1;
}

console.log(result);