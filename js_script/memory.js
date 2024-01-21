// Array di simboli utilizzati nel gioco (duplicato per creare le coppie)
const symbols_16 = [
    'apple', 'banana', 'broccoli', 'donut',
    'grape', 'hamburger', 'kebab', 'kiwi',
    'lemon', 'pancakes', 'pineapple', 'pizza',
    'softdrink', 'strawberry', 'sushi', 'watermelon'
];
// Aggiungi un listener per l'evento 'DOMContentLoaded' per eseguire il codice quando il documento è completamente caricato
document.addEventListener('DOMContentLoaded', function () {
    const gridCard = document.getElementById('gridCard');  // Ottieni il riferimento all'elemento con ID 'gridCard'
    const duplicateSymbols = symbols_16.concat(symbols_16); //duplica i simboli per creare le coppie
    shuffleArray(duplicateSymbols); // Mette in posizioni casuali i simboli
  

    duplicateSymbols.forEach(symbol => {  // Itera su ogni simbolo e crea una carta per ciascuno
        const card = document.createElement('div'); //crea un elemento div per ogni carta
        card.classList.add('card_game');    //aggiunge la classe card_game per ogni carta
        card.dataset.symbol = symbol;   //inserisce un simbolo

        card.addEventListener('click',flipCard);   // Aggiungi un listener per l'evento 'click' a ciascuna carta
        

        gridCard.appendChild(card); // Aggiungi la carta al contenitore 'gridCard'
    });
    // Ottieni i parametri dalla query string nell'URL
    const queryString = window.location.search;
    // Crea un oggetto URLSearchParams dalla stringa della query
    const params = new URLSearchParams(queryString);
    // Ottieni il valore associato alla chiave 'value'
    const modalita = params.get('value'); //estrae il valore associato alla chiave 'value' dall'url
    const player1 = params.get('user1');  //estrae il valore associato alla chiave 'user1' dall'url
    const player2 = params.get('user2');  //estrae il valore associato alla chiave 'user2' dall'url
    console.log(player1);
    console.log(player2);
    

     // Avvia il gioco con la modalità selezionata e visualizza i nomi dei giocatori
    startgame(modalita);
    
    display_names(player1,player2);
});

let delay=0; //Variabile per gestire la difficoltà della partita
function startgame(modalita) { 
    if(modalita === 'easy'){ //Gestione delle varie difficoltà
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
    const cards = document.querySelectorAll('.card_game');
    
      // Ottieni tutte le carte e impostane dinamicamente l'immagine
    cards.forEach(card => {
        const symbol = card.dataset.symbol;
        card.classList.toggle('flipped');   //aggiunge dinamica
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
    startTimer(); // Fa partire il timer della partita
}

    let pairA = 0; // Inizializzazione delle coppie trovate dal giocatore A
    let pairB = 0;// Inizializzazione delle coppie trovate dal giocatore B
    let turn = 0; // Inizializzazione del contatore del turno 
    let flag = true; // Inizializzazione della flag per rispettare le regole del gioco

    
function display_names(player1,player2){ // Funzione per recuperare i nomi dei giocatori e di renderli visibili
    let giocatore1 = document.getElementById('player1');
    giocatore1.innerHTML = player1;
    let giocatore2 = document.getElementById('player2');
    giocatore2.innerHTML = player2;
    
}

function updateScore(){ //funzione per aggiornare i punti durante la partita
    let scoreA = document.getElementById('first');
    scoreA.innerHTML = pairA;
    let scoreB = document.getElementById('last');
    scoreB.innerHTML = pairB;
}

function updateTurn(){ //Funzione per aggiornare i turni
    let nTurn2 = document.getElementById('turno2');
    nTurn2.innerHTML = turn;
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
    //se la lunghezza dell'array è uguale a 2 controlla se le carte sono uguali
    if (flippedCards.length === 2) {
        checkMatch();
    }
}


function checkMatch() { //Funzione per controllare se il giocatore ha trovato o no una coppia
    const [card1, card2] = flippedCards;

    if ((turn%2 || turn === 0) && flag === true || flag === true) {

    // Verifica se le carte sono uguali
        if (card1.dataset.symbol === card2.dataset.symbol) {
            // Carte uguali, rimuovi dalla griglia
            setTimeout(() => {
                card1.style.visibility = 'hidden';
                card2.style.visibility = 'hidden';
            }, 200);

            pairA+=1;   //incremento punteggio
            turn+=1;    //incremento turno
            updateScore(); //Richiamo la funzione updatescore
            updateTurn(); //Richiamo la funzione updateturn

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
            flag = false; //Viene impostata la flag a false per permettere all'altro giocatore di entrare nel suo turno 

        }
    }

    else{
        if (card1.dataset.symbol === card2.dataset.symbol) {
            // Carte uguali, rimuovi dalla griglia
            setTimeout(() => {
                card1.style.visibility = 'hidden';
                card2.style.visibility = 'hidden';
            }, 200);

            pairB+=1;   //incremento punteggio
            turn+=1;    //incremento turno
            updateScore(); //Richiamo la funzione updatescore
            updateTurn(); //Richiamo la funzione updateturn

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
            flag= true; //Viene impostata la flag a true per permettere all'altro giocatore di entrare nel suo turno 
        }

    }


    // Ripristina la possibilità di cliccare dopo la verifica
    setTimeout(() => {
        document.querySelectorAll('.card_game').forEach(card => {
            card.style.pointerEvents = 'auto';
        });
    }, 200);

    // Resetta l'array delle carte girate
    flippedCards = [];
    if((pairA+pairB) == symbols_16.length){
        check_win(pairA,pairB);
    }
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
const button_home = document.getElementById('home-button');
button_home.addEventListener('click',homePage);
const button_replay = document.getElementById('replay-button');
button_replay.addEventListener('click',reloadPage);

function check_win(pairA,pairB){ //Funziona che controlla la vittoria di uno dei due giocatori
    const Player2 = document.getElementById('player2');
    const Player1 = document.getElementById('player1');
    const popup = document.getElementById('play-again');
    
    if(pairA>pairB){ //Controllo il caso della vittoria del giocatore A
        id_player(Player1,Player2);
        const messageElement = document.createElement('p');
        messageElement.innerHTML = "PLAYER 1 WON the Game";
        popup.appendChild(messageElement);
        popup.style.display = 'block';  //popup per riavviare o tornare alla home
        
       
    }
    else if (pairA<pairB){ //Controllo il caso della vittoria del giocatore B
        id_player(Player2,Player1);
        const messageElement = document.createElement('p');
        messageElement.innerHTML = "PLAYER 2 WON the Game";
        popup.appendChild(messageElement);
        popup.style.display = 'block'; //Popup per riavviare o tornare alla home
        
        
    }
    else{ //Controllo il caso di un pareggio 
        alert ('Game finished in a Draw');
        window.location.href='../html/home.html' //Reindirizzamento alla pagina selezionata
    }
}



function homePage(){
    window.location.href='../html/home.html'; //Reindirizzamento alla pagina selezionata
}

function reloadPage(){
    window.location.reload();   //ricarica la pagina corrente
}

function id_player(PlayerW,PlayerL){ 
    var data={};
    data.playerw = PlayerW.innerHTML; //Recupera lo username del player vincente
    data.playerl = PlayerL.innerHTML; //Recupera lo username del player sconfitto
    var JSONdata = JSON.stringify(data); //converte data in una stringa JSON
    var req = new XMLHttpRequest();// Crea un oggetto XMLHttpRequest
    if((data.playerw !="" && data.playerw != null) && (data.playerl !="" && data.playerl != null)){ //Effettuo i controlli su data
        req.onload = function(){    //definisce l'azione da eseguire una volta completata la richiesta
            console.log(req.responseText);
            var res = req.responseText;
            if(res.trim()=="okok"){ //Controllo se tutto è stato eseguito correttamente
                console.log("ok"); 
              }
            else{
                console.log("error");
              }
        }
        req.open("POST", "../php/add_win.php/Partite",true); //Richiesta POST al server PHP
        req.send(JSONdata);   //invio richiesta con dati in formato JSON 
    }
    else{
        console.log("Si è verificato un errore");
    }
}

const Back = document.getElementById("Back");
Back.addEventListener("click", homePage);
function homePage(){
    window.location.href = "../html/home.html"; //reindirizza alla pagina specificata nell'url
}


  
  