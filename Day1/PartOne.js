// Solution for day 1 part 1
// Puzzle: https://adventofcode.com/2023/day/1

const fs = require('node:fs');
const data = fs.readFileSync('input.txt', 'utf8').toString().trim().split('\n');

let result = 0;

data.forEach(line => {
  let numbers = [];
  line.split('').forEach(c => {
    if (!isNaN(c)) numbers.push(c)
  })
  result = result + parseInt(numbers[0] + numbers[numbers.length-1]);
})

console.log(result)

