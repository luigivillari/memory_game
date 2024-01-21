window.onload = function() {    //richiama la funzione al caricamento della pagina
    selected_user();

}

function selected_user(){
    var req = new XMLHttpRequest(); // Crea un oggetto XMLHttpRequest 
    req.onload = function() {   //azione da effettuare una volta completata la richiesta
        if(req.status == 200){
            var data = JSON.parse(this.responseText);   //parsing dei dati JSON della risposta
            visual(data);   //richiama la funzione visual 
        }
        
        
    }
    req.open('GET',"../php/manage_user.php/Username",true); //richiesta GET al server PHP
    req.send(); //invia richiesta

}


function visual(parametro){
    var tagSelect=document.getElementsByTagName("select");  //ottengo il riferimento al elemento identificato dal tag select
        for(var i=0;i<tagSelect.length;i++){    //per ogni tagselect
        parametro.forEach(element => {  //per ogni elemento all'interno di parametro
            var option = document.createElement("option");  //creo un elemento option
            option.innerHTML = element.user;    // Imposta il testo dell'opzione con il valore dell'attributo 'user' dell'elemento
            option.setAttribute("value", element.user); // Imposta il valore dell'opzione con il valore dell'attributo 'user' dell'elemento
            tagSelect[i].appendChild(option);   //appende le option nel tag select
            
        });
    }

}

const userList = document.getElementById("userList");   //ottengo il riferimento all' element identificato dall'id
const del = document.getElementById("del"); //ottengo il riferimento all' element identificato dall'id
del.addEventListener("click",delete_user);  //onclick chiamo la funzione delete_user

function delete_user(){
    var data={};   
    data.username = userList.value; //salva nell'array data il valore di userList
    var JSONdata = JSON.stringify(data); //converte data in una stringa JSON
    var req = new XMLHttpRequest(); // Crea un oggetto XMLHttpRequest
    if(data.username!="" && data.username!=null){   //verifico che data non sia null
    req.onload = function(){    //definisce l'azione da eseguire una volta completata la richiesta
        if (req.status == 200){
            console.log(req.responseText);
            var res = req.responseText;
        }
        if(res.trim()=="ok"){   //verifica che tutto sia andato correttamente 
            alert("Utente rimosso con successo");
            window.location.href="../html/home.html"; //reindirizza alla pagina specificata nell'url
                  }
        else{
            alert("error");
          }
    }
    req.open("DELETE","../php/manage_user.php/Username",true);  //richiesta DELETE al server php
    req.send(JSONdata); //invio richiesta con dati in formato JSON 
}
}


const backbutton = document.getElementById('back-button');  //ottenge il riferimento all' element identificato dall'id
backbutton.addEventListener('click', homePage); //onclick chiama la funzione homepage


function homePage(){
    window.location.href='../html/home.html';   //reindirizza alla pagina specificata nell'url
}

const modify = document.getElementById('modify');   //ottenge il riferimento all' element identificato dall'id
modify.addEventListener('click',modifyPage);    //onclick chiama la funzione modifypage

function modifyPage(){
    window.location.href='../html/modify_user.html?value='+userList.value;  //reindirizza alla pagina specificata nell'url
}