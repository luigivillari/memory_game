const backbutton = document.getElementById('back-button');
backbutton.addEventListener('click', homePage);

const easy=document.getElementById('easy');
easy.addEventListener('click',homePageEasy);

const normal=document.getElementById('normal');
normal.addEventListener('click',homePageNormal);

const hard=document.getElementById('hard');
hard.addEventListener('click',homePageHard);



function homePage(){
    window.location.href='../html/home.html';
}

function homePageEasy(){
    const easyValue = document.getElementById('easy').innerText;
    window.location.href='../html/home.html?value='+ easyValue;
}

 function homePageNormal(){
    const normalValue = document.getElementById('normal').innerText;
    window.location.href='../html/home.html?value='+ normalValue;
 }

function homePageHard(){
    const hardValue = document.getElementById('hard').innerText;
    window.location.href='../html/home.html?value='+ hardValue;
 }
