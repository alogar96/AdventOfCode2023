// Solution for day 3 part 1 
// Puzzle: https://adventofcode.com/2023/day/3

const fs = require('node:fs');
const data = fs.readFileSync('input.txt', 'utf8').toString().trim().split('\n').map(d => d.split(""));

let result = 0;

// Check if char is a symbol 
function isSymbol(c) {
  if (c == "." || (!isNaN(c)))
    return false
  return true;
}

// Check if char is adjacent to a symbol
function isAdjacent(lineIndex, cIndex) { 

  // Up
  if (lineIndex > 0) {
    if (isSymbol(data[lineIndex-1][cIndex])) 
      return true;
    if (cIndex > 0 && isSymbol(data[lineIndex-1][cIndex-1])) 
      return true;
    if (cIndex < data[lineIndex].length-1 && isSymbol(data[lineIndex-1][cIndex+1])) 
      return true;
  }

  // Center 
  if (cIndex > 0 && isSymbol(data[lineIndex][cIndex-1])) 
    return true;
  if (cIndex < data[lineIndex].length-1 && isSymbol(data[lineIndex][cIndex+1])) 
    return true;

  // Down
  if (lineIndex < data.length-1) {
    if (isSymbol(data[lineIndex+1][cIndex])) 
      return true;
    if (cIndex > 0 && isSymbol(data[lineIndex+1][cIndex-1])) 
      return true;
    if (cIndex < data[lineIndex].length-1 && isSymbol(data[lineIndex+1][cIndex+1])) 
      return true;
  }  

  return false;
}

data.forEach((line, lineIndex) => {
  let adjacent = false;
  let strNum = '';
  line.forEach((c, cIndex) => {
    if (!isNaN(c)) {
      if (!adjacent) adjacent = isAdjacent(lineIndex, cIndex);
      strNum = strNum + c;
      if (cIndex == line.length-1 && adjacent) {
        result = result + parseInt(strNum);
      }
    }
    else {
      if (strNum != '' && adjacent) {
        result = result + parseInt(strNum);
      }
      adjacent = false;
      strNum = '';
    }
  });
});

// Print result
console.log(result);

