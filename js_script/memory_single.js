// Aggiungi un listener per l'evento 'DOMContentLoaded' per eseguire il codice quando il documento è completamente caricato
document.addEventListener('DOMContentLoaded', function () {
    const gridCard = document.getElementById('gridCard');   // Ottieni il riferimento all'elemento con ID 'gridCard'

    const symbols_16 = [   // Array di simboli utilizzati nel gioco (duplicato per creare le coppie)
        'apple', 'banana', 'broccoli', 'donut',
        'grape', 'hamburger', 'kebab', 'kiwi',
        'lemon', 'pancakes', 'pineapple', 'pizza',
        'softdrink', 'strawberry', 'sushi', 'watermelon'
    ];

    const duplicateSymbols = symbols_16.concat(symbols_16);//duplica i simboli per creare le coppie
    shuffleArray(duplicateSymbols); // Mette in posizioni casuali i simboli
  

    duplicateSymbols.forEach(symbol => {    // Itera su ogni simbolo e crea una carta per ciascuno
        const card = document.createElement('div');//crea un elemento div per ogni carta
        card.classList.add('card_game');    //aggiunge la classe card_game per ogni carta
        card.dataset.symbol = symbol;   //inserisce un simbolo

        card.addEventListener('click',flipCard);    // Aggiungi un listener per l'evento 'click' a ciascuna carta
        

        gridCard.appendChild(card);  // Aggiungi la carta al contenitore 'gridCard'
    });
    const queryString = window.location.search;
    // Crea un oggetto URLSearchParams dalla stringa della query
    const params = new URLSearchParams(queryString);
    // Ottieni il valore associato alla chiave 'value'
    const modalita = params.get('value');   //estrae il valore associato alla chiave 'value' dall'url
    startgame(modalita);     // Avvia il gioco con la modalità selezionata e visualizza i nomi dei giocatori
});
let delay=0;//Variabile per gestire la difficoltà della partita
let point=0; //Inizializzo i punti 

function startgame(modalita) { 
    if(modalita === 'easy'){ //Gestione delle varie difficoltà
        delay = 4000;
    }
    else if (modalita === 'normal'){
        delay = 2000;
    }
    else if (modalita === 'hard'){
        delay = 800;
    }
    else {
        delay = 2000;
    }
    const cards = document.querySelectorAll('.card_game');
    // Ottieni tutte le carte e impostane dinamicamente l'immagine
    cards.forEach(card => {
        const symbol = card.dataset.symbol;
        card.classList.toggle('flipped'); //aggiunge dinamica
        card.style.backgroundImage = `url('../img_card/front_card_${symbol}.png')`;
    })

    // Dopo il ritardo, resetta tutte le carte allo stato di copertura
    setTimeout(function () {
        const cards = document.querySelectorAll('.card_game');
        cards.forEach(card => {
            card.classList.remove('flipped');
            card.style.backgroundImage = "url('../img_card/back_card.png')";
        });
    }, delay);
    startTimer();    // Fa partire il timer della partita
}

let turn = 0; //Inizializzazione della variabile turn
    
function updateTurn(){ //Funzione per aggiornare i turni
    let nTurn = document.getElementById('turno');
    nTurn.innerHTML = turn ;
}

function shuffleArray(array) { //Funzione per mischiare le carte
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


let flippedCards = []; //Creazione dell'array flippedCards
function flipCard() { //Funzione che mi permette di girare graficamente le carte e di annetterle all'interno dell'array flippedCards

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


function checkMatch() {  //Funzione per controllare se il giocatore ha trovato o no una coppia
    const [card1, card2] = flippedCards;


    // Verifica se le carte sono uguali
        if (card1.dataset.symbol === card2.dataset.symbol) {
            // Carte uguali, rimuovi dalla griglia
            setTimeout(() => {
                card1.style.visibility = 'hidden';
                card2.style.visibility = 'hidden';
            }, 200);

            turn+=1;
            updateTurn();
            end_game();

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
            

        }
    // Ripristina la possibilità di cliccare dopo la verifica
    setTimeout(() => {
        document.querySelectorAll('.card_game').forEach(card => {
            card.style.pointerEvents = 'auto';
        });
    }, 200);

    // Resetta l'array delle carte girate
    flippedCards = [];
}     
let seconds = 0;
let timerInterval;

function startTimer() {
    // Resetta il conteggio del tempo e cancella eventuali intervalli precedenti
    seconds = 0;
    clearInterval(timerInterval);

    // Imposta un intervallo per chiamare la funzione updateTime ogni secondo
    timerInterval = setInterval(updateTime, 1000);
}

function updateTime() { //Funzione che gestisce il contatore del tempo durante la partita
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    //formatta il tempo
    const formattedTime = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;

    document.getElementById('timer').textContent = formattedTime;

    seconds++;
}

const Back=document.getElementById('Back');
Back.addEventListener('click', homePage);

function homePage() {
    window.location.href = "../html/home.html"; //Reindirizzamento alla pagina specificata
}


function end_game(){ //Funzione riconoscere la fine della partita
    point+=1;

    if (point == 16){
        alert("Hai completato l'allenamento con successo!");
        window.location.href = "../html/home.html"; //Reindirizzamento alla pagina specificata
    }

    
}