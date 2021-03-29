const prompt = require('prompt-sync')();
const fs = require('fs');
const os = require('os');
const fse = require('fs-extra');

const evenDecider = (num)=>{
    let decide = num % 2
    let returnedValue = decide == 0 ? true: false
    return returnedValue
}

const computeSingleBetMoneyResult = (inputNumber = 0,spinNumber,gameType,betMoney)=>{

    if (gameType == 1){
        let evenResult = evenDecider(spinNumber)== true? 'win':'lose'
        console.log(`even Result ${evenResult}`)
        if(evenResult == 'win'){
            return 2 * betMoney
        }
        else {
            return 0
        }
    }

    if (gameType == 2){
        let oddResult = evenDecider(spinNumber)== false? 'win':'lose'
        console.log(`odd Result ${oddResult}`)
        if(oddResult == 'win'){
            return 2 * betMoney
        }
        else {
            return 0
        }
    }

    if (gameType == 3){
        return inputNumber == spinNumber? 36 * betMoney: 0
 
    }

    else{
        console.log('Please enter proper values')
    }

}