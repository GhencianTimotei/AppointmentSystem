const firebaseConfig = {
apiKey: "AIzaSyBWvo31HWBERxSGuRrH2cliD4KoFI5UFMg",
authDomain: "appointment-systems.firebaseapp.com",
databaseURL: "https://appointment-systems-default-rtdb.europe-west1.firebasedatabase.app",
projectId: "appointment-systems",
storageBucket: "appointment-systems.appspot.com",
messagingSenderId: "283649468422",
appId: "1:283649468422:web:7a95f38bb5df8f95733b87"
};

firebase.initializeApp(firebaseConfig);
firebase.database();	

firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
        if (!firebaseUser.emailVerified) {
            var modal = document.getElementById("popup");
            modal.style.display = "block";
            var message_text = document.getElementsByTagName("p")[0];
            message_text.innerHTML = "A confirmation link was sent to your email. Please confirm if before using your account. <button style='background-color: white; border: 2px solid #555555; color: black; padding: 15px 32px; margin-left: 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; cursor: pointer;' id='sendLinkAgain'>Send it again</button>";
            sendEmailVerification();
        } else {
            if (!firebaseUser.displayName) {
                getMoreInfo();
            } else {
                window.location.href="charts";
            }
        }
        console.log(firebaseUser);
        // window.location.href = "home_user.html";
    } else {
        console.log("not logged in");
    }
});

registerListener = function() {

    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const email_text = email.value;
    const password_text = password.value;
    var error_field = document.getElementsByClassName("row")[0];
    error_field.innerHTML = "";

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email_text)) {
        error_field.innerHTML += "Please enter a valid email<br>";
    }
    if (password_text.length == 0) {
        error_field.innerHTML += "Please enter a valid password<br>";
    }
    if (error_field.innerHTML.length !== 0) {
        return 0;
    }
    
    var email_field = document.getElementById("email").value;
    var password_field = document.getElementById("password").value;
    firebase.auth().signInWithEmailAndPassword(email_text, password_text).catch((error) => {
        console.log(error);
        var errorCode = error.code;
        
        var modal = document.getElementById("popup");
        modal.style.display = "block";
        var message_text = document.getElementsByTagName("p")[0];
        if (errorCode === 'auth/wrong-password') {
            message_text.innerHTML = "The password is incorrect!";
        } else if (errorCode === 'auth/user-not-found') {
            message_text.innerHTML = "The email is incorrect!";
        } else {
            message_text.innerHTML = errorCode;
        }
    });
    

    // firebase.auth().createUserWithEmailAndPassword(email_text, password_text).then( () => {
    //     var modal = document.getElementById("popup");
    //     modal.style.display = "block";
    //     var message_text = document.getElementsByTagName("p")[0];
    //     message_text.innerHTML = "A confirmation link was sent to your email. Please confirm if before using your account.";
        

    // }).catch((error) => {
    //     var errorCode = error.code;
    //     var errorMessage = error.message
    //     var modal = document.getElementById("popup");
    //     modal.style.display = "block";
    //     var message_text = document.getElementsByTagName("p")[0];
    //     message_text.innerHTML = errorMessage;
    //     // ..
    // });
};

getMoreInfo = function() {
    /* Full name, birthday, gender */

    var modal = document.getElementById("popup");
    var modal_content = document.getElementsByClassName("modal-content")[0];

    var errorBox  = document.createElement('div');errorBox.setAttribute('class', 'error errorPopup');
    var fullnameDiv = document.createElement('div');fullnameDiv.setAttribute('class', 'row');
    var birthdayDiv = document.createElement('div');birthdayDiv.setAttribute('class', 'row');
    var genderDiv = document.createElement('div');genderDiv.setAttribute('class', 'row');
    var buttonDiv = document.createElement('div');buttonDiv.setAttribute('class', 'row');

    var fullnameInput = document.createElement('input');fullnameInput.style.marginLeft = '20px';
    var birthdayInput = document.createElement('input');
    var genderInput = document.createElement('input');
    var dl = document.createElement('datalist');
    var submit = document.createElement('button');
    var optionList = ["Male", "Female"];

    fullnameInput.setAttribute('id', 'fullname');
    birthdayInput.setAttribute('id', 'birthday');
    genderInput.setAttribute('id', 'gender');
    dl.setAttribute('id', 'dlGenders');
    submit.setAttribute('id', 'submitDelails');

    for(var i = 0; i < optionList.length; i++) {
        var option = document.createElement('option');
        option.value = optionList[i];
        dl.appendChild(option);
    }

    fullnameInput.setAttribute('type', 'text');
    birthdayInput.setAttribute('type', 'text');
    genderInput.setAttribute('list', 'dlGenders');

    fullnameInput.setAttribute('placeholder', 'Full Name');
    birthdayInput.setAttribute('placeholder', 'Birthday (DD/MM/YYYY)');
    genderInput.setAttribute('placeholder', 'Gender');
    submit.innerHTML = "SUBMIT";
    
    submit.onclick = processUserDetails;

    fullnameDiv.append(fullnameInput);
    birthdayDiv.append(birthdayInput);
    genderDiv.append(genderInput);
    genderDiv.append(dl);
    buttonDiv.append(submit);

    modal_content.append(errorBox);
    modal_content.append(fullnameDiv);
    modal_content.append(birthdayDiv);
    modal_content.append(genderDiv);
    modal_content.append(buttonDiv);

    modal.style.display = "block";

};

processUserDetails = function () {
    var errorBox = document.getElementsByClassName('errorPopup')[0];
    const fullnameInput = document.getElementById('fullname');
    const birthdayInput = document.getElementById('birthday');
    const genderInput = document.getElementById('gender');

    errorBox.innerHTML = '';

    if (fullnameInput.value == "") {
        errorBox.innerHTML += "Please enter a valid name<br>";
    }
    if (birthdayInput.value == "") {
        errorBox.innerHTML += "Please enter a valid birthday<br>";
    } else {
        var birthday = birthdayInput.value;
        birthday = birthday.split("/", -2);
        if (birthday.length !== 3) {
            errorBox.innerHTML += "Please enter a valid birthday<br>";
        } else {
            for (var i = 0; i < 3; i++) {
                birthday[i] = parseInt(birthday[i]);
                if (isNaN(birthday[i])) {
                    errorBox.innerHTML += "Please enter a valid birthday<br>";
                }
            }
            if (birthday[0] > 31) {
                errorBox.innerHTML += "The inserted day is not valid<br>";
            }
            if (birthday[1] > 12) {
                errorBox.innerHTML += "The inserted month is not valid<br>";
            }
            if (birthday[2] < 1900) {
                errorBox.innerHTML += "The inserted year is not valid<br>";
            }
        }
    }
    if (genderInput.value == "") {
        errorBox.innerHTML += "Please enter a valid gender<br>";
    }

    if (errorBox.innerHTML.length !== 0) {
        fullnameInput.style.marginLeft = '0px';
        return 0;
    }

    const detailsToUpload = {'name': fullnameInput.value, 'birthday': {'day': birthday[0], 'month': birthday[1], 'year': birthday[2]}, 'gender': genderInput.value};
    console.log(detailsToUpload);
    const userHandler = firebase.auth().currentUser;
    userHandler.updateProfile({displayName: fullnameInput.value});

    firebase.database().ref('/users/' + userHandler.uid).set(detailsToUpload);
};

sendEmailVerification = function() {
    var sendVerification = document.getElementById("sendLinkAgain");

    sendVerification.onclick = function() {
        firebase.auth().currentUser.sendEmailVerification();
    };


    // firebase.auth().currentUser.sendEmailVerification();
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
    const registerButton = document.getElementById("loginButton");
    registerButton.onclick = registerListener;
    popup();
};

