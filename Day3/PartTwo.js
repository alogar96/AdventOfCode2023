// Solution for day 3 part 2
// Puzzle: https://adventofcode.com/2023/day/3

const fs = require('node:fs');
const data = fs.readFileSync('input.txt', 'utf8').toString().trim().split('\n').map(d => d.split(""));

let result = 0;
let gears = [];

// Check if char is a gear symbol
function isGearSymbol(c) {
  return c == "*";
}

// Check if gear is around the number
function findGear(lineIndex, cIndex) { 

  // Up
  if (lineIndex > 0) {
    if (isGearSymbol(data[lineIndex-1][cIndex])) 
      return {"line": lineIndex-1, "c": cIndex};
    if (cIndex > 0 && isGearSymbol(data[lineIndex-1][cIndex-1])) 
      return {"line": lineIndex-1, "c": cIndex-1};
    if (cIndex < data[lineIndex].length-1 && isGearSymbol(data[lineIndex-1][cIndex+1])) 
      return {"line": lineIndex-1, "c": cIndex+1};
  }

  // Center 
  if (cIndex > 0 && isGearSymbol(data[lineIndex][cIndex-1])) 
    return {"line": lineIndex, "c": cIndex-1};
  if (cIndex < data[lineIndex].length-1 && isGearSymbol(data[lineIndex][cIndex+1])) 
    return {"line": lineIndex, "c": cIndex+1};

  // Down
  if (lineIndex < data.length-1) {
    if (isGearSymbol(data[lineIndex+1][cIndex])) 
      return {"line": lineIndex+1, "c": cIndex};
    if (cIndex > 0 && isGearSymbol(data[lineIndex+1][cIndex-1])) 
      return {"line": lineIndex+1, "c": cIndex-1};
    if (cIndex < data[lineIndex].length-1 && isGearSymbol(data[lineIndex+1][cIndex+1])) 
      return {"line": lineIndex+1, "c": cIndex+1};
  }  

  return null;
}

// Calculate gear ratios
function gearCalc(coor, value) {
  const i = gears.findIndex(e => e["line"] == coor.line && e["c"] == coor.c);
  if (i > -1) {
    gears[i]["value"] = gears[i]["value"] * value;
    gears[i]["gear"] = true;
  }
  else {
    gears.push({"line": coor.line, "c": coor.c, "value": value})
  }
}

data.forEach((line, lineIndex) => {
  let coor = null;
  let strNum = '';
  line.forEach((c, cIndex) => {
    if (!isNaN(c)) {
      strNum = strNum + c;
      if (coor == null) {
        coor = findGear(lineIndex, cIndex);
      }       
      if (cIndex == line.length-1 && coor != null) {
        gearCalc(coor, parseInt(strNum))
      }
    }
    else {
      if (strNum != '' && coor != null) {
        gearCalc(coor, parseInt(strNum))
      }
      coor = null;
      strNum = '';
    }
  });
});

// Sum gear ratios
gears.forEach(g => {
  if (g["gear"])
    result = result + g["value"];
});

// Print result
console.log(result);

