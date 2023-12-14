// Solution for day 14 part 1 
// Puzzle: https://adventofcode.com/2023/day/14

const fs = require('node:fs');
const data = fs.readFileSync('input.txt', 'utf8').toString().trim().split('\n').map(x => x.replace("\r", ""));

let result = 0;

// Map input to 2d grid
let grid = [];
data.forEach(line => {
    grid.push(line.split(""));
})

// Tilt grid
for(let i = 0; i < grid.length; i++) { 
    for (let c = 0; c < grid[0].length; c++) {
        for (let r = 0; r < grid.length-1; r++) {
            if (grid[r][c] == "." && grid[r+1][c] == "O") {
                grid[r][c] = "O";
                grid[r+1][c] = ".";
            }
        }
    }
}   

// Count totals
grid.forEach((line, index) => {
    let count = 0;
    line.forEach(stone => {
        if (stone == "O") 
            count++;
    })
    result = result + (count * (grid.length - index))
})


// Write to file for testing 
let fileData = "";
grid.forEach(line => {
    fileData = fileData + line.toString().replaceAll(",", "") + "\n";
}) 
fs.writeFileSync('output.txt', fileData, 'utf8')


// Print result
console.log(result);
