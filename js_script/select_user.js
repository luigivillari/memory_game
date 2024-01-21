window.onload = function() {    //esegue la funzione al caricamento della pagina
    selected_user();

}

function selected_user(){
    var req = new XMLHttpRequest(); //creo un oggetto XMLHttpRequest
    req.onload = function() {   //definisce l'azione da eseguire una volta completata la richiesta
        if(req.status == 200 ){
            var data = JSON.parse(this.responseText);   //parsing dei dati JSON
            visual(data);   //invocazione funzione visual
        }
        
        
    }
    req.open('GET',"../php/select_user.php/Username",true); //richiesta GET al server PHP
    req.send(); //invia richiesta

}


function visual(parametro){
    var tagSelect=document.getElementsByTagName("select");  //ottengo il riferimento al elemento identificato dal tag select
        for(var i=0;i<tagSelect.length;i++){    //per ogni tagselect
        parametro.forEach(element => {          //per ogni elemento all'interno di parametro
            var option = document.createElement("option");  //creo un elemento option
            option.innerHTML = element.user;    // Imposta il testo dell'opzione con il valore dell'attributo 'user' dell'elemento
            option.setAttribute("value", element.user); // Imposta il valore dell'opzione con il valore dell'attributo 'user' dell'elemento
            tagSelect[i].appendChild(option);   //appende le option nel tag select
            
        });
    }

}

const select = document.getElementById("select"); //ottengo il riferimento all'elemento identificato dall'id
select.addEventListener("click",play);  //onclick chiama la funzione play

function play(){
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);    // Crea un oggetto URLSearchParams dalla stringa della query
    const value = params.get('value');  //ottiene il valore associato alla chiave value
    let player1 = document.getElementById("userList").value;  //ottiene il valore dell'elemento userList
    let player2 = document.getElementById("userList2").value;

    if (player1 !=player2){ //controlla che i player non siano uguali
        window.location.href = "../html/memory_game.html?value="+value+"&user1="+player1+"&user2="+player2;//Reindirizzamento alla pagine specificata nell'url
    }
    else{
        const alert = document.getElementById("alert");//mostra un messaggio di errore
        alert.style.display = "block";
    }
   
}
const backbutton = document.getElementById('back-button'); //ottene il riferimento all'elemento identificato dall'id
backbutton.addEventListener('click', homePage);//onclick chiama la funzione homePage


function homePage(){
    window.location.href='../html/home.html'; //Reindirizzamento alla pagine specificata nell'url
}
