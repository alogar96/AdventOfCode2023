// Solution for day 15 part 1
// Puzzle: https://adventofcode.com/2023/day/15

const fs = require('node:fs');
const data = fs.readFileSync('input.txt', 'utf8').toString().trim().replaceAll("\r\n", "").split(",")

let result = 0;

function hash(value, code) {
    value = value + code;
    value = value * 17;
    value = value % 256;
    return value;
}

for (let i = 0; i < data.length; i++) {
    let value = 0;
    for (let j = 0; j < data[i].length; j++) {
        value = hash(value, data[i].charCodeAt(j))
    }   
    result = result + value;
}

console.log(result);
