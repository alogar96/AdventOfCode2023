// Solution for day 5 part 2
// Puzzle: https://adventofcode.com/2023/day/5

// MIGHT NOT WORK FOR EVERY INPUT !

const fs = require('node:fs');
const data = fs.readFileSync('input.txt', 'utf8').trim().split("\n");

let result = Number.MAX_SAFE_INTEGER;

let map = "";
let maps = {};
let seedData = data[0].split(" ").slice(1, 100).map(el => parseInt(el));

// Hash soruce seed to dest
function hash(seed, arr) {
    if (seed >= arr[1] && seed <= arr[1] + (arr[2]-1)) {
        let sub = (arr[1] + (arr[2]-1)) - seed;
        return (arr[0] + (arr[2]-1)) - sub;
    }
    return -1;
}

// Find min seed location
function findLoc(seed) {
    let s = seed;
    for (let map in maps) {
        for (let set in maps[map]) {
            let newS = hash(s, maps[map][set]);
            if (newS != -1) {
                s = newS;
                break;
            }
        }
    }
    return s;
}

// Find range min location
function rangeMin(start, stop) {
    let min = Number.MAX_SAFE_INTEGER;
    for (let i = start; i < stop; i++) {
        let value = findLoc(i);
        if (value < min)
            min = value;
    }
    return min;
}

// Parse maps
for (let row = 1; row < data.length; row++ ) {
    if (data[row] == "") {
        continue;
    }
    else if (data[row].includes(":")) {
        map = data[row];
        maps[data[row]] = [];
    }
    else {
        let arr = data[row].split(" ").map(el => parseInt(el));
        maps[map].push(arr);
    }
}

// Brute force, but only ranges where min location was found
let rangeStep = 20000;
for (let i = 0; i < seedData.length; i = i + 2) {
    let range = [];
    let n = seedData[i];
    while (n < seedData[i]+seedData[i+1]) {
        range.push([n, findLoc(n)]);
        n = n + rangeStep;
    }

    let index = 0;
    let min = range[0][1];
    for (let r = 0; r < range.length; r++) {
        if (range[r][1] < min) {
            min = range[r][1];
            index = range[r][0];
        }
    }

    let start = index;
    if (index > rangeStep)
        start = index-rangeStep;

    let seedMin = rangeMin(start, index+rangeStep);
    if (seedMin < result)
        result = seedMin;
}


// Print result
console.log(result);
