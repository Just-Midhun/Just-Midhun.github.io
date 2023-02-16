let firstCard=getRandomCard();
let secondCard=getRandomCard();
let cards=[firstCard,secondCard];
let sum=firstCard+secondCard;
let hasBlackJack=false;
let isAlive=true;
let message;

let messageEl=document.getElementById("message-el");
let cardEl=document.querySelector("#card-el");
let sumEl=document.querySelector("#sum-el");
//use of queryselector needs # for id or . for class for selecting text from html

start.addEventListener("click", startGame);
newcard.addEventListener("click", newCard);

function startGame() {
            
    sumEl.textContent="SUM:"+sum;
    cardEl.textContent="CARDS:"+firstCard+" "+secondCard;

    checkJack();
}

function newCard() {
    
    let card=getRandomCard();
    sum+=card;
    sumEl.textContent="Sum:"+sum;
    cardEl.textContent+=" "+card;

    checkJack();
}

function checkJack(){
    
    if(sum<=20){
        message="do you want to draw a new card?";
    }
    
    else if(sum===21){
        message="BLACKJACk!!!!";
        hasBlackJack=true;
    }
    
    else {
        message="you are out!<3";
        isAlive=false;
    }

    messageEl.textContent=message;
}

function getRandomCard(){
    return Math.floor(Math.random()*13);
    //math.random provides random numbers from 0.000 to 0.999
}