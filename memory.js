//const symbols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']; // Add more symbols if needed
// Add cards immages
const symbols = {
    'apple': 'img_card/front_card_apple.png',
    'banana': 'img_card/front_card_banana.png',
    'broccoli': 'img_card/front_card_broccoli.png',
    'donut': 'img_card/front_card_donut.png',
    'grape': 'img_card/front_card_grape.png',
    'hamburger': 'img_card/front_card_hamburger.png',
    'kebab': 'img_card/front_card_kebab.png',
    'kiwi': 'img_card/front_card_kiwi.png',
    'lemon': 'img_card/front_card_lemon.png',
    'pancakes': 'img_card/front_card_pankakes.png',
    'pineapple': 'img_card/front_card_pineapple.png',
    'pizza': 'img_card/front_card_pizza.png',
    'softdrink': 'img_card/front_card_softdrink.png',
    'strawberry': 'img_card/front_card_strawberry.png',
    'sushi': 'img_card/front_card_sushi.png',
    'watermelon': 'img_card/front_card_watermelon.png',
     

};

let cards = [];

// Creare un array di simboli duplicati per formare le coppie
const duplicateSymbols = Object.values(symbols).concat(Object.values(symbols));

// Funzione per mescolare l'array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


// Create the game board
function createGameBoard() {
    shuffleArray(duplicateSymbols);

    const gameBoard = document.getElementById('gridCard');

    duplicateSymbols.forEach(symbol => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol;
        card.textContent = ''; // Initially hide symbols

        card.addEventListener('click', flipCard);

        gameBoard.appendChild(card);
        cards.push(card);
    });
}

// Function to handle card flipping
function flipCard() {
    const selectedCard = this;
    
    // Avoid flipping already matched or opened cards
    if (selectedCard.textContent === '' && cardsFlipped.length < 2) {
        selectedCard.textContent = selectedCard.dataset.symbol;
        
        cardsFlipped.push(selectedCard);

        if (cardsFlipped.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }
}

// Function to check if flipped cards match
function checkMatch() {
    const [card1, card2] = cardsFlipped;

    if (card1.dataset.symbol === card2.dataset.symbol) {
        // Matched
        card1.removeEventListener('click', flipCard);
        card2.removeEventListener('click', flipCard);
    } else {
        // Not matched
        card1.textContent = '';
        card2.textContent = '';
    }

    cardsFlipped = [];

    // Add logic to check if all cards are matched and end the game
}

// Initialize the game
createGameBoard();
