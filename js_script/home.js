const button = document.getElementById('buttondifficult');
button.addEventListener('click',newPage);

const single = document.getElementById('buttonsingle');
single.addEventListener('click',single_player);

const multi = document.getElementById('buttonmulti');
multi.addEventListener('click',multi_player);

function newPage(){
    window.location.href='../html/difficulty.html';
}

function single_player(){
    const queryString = window.location.search;
    // Crea un oggetto URLSearchParams dalla stringa della query
    const params = new URLSearchParams(queryString);
    // Ottieni il valore associato alla chiave 'value'
    const value = params.get('value');
    if(value != null){
    window.location.href='../html/memory_game_single.html?value=' + value;
    }
    else{
        window.location.href = '../html/memory_game_single.html?value=normal';
    }

}

function multi_player(){
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const value = params.get('value');
    if(value != null){
    window.location.href='../html/select_user.html?value=' + value;
    }
    else{
        window.location.href='../html/select_user.html?value=normal';
    }
}

function toggleDropdown() {
    var dropdown = document.getElementById("userDropdown");
    dropdown.classList.toggle("show");
}

// Chiudi il menu a tendina se si clicca fuori da esso
window.onclick = function (event) {
    if (!event.target.closest('.buttonuser')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
};




