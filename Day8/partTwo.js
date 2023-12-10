// Solution for day 8 part 2 
// Puzzle: https://adventofcode.com/2023/day/8

const fs = require('node:fs');
const data = fs.readFileSync('input.txt', 'utf8').toString().trim().split('\n');

let result = 0;

let directions = data[0];
let nodes = data.slice(2,data.length).map(e => e.split("="));
let parents = [];
let childs = [];


function gcd(x, y) {
    return x ? gcd(y % x, x) : y; 
}

function lcm(x, y) {
    return x * y / gcd(x, y);
}

function getNextNode(index, direction) {
    if (direction == "L")
        return childs[index][0];
    return childs[index][1];
}

function countSteps(nextNode) {
    let steps = 0;
    do {
        //console.log(nextNode)
        for (let i = 0; i < parents.length; i++) {
            if (parents[i] == nextNode) {
                nextNode = getNextNode(i, directions[steps%directions.length]);
                break;
            }
        }
        steps = steps +1;
    }
    while (!(nextNode[nextNode.length-1] == "Z"))

    return steps;
}

nodes.forEach(node => {
    let str = node[1].replace("(", "").replace(")", "").split(",").map(x => x.trim());
    childs.push(str);
    parents.push(node[0].trim());    
})

// Get all steps
let allSteps = [];
parents.forEach(parent => {
    if (parent[parent.length-1] == "A") {
        allSteps.push(countSteps(parent));
    }
})

// LCM on all steps
result = allSteps.reduce(lcm); 
console.log(result);
