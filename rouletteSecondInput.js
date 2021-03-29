const os = require('os');
const fse = require('fs-extra');



console.log ('Player          Total Win        Total Bet')
console.log ('-------')
let array = fse.readFileSync('input.txt').toString().split("\n");
for(line in array) {
    let playerData = array[line].toString().split(',')
    if(playerData[0].length>1)
    console.log(`${playerData[0]}      ${playerData[1]}        ${playerData[2]}`)  
}
