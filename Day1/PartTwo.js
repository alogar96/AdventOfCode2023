// Solution for day 1 part 2 
// Puzzle: https://adventofcode.com/2023/day/1

const fs = require('node:fs');
const data = fs.readFileSync('input.txt', 'utf8').toString().trim().split('\n');

let words = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
function isWord(word) {
  for (let i = 0; i<words.length; i++) {
    if (word.includes(words[i]))
      return i+1;
  }
  return 0;
}

let result = 0;

data.forEach(line => {
  let word = '';
  let numbers = [];
  line.split('').forEach(c => {
    if (!isNaN(c)) {
      word = '';
      numbers.push(c)
    }
    else {
      word = word + c;
      num = isWord(word);
      if (num > 0) {
        numbers.push(num.toString())
        word = c; // Quick nasty solution
      }
    }
  })
  result = result + parseInt(numbers[0] + numbers[numbers.length-1]);
})

console.log(result)

