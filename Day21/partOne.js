// Solution for day 21 part 1
// Puzzle: https://adventofcode.com/2023/day/21

const fs = require('node:fs');
const data = fs.readFileSync('input.txt', 'utf8').trim().split("\n").map(x => x.split(""));

const steps = 64;
let result = 0;

// Find next steps based on start coord [x,y]
function findNextSteps(x, y) {
    let nextSteps = [];
    if (x+1 < data[0].length && data[x+1][y] != "#")
        nextSteps.push([x+1, y]);
    if (y+1 < data[0].length && data[x][y+1] != "#")
        nextSteps.push([x, y+1]);
    if (y-1 < data[0].length && data[x][y-1] != "#")
        nextSteps.push([x, y-1]);
    if (x-1 < data[0].length && data[x-1][y] != "#")
        nextSteps.push([x-1, y]);
    
    return nextSteps;
}

// Check if sub array exists in source array
function exists(src, arr) {
    for (let i = 0; i < src.length; i++) {
        if (src[i][0] == arr[0] && src[i][1] == arr[1])
            return true;
    }
    return false;
}

// Find start "S"
let start = [];
for (let row = 0; row < data.length; row++) {
    for (let c = 0; c < data[row].length; c++) {
        if (data[row][c] == "S") {
            start.push([row, c]);
            break;
        }
    }
}

let step = 0;
while(step < steps) {
    let nextStart = [];
    for (let i = 0; i < start.length; i++) {
        let nextSteps = findNextSteps(start[i][0], start[i][1]);
        for (let j = 0; j < nextSteps.length; j++) {
            if (!exists(nextStart, nextSteps[j]))
                nextStart.push(nextSteps[j]);
        }
    }
    result = nextStart.length;
    start = nextStart;
    step++;
}


console.log(result);
