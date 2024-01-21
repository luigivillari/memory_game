window.onload = function() { //viene chiamata la funzione al caricamento della pagina 
    create_leaderboard();

}


function create_leaderboard(){
    var req = new XMLHttpRequest(); // Crea un oggetto XMLHttpRequest per effettuare richieste HTTP asincrone
    req.onload = function(){    // Definisce l'azione da eseguire quando la richiesta viene completata con successo
        if(req.status == 200){  // Verifica se lo stato della richiesta è 200 (OK)
            var data = JSON.parse(this.responseText);   // Parsing dei dati JSON ottenuti dalla risposta
            visual(data);   //chiamata a funzione per visualizzare i dati ottenuti
        }
    }
    req.open('GET', "../php/create_leaderboard.php/Partite",true);  //richiesta GET al server PHP
    req.send(); //invia richiesta
}

function visual(parametro) {
    const tagTbody = document.getElementById("tbody");  //prendo l'elemento indentificato dall'ID

    for (var i = 0; i < parametro.length; i++) {    //in base alla lunghezza dei parametri da inserire creo i tag per la tabella
        var tagTr = document.createElement("tr");
        var tagBr = document.createElement("br");

        
        var utenteCell = document.createElement("td");  //creo elemento con tag td
        utenteCell.innerHTML = parametro[i].user;   //inserisco i parametri nei tag corretti
        tagTr.appendChild(utenteCell);  //appendo l'elemento creato all'interno del tag tr

        var vittoriaCell = document.createElement("td");    //creo elemento con tag td
        vittoriaCell.innerHTML = parametro[i].vittoria; //inserisco i parametri nei tag corretti
        tagTr.appendChild(vittoriaCell);    //appendo l'elemento creato all'interno del tag tr

        var sconfittaCell = document.createElement("td");   //creo elemento con tag td
        sconfittaCell.innerHTML = parametro[i].sconfitta;   //inserisco i parametri nei tag corretti
        tagTr.appendChild(sconfittaCell);   //appendo l'elemento creato all'interno del tag tr

       
        tagTbody.appendChild(tagTr);    //appendo gli elementi creati all'interno del tag tbody 
        tagTbody.appendChild(tagBr);
        
    }
}

const backButton = document.getElementById("back-button");  //ottengo il riferimento all'elemento back-button tramite id
backButton.addEventListener("click",homePage);  //onclick chiama la funzione

function homePage(){
    window.location.href = "../html/home.html"; //reindirizza alla pagina specificata nell'url
}
