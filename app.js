const likePic  = document.querySelector('#like-pic');
const box = document.querySelector('.box');
const likeTxt = document.querySelector('#like-Txt');
const currentLikeSpan = document.querySelector('#like-span');
let score = 1;

const addLike = (e) =>{
    
  let currentScore =  score ++;
    currentLikeSpan.textContent = currentScore;
}

likePic.addEventListener('click',addLike);

