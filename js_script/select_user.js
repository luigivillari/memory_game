window.onload = function() {
    selected_user();

}

function selected_user(){
    var req = new XMLHttpRequest();
    req.onload = function() {
        if(req.status == 200 ){
            var data = JSON.parse(this.responseText);
            visual(data);
        }
        
        
    }
    req.open('GET',"../php/select_user.php/Username",true);
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

const select = document.getElementById("select");
select.addEventListener("click",play);

function play(){
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const value = params.get('value');
    let player1 = document.getElementById("userList").value; 
    let player2 = document.getElementById("userList2").value;

    if (player1 !=player2){
        window.location.href = "../html/memory_game.html?value="+value+"&user1="+player1+"&user2="+player2;
    }
    else{
        const alert = document.getElementById("alert");
        alert.style.display = "block";
    }
   
}
const backbutton = document.getElementById('back-button');
backbutton.addEventListener('click', homePage);


function homePage(){
    window.location.href='../html/home.html';
}
