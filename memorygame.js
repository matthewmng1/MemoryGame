// Tasks
// flip the cards using .is-flipped class
// randomize where each card is located on the grid
// can do this by creating an array that includes all the cards?
// create an EventListener for clicks
// if card1 does not match card2, flip cards back over
// if card1 does match card2, keep front cards showing
// if no more cards left to flip, alert that game is over
// players can only flip two cards at a time
// do not allow players to click the same card twice

const cards = document.querySelectorAll(".card")
let numCards = cards.length;
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let noClicking = false;

for (let card of cards) {
    card.addEventListener("click", cardClick);
}
function shuffle(array) {
    let counter = array.length;
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);

        counter--;

        let temp = array[counter];
        array[counter] = array [index];
        array[index] = temp;
    }
    return array;
}

let shuffledCards = shuffle(cards);

function cardClick(e){
    if (noClicking) return;
    if (e.target.classList.contains("flipped")) return;

    let currentCard = e.target;
    currentCard.style.backgroundColor = currentCard.classList[0]

    if (!card1 || !card2){
        currentCard.classList.add("flipped");
        card1 = card1 || currentCard;
        card2 = currentCard === card1 ? null : currentCard;
    }

    if (card1 && card2){
        noClicking = true;
        let gif1 = card1.className;
        let gif2 = card2.className;
        if (gif1 === gif2) {
            cardsFlipped +=2;
            card1.removeEventListener("click", cardClick);
            card2.removeEventListener("click", cardClick);
            card1 = null;
            card2 = null;
            noClicking = false;
        } else {
            setTimeout(function(){
                card1.style.backgroundColor = "";
                card2.style.backgroundColor = "";
                card1.classList.remove("flipped");
                card2.classList.remove("flipped");
                card1 = null;
                card2 = null;
            }, 1000);

        }
    }
    if (cardsFlipped === numCards) alert("game over!");
}
