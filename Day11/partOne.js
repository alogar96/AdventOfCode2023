// Solution for day 11 part 1 
// Puzzle: https://adventofcode.com/2023/day/11

const fs = require('node:fs');
const data = fs.readFileSync('input.txt', 'utf8').split('\n').map(x => x.split(""))

let result = 0;

// Calculate distance between two points, avoid diagonals
function manhattanDistance(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

// Expand rows
let expandR = [];
data.forEach(row => {
    expandR.push(row);
    if (!row.includes("#")) 
    expandR.push(row);
});

// Expand columns
let expandC= Array.from(Array(expandR.length), () => new Array());
for (let i = 0; i < expandR[0].length; i++) {
    let empty = true;
    for (let row = 0; row < expandR.length; row++) {
        if (expandR[row][i] == "#") {
            empty = false;
            break;
        }
    }
    for (let j = 0; j < expandR.length; j++) {
      if (empty) {
        expandC[j].push(".");
        expandC[j].push(".");
      } 
      else {
        expandC[j].push(expandR[j][i]);
      } 
    }   
}

// Find all galaxies
let galaxies = [];
for (let i = 0; i < expandC.length; i++) {
    for (let j = 0; j < expandC[0].length; j++) {
        if (expandC[i][j] == "#")
            galaxies.push({x: j, y: i});
    }
}

// Sum of shortest paths
for (let i = 0; i < galaxies.length; i++) {
    for (let j = i+1; j < galaxies.length; j++) {
        result = result + manhattanDistance(galaxies[i], galaxies[j]);
    }
}

// Write to file for testing purpose
let fileData = "";
expandC.forEach(line => {
    fileData = fileData + line.toString().replaceAll(",", "") + "\n";
}) 
fs.writeFileSync('output.txt', fileData, 'utf8');


console.log(result);