// Solution for day 8 part 1 
// Puzzle: https://adventofcode.com/2023/day/8

const fs = require('node:fs');
const data = fs.readFileSync('input.txt', 'utf8').toString().trim().split('\n');

let result = 0;

let directions = data[0];
let nodes = data.slice(2,data.length).map(e => e.split("="));
let parents = [];
let childs = [];

function getNextNode(index, direction) {
    if (direction == "L")
        return childs[index][0];
    return childs[index][1];
}

nodes.forEach(node => {
    let str = node[1].replace("(", "").replace(")", "").split(",").map(x => x.trim());
    childs.push(str);
    parents.push(node[0].trim());    
})

let nextNode = "AAA";
do {
    for (let i = 0; i < parents.length; i++) {
        if (parents[i] == nextNode) {
            nextNode = getNextNode(i, directions[result%directions.length]);
            break;
        }
    }
    result = result +1;
}
while (!(nextNode == "ZZZ"))

console.log(result);
