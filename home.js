const button = document.getElementById('buttondifficult');
button.addEventListener('click',newPage);

const single = document.getElementById('buttonsingle');
single.addEventListener('click',single_player);
function newPage(){
    window.location.href='file:///Users/luigivillari/htdocs/memory_game/difficulty.html';
}

function single_player(){
    const queryString = window.location.search;
    // Crea un oggetto URLSearchParams dalla stringa della query
    const params = new URLSearchParams(queryString);
    // Ottieni il valore associato alla chiave 'value'
    const value = params.get('value');
    if(value != null){
    window.location.href='file:///Users/luigivillari/htdocs/memory_game/memory_game_single.html?value=' + value;
    }
    else{
        window.location.href = 'file:///Users/luigivillari/htdocs/memory_game/memory_game_single.html?value=normal';
    }

}


