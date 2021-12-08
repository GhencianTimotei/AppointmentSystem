const firebaseConfig = {
apiKey: "AIzaSyBWvo31HWBERxSGuRrH2cliD4KoFI5UFMg",
authDomain: "appointment-systems.firebaseapp.com",
projectId: "appointment-systems",
storageBucket: "appointment-systems.appspot.com",
messagingSenderId: "283649468422",
appId: "1:283649468422:web:7a95f38bb5df8f95733b87"
};

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(function(user) {
});

registerListener = function() {

    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const cpassword = document.getElementById("cpassword");
    const email_text = email.value;
    const password_text = password.value;
    const cpassword_text = cpassword.value;
    var error_field = document.getElementsByClassName("row")[0];
    error_field.innerHTML = "";
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email_text)) {
        error_field.innerHTML += "Please enter a valid email<br>";
    }
    if (password_text.length == 0) {
        error_field.innerHTML += "Please enter a valid password<br>";
    }
    if (cpassword.length == 0 || password_text !== cpassword_text) {
        error_field.innerHTML += "The passwords doesn't match<br>";
    }
    if (error_field.innerHTML.length !== 0) {
        return 0;
    }
    

    firebase.auth().createUserWithEmailAndPassword(email_text, password_text).then( () => {
        var modal = document.getElementById("popup");
        modal.style.display = "block";
        var message_text = document.getElementsByTagName("p")[0];
        message_text.innerHTML = "A confirmation link was sent to your email. Please confirm if before using your account. <a style='background-color: white; border: 2px solid #555555; color: black; padding: 15px 32px; margin-left: 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; cursor: pointer;' id='sendLinkAgain' href='/account/login'>Click here for login</a>";
        firebase.auth().currentUser.sendEmailVerification();

        

    }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message
        var modal = document.getElementById("popup");
        modal.style.display = "block";
        var message_text = document.getElementsByTagName("p")[0];
        message_text.innerHTML = errorMessage;
    });
};

popup = function() {
    var modal = document.getElementById("popup");
    var span = document.getElementsByClassName("close")[0];

    span.onclick = function() {
    modal.style.display = "none";
    }

    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    }
};

window.onload = function() {
    const registerButton = document.getElementById("registerButton");
    registerButton.onclick = registerListener;
    popup();
};

