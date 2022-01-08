// document.addEventListener("DOMContentLoaded", function(){

// });
var firebaseConfig = {
    apiKey: "AIzaSyB1gProVLbu5cTJFZgCXz5qX1ckeno-f9s",
    authDomain: "task-dispencer.firebaseapp.com",
    databaseURL: "https://task-dispencer-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "task-dispencer",
    storageBucket: "task-dispencer.appspot.com",
    messagingSenderId: "1021029715894",
    appId: "1:1021029715894:web:af1096f3633ad27d5bbb17",
    measurementId: "G-RLBR93SMMN"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

var login = document.getElementById("login");
var reset_button = document.getElementById("reset_button");

login.addEventListener('click', e => {
    var email_field = document.getElementById("email").value;
    var password_field = document.getElementById("password").value;
    const loginAuth = firebase.auth();
    const results = loginAuth.signInWithEmailAndPassword(email_field, password_field);
    results.catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === 'auth/wrong-password') {
            window.alert("The password is incorrect!")
        } else if (errorCode === 'auth/invalid-email') {
            window.alert("The email is incorrect!")
        } else {
            console.log(errorCode);
        }});
});

reset_button.addEventListener('click', e => {
    var email_field = document.getElementById("reset_email").value;
    const Auth = firebase.auth();
    const results = Auth.sendPasswordResetEmail(email_field);
    results.catch(e => console.log(e.message));
});

firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
        console.log(firebaseUser);
        window.location.href = "home_user.html";
    } else {
        console.log("not logged in");
    }

});

document.getElementById("forgot_password").addEventListener("click", t => {
    console.log("test");
    document.getElementById("login_container").classList.add("animation");
    document.getElementById("login_container").classList.remove("animation_inverse");
    document.getElementById("forgot_password_container").classList.add("animation_inverse");
    document.getElementById("forgot_password_container").classList.remove("animation");
    document.getElementById("forgot_password_container").setAttribute("style", "opacity: 1, z-index : 1");
});

document.getElementById("back_button").addEventListener("click", t => {
    console.log("test");
    document.getElementById("login_container").classList.add("animation_inverse");
    document.getElementById("login_container").classList.remove("animation");
    document.getElementById("login_container").setAttribute("style", "opacity: 1, z-index : 1");
    document.getElementById("forgot_password_container").classList.add("animation");
    document.getElementById("forgot_password_container").classList.remove("animation_inverse");
    document.getElementById("forgot_password_container").setAttribute("style", "opacity: 0, z-index : -1");
});