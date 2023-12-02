const fs = require('node:fs');
const data = fs.readFileSync('input.txt', 'utf8').toString().trim().split('\n');

const red = 12;
const green = 13;
const blue = 14;

let result = 0;

data.forEach((line, gameId) => {
  let invalid = false;
  let subsets = line.split(" ");
  subsets.forEach((subset, index) => {
    if (!isNaN(subset)) {
      if ((subsets[index+1].includes('red')) && (parseInt(subset) > red)) invalid = true;
      if ((subsets[index+1].includes('green')) && (parseInt(subset) > green)) invalid = true;
      if ((subsets[index+1].includes('blue')) && (parseInt(subset) > blue)) invalid = true;
    }
  })
  if (!invalid) result = result + (gameId+1);
})

console.log(result)

