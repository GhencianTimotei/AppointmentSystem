var month_abr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
var days_names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

var date = new Date();
var current_date = new Date();



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
var user = {};
var minHour = 0;
var maxHour = 0;
var clickedTime = 0;

firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        user = firebaseUser;
        console.log(firebaseUser);
        setName(firebaseUser.displayName);
    } else {
        window.location.href = "account/login";
    }
});

setName = function (name) {
    var nameLabel = document.getElementById('avatarName');
    nameLabel.innerText = name;
};



getChartTitle = function () {
    firebase.database().ref('/charts/' + chartUid).get().then((snapshot) => {
        if (snapshot.exists()) {
            document.getElementById('menu_title').innerHTML = snapshot.val()['title'];
            minHour = parseInt(snapshot.val()['schedule'][0]);
            maxHour = parseInt(snapshot.val()['schedule'][1]);
            displayDate();
        }
    });
};

Date.prototype.getWeek = function () {
    return [new Date(this.setDate(this.getDate() - this.getDay()))]
        .concat(
            String(Array(6)).split(',')
                .map(function () {
                    return new Date(this.setDate(this.getDate() + 1));
                }, this)
        );
}

function setDayToCurrent(i) {
    var div_vontainer = document.getElementsByClassName("calendar_days")[i];
    var date_field = document.getElementsByClassName("week_day_date")[i];
    var day_name = document.getElementsByClassName("week_day_name")[i];
    div_vontainer.setAttribute("style", "background-color:#eae2b7");
    date_field.setAttribute("style", "color:#2A9D8F");
    day_name.setAttribute("style", "color:#2A9D8F");
}
function setDayToOrdinarry(i) {
    var div_vontainer = document.getElementsByClassName("calendar_days")[i];
    var date_field = document.getElementsByClassName("week_day_date")[i];
    var day_name = document.getElementsByClassName("week_day_name")[i];
    div_vontainer.removeAttribute("style");
    day_name.removeAttribute("style");
    date_field.removeAttribute("style");
}


previewsWeek = function () {
    date.setDate(date.getDate() - parseInt(7));
    displayDate();

};

nextWeek = function () {
    date.setDate(date.getDate() + parseInt(7));
    displayDate();
};

function displayDate() {
    for (var i = 0; i < 7; i++) {
        var span = document.getElementsByClassName("week_day_date")[i];
        var day = date.getWeek()[i];
        day.setDate(day.getDate() + 1);
        span.innerHTML = (day.getDate()).toString() + " " + month_abr[day.getMonth()];
        if (day.getDate() === current_date.getDate() && day.getMonth() === current_date.getMonth() && day.getFullYear() === current_date.getFullYear()) {
            setDayToCurrent(i);
        } else {
            setDayToOrdinarry(i);
        }
        displayDayHours(day);
    }
}



function displayDayHours(day) {
    var auxDate = day;
    auxDate.setMinutes(0); auxDate.setSeconds(0); auxDate.setHours(0);
    for (var i = 0; i < 24; i++) {
        var hour = document.createElement("P");
        var hour_text = document.createTextNode((i < 10 ? "0" + (i).toString() : (i).toString()) + ":00");
        var container = document.createElement("DIV");
        // hour.appendChild(hour_text);
        auxDate.setHours(i);
        container.setAttribute("class", "calendar_hours");
        container.setAttribute('id', Math.floor(auxDate.getTime()/1000));
        container.appendChild(hour_text);
        if (day.getDate() === current_date.getDate() && day.getMonth() === current_date.getMonth() && day.getFullYear() === current_date.getFullYear() && i === current_date.getHours()) {
            container.classList.add("calendar_hours_current");
        }
        if (i < minHour || i > maxHour) {
            container.classList.add("calendar_hours_offline");
        } else {
            container.classList.remove("calendar_hours_ordinarry");
        }
        if (i > 0) {
            if (day.getDay() == 0) {
                document.getElementsByClassName("calendar_hours_days")[6].appendChild(container);
            } else {
                document.getElementsByClassName("calendar_hours_days")[day.getDay() - 1].appendChild(container);
            }
        } else {
            if (day.getDay() == 0) {
                document.getElementsByClassName("calendar_hours_days")[6].innerText = "";
                document.getElementsByClassName("calendar_hours_days")[6].appendChild(container);
            } else {
                document.getElementsByClassName("calendar_hours_days")[day.getDay() - 1].innerText = "";
                document.getElementsByClassName("calendar_hours_days")[day.getDay() - 1].appendChild(container);
            }
        }
    }

}


dropDown = function () {
    var dropDownMenu = document.getElementById("dropdownUser1");
    dropDownMenu.addEventListener('click', ev => {
        document.getElementById("dropdown-menu").classList.toggle("dropdown-menu_show");
    });
};

const onClick = (event) => {
    if (event.target.nodeName === 'DIV' && event.target.classList[0] == 'calendar_hours' && event.target.classList.length == 1) {

        /* TODO:
            fields check,
            loggedin check
            */
        console.log(event.target.classList);
        var modal = document.getElementById("popup");
        var modal_content = document.getElementsByClassName("modal-content")[0];
        var errorBox = document.createElement('div'); errorBox.setAttribute('class', 'error errorPopup');

        var titleDiv = document.createElement('div'); titleDiv.setAttribute('class', 'row');
        var nameDiv = document.createElement('div'); nameDiv.setAttribute('class', 'row');
        var emailDiv = document.createElement('div'); emailDiv.setAttribute('class', 'row');
        var fieldsDiv = document.createElement('div'); fieldsDiv.setAttribute('class', 'row');
        var confirmationHourDiv = document.createElement('div'); confirmationHourDiv.setAttribute('class', 'row');
        var buttonDiv = document.createElement('div'); buttonDiv.setAttribute('class', 'row');

        var titleLabel = document.createElement('p'); titleLabel.style.marginLeft = '20px';
        var nameLabel = document.createElement('p');
        var emailLabel = document.createElement('p');
        var confirmationHourLabel = document.createElement('p');

        firebase.database().ref('/charts/' + chartUid).get().then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                for (var key in snapshot.val()['fields']) {
                    var div = document.createElement('div');
                    div.setAttribute('class', 'row');
                    var input = document.createElement('input');
                    input.setAttribute('type', 'text');
                    input.setAttribute('id', snapshot.val()['fields'][key]);
                    input.placeholder = snapshot.val()['fields'][key];
                    div.append(input);
                    fieldsDiv.append(div);
                }
                titleLabel.innerHTML = snapshot.val()['title'];
                confirmationHourLabel.innerHTML = "Your appointment is set from " + snapshot.val()['schedule'][0] + " to " + snapshot.val()['schedule'][1];
            }
        });

        nameLabel.innerHTML = user['displayName'];
        emailLabel.innerHTML = user['email'];

        var submit = document.createElement('button');

        submit.setAttribute('id', 'submitButton');
        submit.innerHTML = "SUBMIT";

        clickedTime = event.target.id;

        submit.onclick = addNewAppointment;

        titleDiv.append(titleLabel);
        nameDiv.append(nameLabel);
        emailDiv.append(emailLabel);
        confirmationHourDiv.append(confirmationHourLabel);
        buttonDiv.append(submit);


        modal_content.append(titleDiv);
        modal_content.append(nameDiv);
        modal_content.append(emailDiv);
        modal_content.append(fieldsDiv);
        modal_content.append(confirmationHourDiv);
        modal_content.append(buttonDiv);

        modal.style.display = "block";

    }
}

addNewAppointment = function() {
    const name = user['displayName'];
    const email = user['email'];

    var fields = [];

    firebase.database().ref('/charts/' + chartUid + '/fields').get().then((snapshot) => {
        if(snapshot.exists()) {
            for (var key in snapshot.val()) {
                const field = document.getElementById(snapshot.val()[key]);
                fields.push(field.value);
            }
            const response = {'name': name, 'email': email, 'fields': fields, 'time': clickedTime, 'confirmed': true};
            console.log(response);

            var appointmentKey = firebase.database().ref('/charts/' + chartUid + '/appointments/').push(response).key;
            firebase.database().ref('/users/' + user['uid'] + '/appointments/').push(appointmentKey);




        }
    });

}

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
    var left_button = document.getElementById("left_button");
    var right_button = document.getElementById("right_button");
    left_button.onclick = previewsWeek;
    right_button.onclick = nextWeek;

    popup();
    dropDown();
    var path = window.location.pathname;
    path = path.split('/', 3);
    chartUid = path[path.length - 1];
    getChartTitle();

    window.addEventListener('click', onClick);

};

