const likePic  = document.querySelector('#like-pic');
const box = document.querySelector('.box');
const likeTxt = document.querySelector('#like-Txt');
const currentLikeSpan = document.querySelector('#like-span');

let score = 0;
const addLike = (e) =>{
    score += 1; 
    currentLikeSpan.textContent = score; 
    if (score !== 1) {
        likeTxt.innerHTML = `<span id="like-span">${score}</span> likes`;
    } else {
        likeTxt.innerHTML = `<span id="like-span">${score}</span> like`;
    }
}    


likePic.addEventListener('click',addLike);

