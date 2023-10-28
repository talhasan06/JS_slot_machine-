//1. Depsosit some money
//2. determine number of lines to bet on
//3. collect a bet amount
//4. spin the slot machine
//5. check if the user won
//6. if the user wining
//7. play again

// function deposit(){
    
// }

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A:2,
    B:4,
    C:6,
    D:8
}

const SYMBOLS_VALUES={
    A:5,
    B:4,
    C:3,
    D:2
}


const deposit=()=>{
    while(true){
        const depositAmount = prompt("Enter a deposit amount: ")
        const numberDepositAmount = parseFloat(depositAmount);
        
        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0){
            console.log("Invalid deposit amount, try again");
        }else{
            return numberDepositAmount;
        }
    }
};

const getNumberOfLines=()=>{
    while(true){
        const lines = prompt("Enter the number of lines to bet on (1-3): ")
        const numberOfLines = parseInt(lines);
        
        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3 ){
            console.log("Invalid number of lines, try again");
        }else{
            return numberOfLines;
        }
    }
}

const getBet=(balance,lines)=>{
    while(true){
        const bet = prompt("Bet per line: ")
        const numberBet = parseInt(bet);
        
        if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance/lines ){
            console.log("Invalid bet, try again");
        }else{
            return numberBet;
        }
    }
}

const transpose=(reels)=>{
    const rows = [];

    for (let i= 0; i < ROWS; i++){
        rows.push([]);
        for (let j=0; j < COLS; j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
}

const spin = () =>{
    const symbols = [];
    for (const [symbol,count] of Object.entries(SYMBOLS_COUNT)){
        for (let i=0; i < count; i++){
            symbols.push(symbol);
        }
    }

    const reels = [[],[],[]];

    for (let i=0; i < COLS; i++){
        const reelsSymbols=[...symbols];
        for (let j=0; j < ROWS; j++){
            const randomIndex=Math.floor (Math.random() * reelsSymbols.length)
            const selectedSymbol = reelsSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelsSymbols.splice(randomIndex,1);
        }
    }
    return reels;
};

const printRows=(rows)=>{
    for(const row of rows){
        let rowString =" ";
        for(const [i,symbol] of row.entries()){
            rowString += symbol
            if(i != row.length -1 ){
                rowString += " | "
            }
        }
        console.log(rowString);
    }
}

const getWinnings=(rows,bet,lines)=>{
    let winnings = 0;

    for(let row =0; row<lines ; row++){
        const symbols = rows[row];
        let allSame = true;

        for(const symbol of symbols){
            if(symbol != symbols[0]){
                allSame= false;
                break;
            }
        }
        if(allSame){
            winnings += bet * SYMBOLS_VALUES[symbols[0]]
        }
    }
    return winnings;
}



let balance = deposit();
const numberOfLines = getNumberOfLines();
const bet = getBet(balance,numberOfLines);
const reels = spin();
// console.log(reels);
const rows = transpose(reels);
// console.log(rows);
printRows(rows);
const winnings = getWinnings(rows,bet,numberOfLines);
console.log("You won,$ "+winnings.toString());