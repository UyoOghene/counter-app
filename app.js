
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase, ref, onValue, push, remove, update } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

window.env = {
    New_api_key: "AIzaSyBdngvz-LCZpNl2b0FfC_9QBb39yOth-NI"
};

const firebaseConfig = {
    apiKey: window.env.New_api_key,
   authDomain: "like-counter-2f114.firebaseapp.com",
  projectId: "like-counter-2f114",
  storageBucket: "like-counter-2f114.appspot.com",
  messagingSenderId: "1077028122168",
  appId: "1:1077028122168:web:225cd6124057cc8f6300cd",
  databaseURL : "https://like-counter-2f114-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const dataBase = getDatabase(app);


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

