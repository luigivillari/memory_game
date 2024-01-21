const backbutton = document.getElementById('back-button');
backbutton.addEventListener('click', managePage);

function managePage(){
    window.location.href = "../html/manage_user.html";
}
const Input = document.getElementById('username');
const queryString = window.location.search;
// Crea un oggetto URLSearchParams dalla stringa della query
const params = new URLSearchParams(queryString);
// Ottieni il valore associato alla chiave 'value'
const user = params.get('value');
const save = document.getElementById('save');
save.addEventListener('click',modifyUser);

function modifyUser(){
    //creazione dell'oggetto con i valori dei campi del form
  var data={};
  data.username = user;
  data.new = Input.value;
  var JSONdata = JSON.stringify(data);
  var req = new XMLHttpRequest();
  if(data.username!="" && data.username!=null && data.new!=null && data.new!=""){
    req.onload = function(){
    console.log(req.responseText);
    var res = req.responseText;
    if(res.trim()=="ok"){
        alert("Utente modificato correttamente");
        window.location.href="../html/home.html";
      }
    else{
        alert("Username non valido o già esistente");
      }
    }
    req.open("PUT", "../php/modify_user.php/Username",true);
    req.send(JSONdata);
  }
  else{
    const messageError = document.getElementById("alert");
    messageError.style.display = "block";
  }
}


