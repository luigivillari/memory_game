
const backbutton = document.getElementById('back-button');
backbutton.addEventListener('click',backPage);

function backPage() {
window.location.href= "../html/home.html";
}

const InputUsername = document.getElementById('username');
const save = document.getElementById('save');
save.addEventListener('click',recupero_dati_form);

function recupero_dati_form(){
      //creazione dell'oggetto con i valori dei campi del form
    var data={};
    data.username = InputUsername.value;
    var JSONdata = JSON.stringify(data);
    var req = new XMLHttpRequest();
    if(data.username!="" && data.username!=null){
      req.onload = function(){
      console.log(req.responseText);
      var res = req.responseText;
      if(res.trim()=="ok"){
          alert("Utente inserito correttamente");
          window.location.href="../html/home.html";
        }
      else{
          alert("Username non valido o già esistente");
        }
      }
      req.open("POST", "../php/add_user.php/Username",true);
      req.send(JSONdata);
    }
    else{
      const messageError = document.getElementById("alert");
      messageError.style.display = "block";
    }
  }
    

