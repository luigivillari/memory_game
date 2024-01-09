document.addEventListener('DOMContentLoaded', function () {
    const gridCard = document.getElementById('gridCard');

    const symbols_16 = [
        'apple', 'banana', 'broccoli', 'donut',
        'grape', 'hamburger', 'kebab', 'kiwi',
        'lemon', 'pancakes', 'pineapple', 'pizza',
        'softdrink', 'strawberry', 'sushi', 'watermelon'
    ];

    const duplicateSymbols = symbols_16.concat(symbols_16);
    shuffleArray(duplicateSymbols);
  

    duplicateSymbols.forEach(symbol => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol;

        card.addEventListener('click',flipCard);
        

        gridCard.appendChild(card);
    });
    const queryString = window.location.search;
    // Crea un oggetto URLSearchParams dalla stringa della query
    const params = new URLSearchParams(queryString);
    // Ottieni il valore associato alla chiave 'value'
    const modalita = params.get('value');
    startgame(modalita);
});

let delay=0;
function startgame(modalita) { 
    if(modalita === 'easy'){
        delay = 4000;
    }
    else if (modalita === 'normal'){
        delay = 2000;
    }
    else if (modalita==='hard'){
        delay = 1000;
    }
    else{
        delay=2000;
    }
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        const symbol = card.dataset.symbol;
        card.classList.toggle('flipped');
        card.style.backgroundImage = `url('../img_card/front_card_${symbol}.png')`;
    })

    setTimeout(function () {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.classList.remove('flipped');
            card.style.backgroundImage = "url('../img_card/back_card.png')";
        });
    }, delay);
    
}

    let pairA = 0;
    let pairB = 0;
    let turn = 0;
    let flag = true;
    
      

function updateScore(){
    let scoreA = document.getElementById('first');
    scoreA.innerHTML = pairA;
    let scoreB = document.getElementById('last');
    scoreB.innerHTML = pairB;
}

function updateTurn(){
    let nTurn = document.getElementById('turno');
    nTurn.innerHTML = turn ;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


let flippedCards = [];
function flipCard() {

    const selectedCard = this;
    selectedCard.classList.toggle('flipped');

    // Se la carta è girata, cambia dinamicamente l'immagine
    if (selectedCard.classList.contains('flipped')) {
        const symbol = selectedCard.dataset.symbol;
        selectedCard.style.backgroundImage = `url('../img_card/front_card_${symbol}.png')`;
        flippedCards.push(selectedCard);
    } else {
        // Se la carta è nuovamente girata, ripristina l'immagine di default
        selectedCard.style.backgroundImage = "url('../img_card/back_card.png')";
        const index = flippedCards.indexOf(selectedCard);
        flippedCards.splice(index, 1);
    }

    if (flippedCards.length === 2) {
        checkMatch();
    }
}


function checkMatch() {
    const [card1, card2] = flippedCards;

    if (turn%2 || turn === 0 || flag === true) {

    // Verifica se le carte sono uguali
        if (card1.dataset.symbol === card2.dataset.symbol) {
            // Carte uguali, rimuovi dalla griglia
            setTimeout(() => {
                card1.style.visibility = 'hidden';
                card2.style.visibility = 'hidden';
            }, 200);

            pairA+=1;
            turn+=1;
            updateScore();
            updateTurn();

        } else {
            // Carte diverse, girale di nuovo
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                card1.style.backgroundImage = "url('../img_card/back_card.png')";
                card2.style.backgroundImage = "url('../img_card/back_card.png')";
            }, 400);
            turn+=1;
            updateTurn();
            flag = false;

        }
    }

    else{
        if (card1.dataset.symbol === card2.dataset.symbol) {
            // Carte uguali, rimuovi dalla griglia
            setTimeout(() => {
                card1.style.visibility = 'hidden';
                card2.style.visibility = 'hidden';
            }, 200);

            pairB+=1;
            turn+=1;
            updateScore();
            updateTurn();

        } else {
            // Carte diverse, girale di nuovo
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                card1.style.backgroundImage = "url('../img_card/back_card.png')";
                card2.style.backgroundImage = "url('../img_card/back_card.png')";
            }, 400);
            turn+=1;
            updateTurn();
            flag= true;
        }

    }


    // Ripristina la possibilità di cliccare dopo la verifica
    setTimeout(() => {
        document.querySelectorAll('.card').forEach(card => {
            card.style.pointerEvents = 'auto';
        });
    }, 200);

    // Resetta l'array delle carte girate
    flippedCards = [];
}       