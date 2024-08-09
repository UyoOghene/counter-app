
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase, ref, onValue, push, remove, update,get,set } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

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
const database = getDatabase(app);
const auth = getAuth(app);
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();

const loginContainer = document.querySelector('.login-container');
const loginRequirements = document.querySelector('#login-password-requirements');

const container = document.querySelector('.container');
const dropdown = document.querySelector('.dropdown');
const dropbtn = document.querySelector('.dropbtn');
const dropDownContent = document.querySelector('.dropdown-content');
const inputField = document.querySelector('#input-field');
const inputForm = document.querySelector('#add-btn-field');
const shoppingItemList = document.querySelector('#shopping-item-list');
const namebox = document.querySelector('#name-box');
const imgbox = document.querySelector('#img-box');
const picturebox = document.querySelector('#picturebox');
const logoutBtn = document.querySelector('#logout-btn');
const signupBtn = document.querySelector('#signup-btn');
const titleh2 = document.querySelector('#titleh2');
const signUpform = document.querySelector('#signUp');
const firstname = document.querySelector('#firstname');
const email = document.querySelector('#email');
const form = document.querySelector('#form');
const signUpSubmit = document.querySelector('#signUpSubmit');
const confirmpassword = document.querySelector('#confirmpassword');
const signUpassword = document.querySelector('#signUpassword');
const loginpassword = document.querySelector('#password');
const notificationIcon = document.querySelector('.notification');
const messageIcon = document.querySelector('.messages');
const help = document.querySelector('#Help');
const profile = document.querySelector('#display');
const themeIcon = document.querySelector('.insights');
const card = document.querySelector('.card');
const mainContainer = document.querySelector('.main-container');


const likePic  = document.querySelector('#like-pic');
const box = document.querySelector('.box');
const likeTxt = document.querySelector('#like-Txt');
const currentLikeSpan = document.querySelector('#like-span');

let score = 0;

const addLike = (e) => {
    const user = auth.currentUser;
    if (user) {
        const userId = user.uid;
        const userLikesRef = ref(database, `likes/${userId}`);

        get(userLikesRef).then((snapshot) => {
            if (snapshot.exists()) {
                score = snapshot.val().count + 1;
            } else {
                score = 1;
            }
            currentLikeSpan.textContent = score;

            set(userLikesRef, { count: score });

            if (score !== 1) {
                likeTxt.innerHTML = `<span id="like-span">${score}</span> likes`;
            } else {
                likeTxt.innerHTML = `<span id="like-span">${score}</span> like`;
            }
        }).catch((error) => {
            console.error("Error getting user likes:", error);
        });
    } else {
        alert("Please log in to like.");
    }
};

likePic.addEventListener('click', addLike);

signupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    form.style.display = 'none';
    signUpform.style.display = 'flex';
    titleh2.textContent = 'Sign UP';
});

signUpSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    if (email.value === '' || firstname.value === '' || signUpassword.value === '' || confirmpassword.value === '') {
        alert('Please fill up all the fields');
    } else if (signUpassword.value !== confirmpassword.value) {
        alert('Passwords do not match');
        confirmpassword.value = '';
        signUpassword.value = '';
    } else {
        createUserWithEmailAndPassword(auth, email.value, signUpassword.value)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('User signed up:', user);
                form.style.display = 'flex';
                signUpform.style.display = 'none';
                titleh2.textContent = 'Log In';
            })
            .catch((error) => {
                console.error('Sign up error', error.code, error.message);
            });
    }
});


const onGoogleLogin = () => {
    const user = auth.currentUser;

    if (user) {
        const userId = user.uid;
        const userLikesRef = ref(database, `likes/${userId}`);
        imgbox.innerHTML = user.displayName;

        get(userLikesRef).then((snapshot) => {
            if (snapshot.exists()) {
                score = snapshot.val().count + 1;
            } else {
                score = 1;
            }
            currentLikeSpan.textContent = score;
    

            set(userLikesRef, { count: score });

            if (score !== 1) {
                likeTxt.innerHTML = `<span id="like-span">${score}</span> likes`;
            } else {
                likeTxt.innerHTML = `<span id="like-span">${score}</span> like`;
            }
        })
        .catch((error) => {
            console.error("Error getting user likes:", error);
        });
    } else {
        alert("Please log in to like.");
    }

};


googleBtn.addEventListener('click', () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log(user);
            localStorage.setItem('email', user.email);
            localStorage.setItem('userStore', JSON.stringify(user));
            localStorage.setItem('pic', user.photoURL);
            loginContainer.style.display = 'none';
            container.style.display = 'flex';
            onGoogleLogin();
        })
        .catch((error) => {
            console.error(error.code, error.message);
        });
});



document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('signUpassword');
    
    const passwordRequirements = document.getElementById('password-requirements');

    passwordInput.addEventListener('focus', () => {
        passwordRequirements.style.display = 'block';
    });

    passwordInput.addEventListener('blur', () => {
        passwordRequirements.style.display = 'none';
    });

    passwordInput.addEventListener('input', () => {
        const value = passwordInput.value;
        const requirements = [
            value.length >= 8,
            /[A-Z]/.test(value),
            /[a-z]/.test(value),
            /[0-9]/.test(value),
            /[^A-Za-z0-9]/.test(value)
        ];
        
        const listItems = passwordRequirements.querySelectorAll('li');
        listItems.forEach((item, index) => {
            item.style.color = requirements[index] ? 'green' : 'red';
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    loginpassword.addEventListener('focus', () => {
        loginRequirements.style.display = 'block';
    });

    loginpassword.addEventListener('blur', () => {
        loginRequirements.style.display = 'none';
    });

    loginpassword.addEventListener('input', () => {
        const value = loginpassword.value;
        const requirements = [
            value.length >= 8,
            /[A-Z]/.test(value),
            /[a-z]/.test(value),
            /[0-9]/.test(value),
            /[^A-Za-z0-9]/.test(value)
        ];
        
        const listItems2 = loginRequirements.querySelectorAll('li');
        listItems2.forEach((item2, index) => {
            item2.style.color = requirements[index] ? 'green' : 'red';
        });
    });
})



document.querySelector('#login').addEventListener('click', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;


    signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userId = user.uid;
            const userLikesRef = ref(database, `likes/${userId}`);
        
            console.log('User signed in:', user);
            loginContainer.style.display = 'none';
            container.style.display = 'flex';
            namebox.textContent = user.email;
            namebox.style.display = 'flex';
            imgbox.style.display = 'none';
            get(userLikesRef).then((snapshot) => {
                if (snapshot.exists()) {
                    score = snapshot.val().count + 1;
                } else {
                    score = 1;
                }
                currentLikeSpan.textContent = score;
        
    
                set(userLikesRef, { count: score });
    
                if (score !== 1) {
                    likeTxt.innerHTML = `<span id="like-span">${score}</span> likes`;
                } else {
                    likeTxt.innerHTML = `<span id="like-span">${score}</span> like`;
                }
            })
            .catch((error) => {
                console.error("Error getting user likes:", error);
            });
            
        })
        .catch((error) => {
            console.error('Sign in error', error.code, error.message);
        });
});

logoutBtn.addEventListener('click', () => {
    signOut(auth).then(() => {
        localStorage.removeItem('email');
        localStorage.removeItem('username');
        localStorage.removeItem('userStore');
        window.location.href = './index.html';
    }).catch((error) => {
        console.error('Sign out error', error);
    });
});
