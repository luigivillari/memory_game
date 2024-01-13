const symbols_16 = [
    'apple', 'banana', 'broccoli', 'donut',
    'grape', 'hamburger', 'kebab', 'kiwi',
    'lemon', 'pancakes', 'pineapple', 'pizza',
    'softdrink', 'strawberry', 'sushi', 'watermelon'
];

document.addEventListener('DOMContentLoaded', function () {
    const gridCard = document.getElementById('gridCard');
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
    const player1 = params.get('user1');
    const player2 = params.get('user2');
    console.log(player1);
    console.log(player2);
    
    startgame(modalita);
    
    display_names(player1,player2);
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
    startTimer();
}

    let pairA = 0;
    let pairB = 0;
    let turn = 0;
    let flag = true;

    
function display_names(player1,player2){
    let giocatore1 = document.getElementById('player1');
    giocatore1.innerHTML = player1;
    let giocatore2 = document.getElementById('player2');
    giocatore2.innerHTML = player2;
    
}

function updateScore(){
    let scoreA = document.getElementById('first');
    scoreA.innerHTML = pairA;
    let scoreB = document.getElementById('last');
    scoreB.innerHTML = pairB;
}

function updateTurn(){
    let nTurn2 = document.getElementById('turno2');
    nTurn2.innerHTML = turn;
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

    if ((turn%2 || turn === 0) && flag === true || flag === true) {

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

function updateTime() {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedTime = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;

    document.getElementById('timer').textContent = formattedTime;

    seconds++;
}
const button_home = document.getElementById('home-button');
button_home.addEventListener('click',homePage);
const button_replay = document.getElementById('replay-button');
button_replay.addEventListener('click',reloadPage);

function check_win(pairA,pairB){
    const Player2 = document.getElementById('player2');
    const Player1 = document.getElementById('player1');
    const popup = document.getElementById('play-again');
    
    if(pairA>pairB){
        id_player(Player1,Player2);
        const messageElement = document.createElement('p');
        messageElement.innerHTML = "PLAYER 1 WON the Game";
        popup.appendChild(messageElement);
        popup.style.display = 'block';
        
       
    }
    else if (pairA<pairB){
        id_player(Player2,Player1);
        const messageElement = document.createElement('p');
        messageElement.innerHTML = "PLAYER 1 WON the Game";
        popup.appendChild(messageElement);
        popup.style.display = 'block';
        
        
    }
    else{
        alert ('Game finished in a Draw');
        window.location.href='../html/home.html'
    }
}



function homePage(){
    window.location.href='../html/home.html';
}

function reloadPage(){
    window.location.reload();
}

function id_player(PlayerW,PlayerL){
    var data={};
    data.playerw = PlayerW.innerHTML;
    data.playerl = PlayerL.innerHTML;
    var JSONdata = JSON.stringify(data);
    var req = new XMLHttpRequest();
    if((data.playerw !="" && data.playerw != null) && (data.playerl !="" && data.playerl != null)){
        req.onload = function(){
            console.log(req.responseText);
            var res = req.responseText;
            if(res.trim()=="okok"){
                console.log("ok"); 
              }
            else{
                console.log("error");
              }
        }
        req.open("POST", "../php/add_win.php/Partite",true);
        req.send(JSONdata);
    }
    else{
        console.log("non funziona niente");
    }
}


  
  