// Solution for day 5 part 1 
// Puzzle: https://adventofcode.com/2023/day/5

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

// Parse seeds
let seeds = [];
for (let i = 0; i < seedData.length; i = i + 2) {
    for (let j = seedData[i]; j < seedData[i] + seedData[i+1]; j++) {
        seeds.push(j)
    }
}

/*
// Map seeds
seeds.forEach(seed => {
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
    if (s < result)
        result = s;
})
*/

// Print result
console.log(result);
