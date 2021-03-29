const prompt = require('prompt-sync')();
const fs = require('fs');
const os = require('os');
const fse = require('fs-extra');

let gameChoice = 1 //set condition to play

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

const readingPlayerName = (name)=>{
    return prompt(`Please enter name ${name}?: `);
}

const choiceTester = (gameChoice,playerName)=>{
    // testing if a player has chosen game type 3 (1-36)

    let choice = gameChoice == 3? prompt(`${playerName} please choose a value between 1 and 36 `):0
    if (choice >37 || choice < 0){
        gameChoice = 2
        console.log('invalid choice')
        return 0
    }
    return choice
}

const verdict = (gameBet) =>{
    return gameBet == 0? 'lose': 'win'
}

const syncWait = ms => {
    const end = Date.now() + ms
    while (Date.now() < end) continue
}

const mainFunction = (player1,player2)=>{

    const player1GameType = prompt(`${player1} please enter game type [1 - EVEN , 2 - ODD, 3 - (1-36)]: `)
    const player1BetMoney = prompt(`${player1} please enter money you are placing on the bet: `)  

    const player2GameType = prompt(`${player2} please enter game type [1 - EVEN , 2 - ODD, 3 - (1-36)]: `)
    const player2BetMoney = prompt(`${player2} please enter money you are placing on the bet: `)  

    console.log(`name : ${player1} game type: ${player1GameType} bet money: ${player1BetMoney}`)
    console.log(`name : ${player2} game type: ${player2GameType} bet money: ${player2BetMoney}`)
    
    const player1ChosenValue = choiceTester(player1GameType,player1)
    const player2ChosenValue = choiceTester(player2GameType,player2)

    
      const spinValue = Math.ceil(Math.random() * 36)
      console.log(spinValue)
      const player1BetMoneyResult = computeSingleBetMoneyResult(player1ChosenValue,spinValue,player1GameType,player1BetMoney)
      const player2BetMoneyResult = computeSingleBetMoneyResult(player2ChosenValue,spinValue,player2GameType,player2BetMoney)

      console.log(player1ChosenValue,spinValue,player1GameType,player1BetMoney)
      console.log(player2ChosenValue,spinValue,player2GameType,player2BetMoney)


      const player1Outcome = verdict(player1BetMoneyResult)
      const player2Outcome = verdict(player2BetMoneyResult)
      console.log('waiting.....')
      syncWait(30000)
      
      console.log(`${spinValue} ${player1BetMoneyResult} ${player2BetMoneyResult}`)
      console.log(`Number:  ${spinValue}`)
      console.log(`Player      Bet     Outcome      Winnings`)
      console.log('---')
      console.log(`${player1}           ${player1BetMoney}          ${player1Outcome}        ${player1BetMoneyResult}`)
      console.log(`${player2}           ${player2BetMoney}          ${player2Outcome}        ${player2BetMoneyResult}`)


      
      let array = fse.readFileSync('input.txt').toString().split("\n");
      for(line in array) {
          let newData = []
          console.log(array[line]);
          let playerData = array[line].toString().split(',')
          console.log(playerData)
          if (playerData[0] == player1) {
              newData.push(playerData[0])
              let totalWin1 = parseFloat(player1BetMoneyResult) + parseFloat(playerData[1])
              let totalBet1 = parseFloat(player1BetMoney)  + parseFloat(playerData[2])
              newData.push(totalWin1)
              newData.push(totalBet1)
              fse.outputFileSync('input.txt', `${newData[0]},${newData[1]},${newData[2]},${os.EOL}` )
              console.log(newData)
          }

         if  (playerData[0] == player2){
              newData.push(playerData[0])
              let totalWin = parseFloat(player2BetMoneyResult) + parseFloat(playerData[1])
              let totalBet = parseFloat(player2BetMoney) + parseFloat(playerData[2])
              newData.push(totalWin)
              newData.push(totalBet)
              fse.outputFileSync('input.txt', `${newData[0]},${newData[1]},${newData[2]},${os.EOL}`, {flag: 'a'})
              console.log(newData)
          }

      }

      
}

// Program begin here

const player1 = readingPlayerName('player 1')
const player2 = readingPlayerName('player 2')


let gameChoice = 1 //set condition to play
fse.outputFileSync('input.txt', `${player1},${0.0},${0.0},${os.EOL}` )
fse.outputFileSync('input.txt', `${player2},${0.0},${0.0},${os.EOL}`, {flag: 'a'})
do{

    mainFunction(player1,player2)
    let choosePlayAgain = prompt('Do you wish to play again? 1 - continue , 2- end')
    gameChoice = choosePlayAgain == 1? 1:2

}

while(gameChoice == 1)
