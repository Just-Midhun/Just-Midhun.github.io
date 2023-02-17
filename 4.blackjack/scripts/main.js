let firstCard=getRandomCard();
let secondCard=getRandomCard();
let cards=[firstCard,secondCard];
let sum;
let hasBlackJack=false;
let isAlive=true;
let message;
let gameActive=false;
let aldreadyStarted=false;

let messageEl=document.getElementById("message-el");
let cardEl=document.querySelector("#card-el");
let sumEl=document.querySelector("#sum-el");

//use of queryselector needs # for id or . for class for selecting text from html

let player={
    name: "per",
    chips: 112
};

let playerEl=document.getElementById("player-el");
playerEl.textContent =player.name+":"+player.chips;

start.addEventListener("click", startGame);
newcard.addEventListener("click", newCard);

function startGame() {
    
    if(aldreadyStarted===false) {
    
    sum=firstCard+secondCard;
    gameActive=true;
    sumEl.textContent="SUM:"+sum;
    cardEl.textContent="CARDS:"+firstCard+" "+secondCard;
    hasBlackJack=false;
    isAlive=true;

    checkJack();
    }
    
}

function newCard() {
    if(isAlive===true && gameActive===true) {
    
    aldreadyStarted = true;
    let card=getRandomCard();
    sum+=card;
    sumEl.textContent="Sum:"+sum;
    cardEl.textContent+=" "+card;

    checkJack();
    }
}

function checkJack(){
    
    if(sum<=20){
        message="do you want to draw a new card?";
    }
    
    else if(sum===21){
        message="BLACKJACk!!!!";
        hasBlackJack=true;
        isAlive=false;
        aldreadyStarted=false;
        
    }
    
    else {
        message="you are out!<3";
        isAlive=false;
        aldreadyStarted=false;
    
    }

    messageEl.textContent=message;
}

function getRandomCard(){
    let random=Math.floor(Math.random()*13)+1;
    if (random===1)
    return 11;

    else if(random>10)
    return 10;

    else 
    return random;
    //math.random provides random numbers from 0.000 to 0.999
}
