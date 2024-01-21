const backbutton = document.getElementById('back-button'); //ottengo riferimento all'elemento back-button tramite ID
backbutton.addEventListener('click', managePage); //onclick chiamo la funzione homePage

function managePage(){
    window.location.href = "../html/manage_user.html"; //reindirizza la finestra corrente in quella specificata nell'url
}
const Input = document.getElementById('username');//ottengo il riferimento all' element identificato dall'id
const queryString = window.location.search;
// Crea un oggetto URLSearchParams dalla stringa della query
const params = new URLSearchParams(queryString);
// Ottieni il valore associato alla chiave 'value'
const user = params.get('value'); // Estrai il valore del parametro 'value' dall'URL
const save = document.getElementById('save');// Ottieni il riferimento all'elemento con ID 'save'
save.addEventListener('click',modifyUser); // Aggiungi un listener per l'evento 'click' sul pulsante save

function modifyUser(){
    //creazione dell'oggetto con i valori dei campi del form
  var data={};
  data.username = user;//salva nell'array data il valore di Username
  data.new = Input.value;//salva nell'array data il valore di value
  var JSONdata = JSON.stringify(data);//converte data in una stringa JSON
  var req = new XMLHttpRequest();// Crea un oggetto XMLHttpRequest
  if(data.username!="" && data.username!=null && data.new!=null && data.new!=""){//Eseguo una serie di controlli su data.username e data.new
    req.onload = function(){ //definisce l'azione da eseguire una volta completata la richiesta
    console.log(req.responseText);
    var res = req.responseText;//metto all'interno della variabile res la responseText
    if(res.trim()=="ok"){//verifica che tutto sia andato correttamente
        alert("Utente modificato correttamente");
        window.location.href="../html/home.html";//reindirizzamento alla pagina specificata
      }
    else{
        alert("Username non valido o già esistente");
      }
    }
    req.open("PUT", "../php/modify_user.php/Username",true);//richiesta POST al server php
    req.send(JSONdata);//invio richiesta con dati in formato JSON
  }
  else{
    const messageError = document.getElementById("alert");// Gestisco il possibile caso in cui data sia null
    messageError.style.display = "block";
  }
}


