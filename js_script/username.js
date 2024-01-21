
const backbutton = document.getElementById('back-button'); //ottengo riferimento all'elemento back-button tramite ID
backbutton.addEventListener('click',backPage);//onclick chiamo la funzione homePage

function backPage() {
window.location.href= "../html/home.html";//reindirizza la finestra corrente in quella specificata nell'url
}

const InputUsername = document.getElementById('username');//ottengo il riferimento all' element identificato dall'id
const save = document.getElementById('save');//ottengo il riferimento all' element identificato dall'id
save.addEventListener('click',recupero_dati_form);//onclick chiamo la funzione recupero_dati_form

function recupero_dati_form(){
      //creazione dell'oggetto con i valori dei campi del form
    var data={};
    data.username = InputUsername.value; //salva nell'array data il valore di Username
    var JSONdata = JSON.stringify(data);//converte data in una stringa JSON
    var req = new XMLHttpRequest();// Crea un oggetto XMLHttpRequest
    if(data.username!="" && data.username!=null){//verifico che data non sia null
      req.onload = function(){  //definisce l'azione da eseguire una volta completata la richiesta
      console.log(req.responseText);
      var res = req.responseText; //metto all'interno della variabile res la responseText
      if(res.trim()=="ok"){//verifica che tutto sia andato correttamente
          alert("Utente inserito correttamente");
          window.location.href="../html/home.html"; //reindirizzamento alla pagina specificata
        }
      else{
          alert("Username non valido o già esistente");
        }
      }
      req.open("POST", "../php/add_user.php/Username",true); //richiesta POST al server php
      req.send(JSONdata); //invio richiesta con dati in formato JSON
    }
    else{
      const messageError = document.getElementById("alert"); // Gestisco il possibile caso in cui data  sia null
      messageError.style.display = "block";
    }
  }
    

