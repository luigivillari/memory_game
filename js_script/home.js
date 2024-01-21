const button = document.getElementById('buttondifficult'); //ottengo riferimento all'elemento buttondifficult tramite ID
button.addEventListener('click',newPage); //onclick chiamo la funzione newPage

const single = document.getElementById('buttonsingle'); //ottengo riferimento all'elemento buttonsigle tramite ID
single.addEventListener('click',single_player); //onclick chiamo la funzione sigle player

const multi = document.getElementById('buttonmulti'); //ottengo riferimento all'elemento buttonmulti tramite ID
multi.addEventListener('click',multi_player); //onclick chiamo la funzione multi_player

function newPage(){
    window.location.href='../html/difficulty.html';  //reindirizza la finestra corrente in quella specificata nell'url 
}

function single_player(){
    const queryString = window.location.search;
    // Crea un oggetto URLSearchParams dalla stringa della query
    const params = new URLSearchParams(queryString);
    // Ottiene il valore associato alla chiave 'value'
    const value = params.get('value');
    if(value != null){ //verifico che il valore non sia null 
    window.location.href='../html/memory_game_single.html?value=' + value; //reindirizza la finestra corrente in quella specificata nell'url con il valore preso precedentemente
    }
    else{
        //reindirizza la finestra corrente in quella specificata nell'url con valore di default
        window.location.href = '../html/memory_game_single.html?value=normal';
    }

}

function multi_player(){
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString); // Crea un oggetto URLSearchParams dalla stringa della query
    const value = params.get('value');  // Ottiene il valore associato alla chiave 'value'
    if(value != null){  //verifico che il valore non sia null
    window.location.href='../html/select_user.html?value=' + value; //reindirizza la finestra corrente in quella specificata nell'url con il valore preso precedentemente
    }
    else{
        //reindirizza la finestra corrente in quella specificata nell'url con valore di default
        window.location.href='../html/select_user.html?value=normal';
    }
}

function toggleDropdown() {
    var dropdown = document.getElementById("userDropdown"); // Ottiene il riferimento all'elemento del menu a tendina dell'utente
    dropdown.classList.toggle("show"); // Alterna la classe "show" per visualizzare o nascondere il menu a tendina
}

// Chiude il menu a tendina se si clicca fuori da esso
window.onclick = function (event) {
    if (!event.target.closest('.buttonuser')) { // Verifica se l'elemento cliccato non è all'interno dell'area del pulsante utente
        var dropdowns = document.getElementsByClassName("dropdown-content"); // Ottieni tutti gli elementi con la classe "dropdown-content"
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            // Rimuovi la classe "show" se il menu a tendina è attualmente visibile
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
};




