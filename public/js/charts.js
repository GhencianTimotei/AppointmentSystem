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
var uid = '';

firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        uid = firebaseUser.uid;
        importChars();
    } else {
        window.location.href = "account/login";
    }
});

importChars = function () {
    var ownedCharts = firebase.database().ref('/users/' + uid + '/ownedCharts/');
    var charts = firebase.database().ref('/charts/');
    ownedCharts.on('value', (snapshot) => {
        if (snapshot.exists()) {
            var table = document.getElementsByClassName('charts_list')[0];
            table.innerHTML = '';
            for (var key in snapshot.val()) {
                addNewChartToTable(snapshot.val()[key]);
            }
        }
    });
};

addNewChartToTable = function (key) {
    var table = document.getElementsByClassName('charts_list')[0];
    var chart = firebase.database().ref('/charts/' + key);
    chart.on('value', (snapshot) => {
        console.log(snapshot.val()['title']);
        var button = document.createElement('button');
        const attribute = "location.href='/chart/" + key + "'";
        button.setAttribute('onclick', attribute);
        button.setAttribute('id', key);
        button.innerText = snapshot.val()['title'];
        table.appendChild(button);
    });
}

createNewChart = function () {
    var modal = document.getElementById("popup");
    var modal_content = document.getElementsByClassName("modal-content")[0];
    var errorBox = document.createElement('div'); errorBox.setAttribute('class', 'error errorPopup');

    var titleDiv = document.createElement('div'); titleDiv.setAttribute('class', 'row');
    var loggedin_withConfirmation_div = document.createElement('div'); loggedin_withConfirmation_div.setAttribute('class', 'row');
    var loggedinDiv = document.createElement('div'); loggedinDiv.setAttribute('class', 'sameRow');
    var withConfirmationDiv = document.createElement('div'); withConfirmationDiv.setAttribute('class', 'sameRow');
    var intervalDiv = document.createElement('div'); intervalDiv.setAttribute('class', 'row');
    var fieldsDiv = document.createElement('div'); fieldsDiv.setAttribute('class', 'row autocomplete');
    var buttonDiv = document.createElement('div'); buttonDiv.setAttribute('class', 'row');

    var titleInput = document.createElement('input'); titleInput.style.marginLeft = '20px';
    var loggedinInput = document.createElement('input');
    var withConfirmationInput = document.createElement('input');
    var loggedinLabel = document.createElement('label');
    var withConfirmationLabel = document.createElement('label');
    var intervalMinInput = document.createElement('input');
    var intervalMaxInput = document.createElement('input');
    var fieldsInput = document.createElement('input');

    var submit = document.createElement('button');


    titleInput.setAttribute('id', 'title');
    loggedinInput.setAttribute('id', 'bLoggedin');
    withConfirmationInput.setAttribute('id', 'bWithConfirmation');
    loggedinLabel.setAttribute('for', 'bLoggedin');
    withConfirmationLabel.setAttribute('for', 'bWithConfirmation');
    intervalMinInput.setAttribute('id', 'intervalMin');
    intervalMaxInput.setAttribute('id', 'intervalMax');
    fieldsInput.setAttribute('id', 'fields');
    submit.setAttribute('id', 'submitButton');

    titleInput.setAttribute('type', 'text');
    loggedinInput.setAttribute('type', 'checkbox');
    withConfirmationInput.setAttribute('type', 'checkbox');
    intervalMinInput.setAttribute('type', 'number');
    intervalMaxInput.setAttribute('type', 'number');
    fieldsInput.setAttribute('type', 'text');

    titleInput.setAttribute('placeholder', 'Give a title');
    intervalMinInput.setAttribute('placeholder', 'From what hour');
    intervalMaxInput.setAttribute('placeholder', 'To what hour');
    fieldsInput.setAttribute('placeholder', 'Fields you need: Years,Weight(kg)');

    loggedinLabel.innerHTML = "The user must be loggedin";
    withConfirmationLabel.innerHTML = "The appointment must be confirmed"
    submit.innerHTML = "SUBMIT";


    submit.onclick = addNewChart;

    titleDiv.append(titleInput);
    loggedinDiv.append(loggedinLabel); loggedinDiv.append(loggedinInput);
    withConfirmationDiv.append(withConfirmationLabel); withConfirmationDiv.append(withConfirmationInput);
    loggedin_withConfirmation_div.append(loggedinDiv);
    loggedin_withConfirmation_div.append(withConfirmationDiv);
    intervalDiv.append(intervalMinInput);
    intervalDiv.append(intervalMaxInput);
    fieldsDiv.append(fieldsInput);
    buttonDiv.append(submit);


    modal_content.append(titleDiv);
    modal_content.append(loggedin_withConfirmation_div);
    modal_content.append(intervalDiv);
    modal_content.append(fieldsDiv);
    modal_content.append(buttonDiv);

    modal.style.display = "block";

};

addNewChart = function () {
    const titleInput = document.getElementById('title');
    const loggedinInput = document.getElementById('bLoggedin');
    const withConfirmationInput = document.getElementById('bWithConfirmation');
    const intervalMinInput = document.getElementById('intervalMin');
    const intervalMaxInput = document.getElementById('intervalMax');
    const fieldsInput = document.getElementById('fields');

    /* TODO: check for correctness */

    if (titleInput.value == "") {
        errorBox.innerHTML += "Please enter a valid title<br>";
    }
    if (intervalMinInput.value == "") {
        errorBox.innerHTML += "Please enter a valid hour<br>";
    }
    if (intervalMaxInput.value == "") {
        errorBox.innerHTML += "Please enter a valid hour<br>";
    }
    if (fieldsInput.value == "") {
        errorBox.innerHTML += "Please enter some valid fields<br>";
    } else {
        var fields = fieldsInput.value.split(',', -2);
    }


    const data = { 'title': titleInput.value, 'schedule': [intervalMinInput.value, intervalMaxInput.value], 'bLoggedin': loggedinInput.checked, 'bConfirmation': withConfirmationInput.checked, 'fields': fields , 'creator': uid};
    console.log(data);

    key = firebase.database().ref('/charts/').push().key;
    firebase.database().ref('/charts/' + key).set(data);
    firebase.database().ref('/users/' + uid + '/ownedCharts/').push(key);


};


popup = function () {
    var modal = document.getElementById("popup");
    var span = document.getElementsByClassName("close")[0];

    span.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.getElementsByClassName('modal-content')[0].innerHTML = "";

        }
    }
};

window.onload = function () {
    const newChart = document.getElementById("newChart");

    newChart.onclick = createNewChart;
    popup();
};

