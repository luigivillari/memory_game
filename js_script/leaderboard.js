window.onload = function() {
    create_leaderboard();

}


function create_leaderboard(){
    var req = new XMLHttpRequest();
    req.onload = function(){
        if(req.status == 200){
            var data = JSON.parse(this.responseText);
            visual(data);
        }
    }
    req.open('GET', "../php/create_leaderboard.php/Partite",true);
    req.send();
}

function visual(parametro) {
    const tagTbody = document.getElementById("tbody");

    for (var i = 0; i < parametro.length; i++) {
        var tagTr = document.createElement("tr");
        var tagBr = document.createElement("br");

        
        var utenteCell = document.createElement("td");
        utenteCell.innerHTML = parametro[i].user;
        tagTr.appendChild(utenteCell);

        var vittoriaCell = document.createElement("td");
        vittoriaCell.innerHTML = parametro[i].vittoria;
        tagTr.appendChild(vittoriaCell);

        var sconfittaCell = document.createElement("td");
        sconfittaCell.innerHTML = parametro[i].sconfitta;
        tagTr.appendChild(sconfittaCell);

       
        tagTbody.appendChild(tagTr);
        tagTbody.appendChild(tagBr);
        
    }
}

const backButton = document.getElementById("back-button");
backButton.addEventListener("click",homePage);

function homePage(){
    window.location.href = "../html/home.html";
}
