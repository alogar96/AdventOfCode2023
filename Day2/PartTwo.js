// Solution for day 2 part 2 
// Puzzle: https://adventofcode.com/2023/day/2

const fs = require('node:fs');
const data = fs.readFileSync('input.txt', 'utf8').toString().trim().split('\n');

let result = 0;

data.forEach((line, gameId) => {
  let red = 0;
  let green = 0;
  let blue = 0;
  let subsets = line.split(" ");
  subsets.forEach((subset, index) => {
    if (!isNaN(subset)) {
      let value = parseInt(subset);
      if ((subsets[index+1].includes('red')))
        if (value > red) red = value; 
      if ((subsets[index+1].includes('green')))
        if (value > green) green = value; 
      if ((subsets[index+1].includes('blue'))) 
        if (value > blue) blue = value; 
    }
  })
  result = result + (red * green * blue);
})

console.log(result)

