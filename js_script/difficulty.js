const backbutton = document.getElementById('back-button'); //ottengo riferimento all'elemento back-button tramite ID
backbutton.addEventListener('click', homePage); //onclick chiamo la funzione homePage

const easy=document.getElementById('easy'); //ottengo riferimento all'elemento easy tramite ID
easy.addEventListener('click',homePageEasy); //onclick chiamo la funzione homePageEasy

const normal=document.getElementById('normal'); //ottengo riferimento all'elemento normal tramite ID
normal.addEventListener('click',homePageNormal); //onclick chiamo la funzione homePageNormal

const hard=document.getElementById('hard'); //ottengo riferimento all'elemento hard tramite ID
hard.addEventListener('click',homePageHard); //onclick chiamo la funzione homePageHard



function homePage(){
    window.location.href='../html/home.html';   //reindirizza la finestra corrente in quella specificata nell'url
}

function homePageEasy(){
    const easyValue = document.getElementById('easy').innerText;
    window.location.href='../html/home.html?value='+ easyValue; //reindirizza la finestra corrente in quella specificata nell'url passando il valore presente nell'innertext
}

 function homePageNormal(){
    const normalValue = document.getElementById('normal').innerText;
    window.location.href='../html/home.html?value='+ normalValue;  //reindirizza la finestra corrente in quella specificata nell'url passando il valore presente nell'innertext
 }

function homePageHard(){
    const hardValue = document.getElementById('hard').innerText;
    window.location.href='../html/home.html?value='+ hardValue;  //reindirizza la finestra corrente in quella specificata nell'url passando il valore presente nell'innertext
 }
