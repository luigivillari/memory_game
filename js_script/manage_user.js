window.onload = function() {
    selected_user();

}

function selected_user(){
    var req = new XMLHttpRequest();
    req.onload = function() {
        if(req.status == 200){
            var data = JSON.parse(this.responseText);
            visual(data);
        }
        
        
    }
    req.open('GET',"../php/manage_user.php/Username",true);
    req.send();

}


function visual(parametro){
    var tagSelect=document.getElementsByTagName("select");
        for(var i=0;i<tagSelect.length;i++){
        parametro.forEach(element => { 
            var option = document.createElement("option");
            option.innerHTML = element.user;
            option.setAttribute("value", element.user);
            tagSelect[i].appendChild(option);
            
        });
    }

}

const userList = document.getElementById("userList");
const del = document.getElementById("del");
del.addEventListener("click",delete_user);

function delete_user(){
    var data={};
    data.username = userList.value;
    var JSONdata = JSON.stringify(data);
    var req = new XMLHttpRequest();
    if(data.username!="" && data.username!=null){
    req.onload = function(){
        if (req.status == 200){
            console.log(req.responseText);
            var res = req.responseText;
        }
        if(res.trim()=="ok"){
            alert("Utente rimosso con successo");
            window.location.href="../html/home.html";
                  }
        else{
            alert("error");
          }
    }
    req.open("DELETE","../php/manage_user.php/Username",true);
    req.send(JSONdata);
}
}


const backbutton = document.getElementById('back-button');
backbutton.addEventListener('click', homePage);


function homePage(){
    window.location.href='../html/home.html';
}

const modify = document.getElementById('modify');
modify.addEventListener('click',modifyPage);

function modifyPage(){
    window.location.href='../html/modify_user.html?value='+userList.value;
}