

var popup = document.getElementById("add_new_task");
var btn = document.getElementById("add_task");
var span = document.getElementsByClassName("close")[0];
var deadline_input = document.getElementById("deadline_input");
var calendar_cont = document.getElementsByClassName("calendar")[0];
var submit_button = document.getElementById("submit_add_task");
var task_title = document.getElementById("task_title");
var task_description = document.getElementById("task_description");
var skills_necessary = document.getElementById("skills_necessary");
var responsible_user = document.getElementById("responsible_user");
var hours_necessary = document.getElementById("hours_necessary");
var task_priority = document.getElementById("browser");
var dropDown = document.getElementById("browser");
var user_uid;
var id;
var listOfSkills = [];
var employees = [];
var employee_name = [];

var deadline_date = {day: 0, month: 0, year: 0};

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

//generate random number
function randomIntFromInterval(max) {
    return Math.floor(Math.random() * max);
}

// return index of element by uid
function getIndexOfElement(users, uid) {
    for (let user in users) {

        if (users[user]["uid"] === uid)
            return user;
    }
    return -1;
}

//get list of skills
firebase.database().ref().child("skill").get().then((snapshot) => {
    if (snapshot.exists()) {
        listOfSkills = snapshot.val();
        autocomplete(document.getElementById("skills_necessary"), listOfSkills);
    } else {
        console.log("No data available");
    }
});
//setUserName, setAvatarImage and get user uid
function setUserName() {
    const authRef = firebase.auth().currentUser;
    user_uid = authRef.uid;
    firebase.storage().ref().child("users_avatar").child(authRef.photoURL).getDownloadURL().then((url) => {
        document.getElementById("avatar_img").src = url;
    });
    document.getElementById("avatar_name").innerText = authRef.displayName;
}

//get list of employee from manager's teams && start autocomplete
function getTeamMembers() {
    var employee_uid = [];
    var ref = firebase.database().ref()
    ref.get().then((snapshot) => {

        if(snapshot.val()["teams"] != null) {
            let teams = snapshot.val()["teams"]
            for( let val in teams){
                if (teams[val]["manager"][0] === user_uid) {
                    teams[val]["team"].forEach(function (user) {
                        employee_uid.push(user);
                        console.log(user)
                    })
                }
            }
        }
        else {
            console.log("No data available");
        }
        if(snapshot.val()["users"] != null) {

            employee_uid.forEach(function (employee_uid) {
                if(snapshot.val()["users"][employee_uid] != null) {
                    let user = snapshot.val()["users"][employee_uid]
                    var user_information = {
                        first_name: user["first_name"],
                        last_name: user["last_name"],
                        skills: user["skills"],
                        uid: employee_uid
                    };
                    employee_name.push(user_information["first_name"] + " " + user_information["last_name"]);
                    employees.push(user_information);
                }
            })
            autocomplete(document.getElementById("responsible_user"), employee_name);
        }
        else {
            console.log("No data available");
        }
    });

}

// var team1 = {name: "Team 2", manager: ["yajBqtvRL0Vba1rWuQjE6qUoiiF3"], team: ["1MEOm9IUkbd9d9xYfRqKPLaYSyz2", "30ARXYU17ASMkG230yvJEtjwV7A3"]};
// var teams = firebase.database().ref().child("teams")
// teams.push().set(team1)

function filterUsers()
{
var options = document.getElementById('skillsusers').selectedOptions;
var values = Array.from(options).map(({ value }) => value);
var usersworklist= document.getElementById("userswork");
var nodes= usersworklist.childNodes;
for (var j=0;j<nodes.length;j++)
{


nodes[j].style.display="none";
}



var value= document.getElementById("userhours").value;
var team= document.getElementById("userteams").value;
if(team!="any")
{

firebase.database().ref("teams").orderByChild("name").equalTo(team).on("child_added", function(snapshot) {

var members=snapshot.val().team;
if(members!=null)
{
for(var j=0;j<members.length;j++)
{
firebase.database().ref("users/"+members[j]).on('value', (snapshot) => { 
var username= snapshot.val().first_name+" "+snapshot.val().last_name;
if (value=="any")
{
var add=1;
if(values.length!=0)
{
var skills=snapshot.val().skills;
for (var j=0;j<values.length;j++)
{
if (!skills.includes(values[j]))
{
add=0;
}
}
}
for(var i=0;i<nodes.length;i++)
{

var split=nodes[i].innerHTML.split("|");
var name=split[0];
var name2=name.substring(0, name.length -1);
if(username==name2)
{

if(add==1)
{

document.getElementById(name2).style.display="block";
}

}

}
}
else if (value=="0")
{
var add=1;
if(values.length!=0)
{
var skills=snapshot.val().skills;
for (var j=0;j<values.length;j++)
{
if (!skills.includes(values[j]))
{
add=0;
}
}
}
for(var i=0;i<nodes.length;i++)
{

var split=nodes[i].innerHTML.split("|");
var name=split[0];
var name2=name.substring(0, name.length -1);
var split2=split[1].split(" ");

if(split2[1]=="0")
{

if(username==name2)
{
if(add==1)
{
document.getElementById(name2).style.display="block";
}
}
}

}
}
else if(value=="40")
{
var add=1;
if(values.length!=0)
{
var skills=snapshot.val().skills;
for (var j=0;j<values.length;j++)
{
if (!skills.includes(values[j]))
{
add=0;
}
}
}
for(var i=0;i<nodes.length;i++)
{
var split=nodes[i].innerHTML.split("|");
var name=split[0];
var name2=name.substring(0, name.length -1);
var split2=split[1].split(" ");
if(split2[1]=="40")
{

if(username==name2)
{
if(add==1)
{
document.getElementById(name2).style.display="block";
}
}
}

}
}
else {
var add=1;
var split=value.split("-");
var int1=parseInt(split[0],10);
var int2=parseInt(split[1],10);
if(values.length!=0)
{
var skills=snapshot.val().skills;
for (var j=0;j<values.length;j++)
{
if (!skills.includes(values[j]))
{
add=0;
}
}
}
for(var i=0;i<nodes.length;i++)
{
var split2=nodes[i].innerHTML.split("|");
var split3=split2[1].split(" ");
var name=split2[0];
var name2=name.substring(0, name.length -1);
var value2=parseInt(split3[1],10);
if(value2>=int1 && value2 <=int2)

{
if(username==name2)
{
if(add==1)
{
document.getElementById(name2).style.display="block";
}
}
}
}
}
});
}
}
});
}
else if (value=="any")
{

if(values.length!=0)
{
for(var i=0;i<nodes.length;i++)
{
var split=nodes[i].innerHTML.split("|");
var name=split[0];
var name2=name.substring(0, name.length -1);
var userid=document.getElementById(name2).name;
add=1;
firebase.database().ref("users/"+userid).on('value', (snapshot) => {
var skills=snapshot.val().skills;
for (var j=0;j<values.length;j++)
{
if (!skills.includes(values[j]))
{
add=0;
}
}
if(add==1)
{
document.getElementById(name2).style.display="block";
}
});
} 
}
else {
for(var i=0;i<nodes.length;i++)
{
var split=nodes[i].innerHTML.split("|");
var name=split[0];
var name2=name.substring(0, name.length -1);
document.getElementById(name2).style.display="block";
}
}
}
else if (value=="0")
{

for(var i=0;i<nodes.length;i++)
{
var split=nodes[i].innerHTML.split("|");

var split2=split[1].split(" ");
if(split2[1]=="0")
{

if(values.length!=0)
{

var split=nodes[i].innerHTML.split("|");
var name=split[0];
var name2=name.substring(0, name.length -1);

var userid=document.getElementById(name2).name;
add=1;
firebase.database().ref("users/"+userid).on('value', (snapshot) => {
var skills=snapshot.val().skills;
var username=snapshot.val().first_name+" "+snapshot.val().last_name;
var name=split[0];
var name2=name.substring(0, name.length -1);

for (var j=0;j<values.length;j++)
{

if (!skills.includes(values[j]))
{

add=0;
}
}
if(add==1)
{
if(username==name2)
{
document.getElementById(name2).style.display="block";
}
}

});
}
else
{

var split=nodes[i].innerHTML.split("|");
var name=split[0];
var name2=name.substring(0, name.length -1);
document.getElementById(name2).style.display="block";
}
}

}

}


else if(value=="40")
{
for(var i=0;i<nodes.length;i++)
{
var split=nodes[i].innerHTML.split("|");

var split2=split[1].split(" ");
if(split2[1]=="40")
if(values.length!=0)
{

var split=nodes[i].innerHTML.split("|");
var name=split[0];
var name2=name.substring(0, name.length -1);
var userid=document.getElementById(name2).name;
add=1;
firebase.database().ref("users/"+userid).on('value', (snapshot) => {
var skills=snapshot.val().skills;
var username=snapshot.val().first_name+" "+snapshot.val().last_name;

for (var j=0;j<values.length;j++)
{
if (!skills.includes(values[j]))
{
add=0;
}
}
if(add==1)
{
if(username==name2)
{
document.getElementById(name2).style.display="block";
}
}
});
}
else {
{

var split=nodes[i].innerHTML.split("|");
var name=split[0];
var name2=name.substring(0, name.length -1);
document.getElementById(name2).style.display="block";
}
}
}
}
else {
var split=value.split("-");
var int1=parseInt(split[0],10);
var int2=parseInt(split[1],10);
for(var i=0;i<nodes.length;i++)
{
var split2=nodes[i].innerHTML.split("|");
var split3=split2[1].split(" ");
var value2=parseInt(split3[1],10);
if(value2>=int1 && value2 <=int2)


{
if (values.length!=0)
{

var split=nodes[i].innerHTML.split("|");
var name=split[0];
var name2=name.substring(0, name.length -1);
var userid=document.getElementById(name2).name;
add=1;
firebase.database().ref("users/"+userid).on('value', (snapshot) => {
var skills=snapshot.val().skills;
var username=snapshot.val().first_name+" "+snapshot.val().last_name;
for (var j=0;j<values.length;j++)
{
if (!skills.includes(values[j]))
{

add=0;
}
}
if(add==1)
{
if(username==name2)
{
document.getElementById(name2).style.display="block";
}
}
});
}
else {

var split=nodes[i].innerHTML.split("|");
var name=split[0];
var name2=name.substring(0, name.length -1);
document.getElementById(name2).style.display="block";
}
}
}
}
}
function filterTask()
{
var teamopt=document.getElementById("teamtasks").value;
document.getElementById("tasks").innerHTML="";
var taskslist= document.getElementById("tasks");
var options = document.getElementById('skillstask').selectedOptions;
var values = Array.from(options).map(({ value }) => value);

var ref = firebase.database().ref("teams");
ref.on("child_added", function(snapshot) {
var team=snapshot.key;

firebase.database().ref("teams/"+team+"/manager").on("child_added", function(snapshot) {
if(snapshot.val()==id)
{

firebase.database().ref("teams/"+team+"/team").on("child_added", function(snapshot) {
var usid=snapshot.val();
firebase.database().ref("users/"+usid).on('value', function(snapshot) {
var userteam=snapshot.val().team;
firebase.database().ref("tasks/details").orderByChild("responsible_user").equalTo(usid).on("child_added", function(snapshot) {
var add=1; 

if (snapshot.val().priority!=document.getElementById("taskpriority").value)
{
if(document.getElementById("taskpriority").value!="any")
{
add=0;
}
}

if(values.length!=0)
{
var taskskills=snapshot.val().necessary_skills;

for(var j=0;j<values.length;j++)
{
if(!taskskills.includes(values[j]))
{
add=0;
}
}
}
if(teamopt!="any")
{
if(teamopt!=userteam)
{

add=0;
}
} 

if(add==1)
{

var li=document.createElement("li");
//li.style.width="490px";
li.appendChild(document.createTextNode(snapshot.val().task_title));
li.setAttribute('onClick','displayTaskDetails("'+snapshot.key+'")');
taskslist.appendChild(li); 
}
});


});
});
}

});



});
}
function displayMembers(teamid){
 var popup = document.createElement('div');
    popup.className = 'popup';
    popup.id = 'test';
    var cancel = document.createElement('div');
    cancel.className = 'cancel';
    var message=document.createElement('span');
    message.style.color="white";
    cancel.onclick = function (e) { popup.parentNode.removeChild(popup) };
    var userlist=document.createElement('ul');              
    popup.appendChild(cancel);
    popup.appendChild(message);
    popup.appendChild(userlist);
    userlist.style.width="480px";
    userlist.style.borderBottomWidth="0px";
    document.body.appendChild(popup);
firebase.database().ref("teams/"+teamid).on('value', function(snapshot) {
var nameofteam=snapshot.val().name;
message.innerHTML=nameofteam;
   
});
firebase.database().ref("teams/"+teamid+"/team").on("child_added", function(snapshot) {
var usid=snapshot.val();
firebase.database().ref("users/"+usid).on('value', function(snapshot) {
var fname=snapshot.val().first_name;
var lname=snapshot.val().last_name;
var name=fname+" "+lname;
var li=document.createElement("li");
li.style.width="480px";
//li.style.color="black";
//li.style.borderBottom="1px solid black";
li.appendChild(document.createTextNode(name));
userlist.appendChild(li);
});
});
}

function displayUserDetails(userid){
 var popup = document.createElement('div');
    popup.className = 'popup';
    popup.id = 'test';
    popup.style.height="110px";
    var cancel = document.createElement('div');
    cancel.className = 'cancel';
    var message=document.createElement('span');
    var data=document.createElement("P");
    cancel.onclick = function (e) { popup.parentNode.removeChild(popup) };
    popup.appendChild(cancel);
    popup.appendChild(message);
    popup.appendChild(data);
    document.body.appendChild(popup);
    message.style.color="white";
    data.style.color="white";
firebase.database().ref("users/"+userid).on('value', function(snapshot) {
var nameofuser="Name: "+snapshot.val().first_name+" "+snapshot.val().last_name;
message.innerHTML=nameofuser;
var skills=snapshot.val().skills;
var skillsstring=skills.join();
var displaydata="birthday: "+snapshot.val().birthday+"<br>"+"email: "+snapshot.val().email+"<br>"+"job: "+snapshot.val().job+"<br>"+"team: "+snapshot.val().team+"<br>"+"skills: "+skillsstring;
data.innerHTML=displaydata;
});

}

function displayTaskDetails(taskid){
 var popup = document.createElement('div');
    popup.className = 'popup';
    popup.id = 'test';
    popup.style.height="110px";
    var cancel = document.createElement('div');
    cancel.className = 'cancel';
    var message=document.createElement('span');
    var data=document.createElement("P");
    var name=document.createElement("P");
    var skills=document.createElement("P");
    message.style.color="white";
    data.style.color="white";
    name.style.color="white";
    skills.style.color="white";
    cancel.onclick = function (e) { popup.parentNode.removeChild(popup) };
    popup.appendChild(cancel);
    popup.appendChild(message);
    popup.appendChild(data);
    popup.appendChild(name);
    popup.appendChild(skills);
    document.body.appendChild(popup);
firebase.database().ref("tasks/details/"+taskid).on('value', function(snapshot) {
var userid=snapshot.val().responsible_user;

firebase.database().ref("users/"+userid).on('value',function(snapshot)
{

var nameofuser=snapshot.val().first_name+" "+snapshot.val().last_name;
var displayname="responsible user: "+nameofuser;
name.innerHTML=displayname;

});
var taskskills=snapshot.val().necessary_skills.join();
var displaytaskskills="Necessary skills: "+taskskills;
var nameoftask="Title: "+snapshot.val().task_title;
var displaydata="hours to work: "+snapshot.val().no_hours_to_work+"<br>"+"priority: "+snapshot.val().priority+"<br>"+"description: "+snapshot.val().task_description;
data.innerHTML=displaydata;
message.innerHTML=nameoftask;
skills.innerHTML=displaytaskskills;
});

}

//Verify user's login status

firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
        setUserName();
        getTeamMembers();
        id=firebaseUser.uid;
firebase.database().ref('users/'+id).on('value', function(snapshot) {
    
    var manager= snapshot.val().manager;
if(manager==true)
{
var userswork= document.getElementById("userswork");
var memberslist= document.getElementById("teams");
var taskslist= document.getElementById("tasks");
memberslist.style.visibility="visible";
var ref = firebase.database().ref("teams");
ref.on("child_added", function(snapshot) {
var team=snapshot.key;
var hours=0;

firebase.database().ref("teams/"+team+"/manager").on("child_added", function(snapshot) {
if(snapshot.val()==id)
{
firebase.database().ref("teams/"+team).on('value', function(snapshot) {
var teamname=snapshot.val().name;
var li=document.createElement("li");
li.setAttribute('id',team);
li.setAttribute('onClick','displayMembers("'+team+'")');
li.appendChild(document.createTextNode(teamname));
memberslist.appendChild(li);
var opt= document.createElement("option");
opt.value=teamname;
opt.innerHTML=teamname;
document.getElementById("userteams").appendChild(opt);
var opt2= document.createElement("option");
opt2.value=teamname;
opt2.innerHTML=teamname;
document.getElementById("teamtasks").appendChild(opt2);
});
firebase.database().ref("teams/"+team+"/team").on("child_added", function(snapshot) {
var usid=snapshot.val();
firebase.database().ref("users/"+usid).on('value', function(snapshot) {
var fname=snapshot.val().first_name;
var lname=snapshot.val().last_name;
var name=fname+" "+lname;

var li=document.createElement("li");
//li.style.width="490px";
li.id=name;
li.setAttribute('onClick','displayUserDetails("'+usid+'")');
li.name=usid;
li.appendChild(document.createTextNode(name+" | 0 hours"));
userswork.appendChild(li);

firebase.database().ref("tasks/details").orderByChild("responsible_user").equalTo(usid).on("child_added", function(snapshot) {
  hours=hours+parseInt(snapshot.val().no_hours_to_work,10);
document.getElementById(name).innerHTML=name+" | "+hours.toString()+" hours";
var li=document.createElement("li");
//li.style.width="490px";
var taskid=snapshot.key;
li.setAttribute('onClick','displayTaskDetails("'+taskid+'")');
li.appendChild(document.createTextNode(snapshot.val().task_title));
taskslist.appendChild(li);

});



});
});
}

});



});
}
else
{
window.location.href = "home_user.html";
}

});
        
    } else {
      window.location.href = "login.html";
    }
});

btn.onclick = function () {
    popup.style.display = "block";
};

span.onclick = function() {
    popup.style.display = "none";
};

deadline_input.onclick = function () {
    // console.log("test");
    calendar_cont.setAttribute("style", "display: block");
};



window.onclick = function(event) {
    if (event.target == popup) {
        popup.style.display = "none";
    }
};


dropDown.onchange= function () {
    if (dropDown.value === "Priority 0") {
        dropDown.setAttribute("class", "prio0");
    } else if (dropDown.value === "Priority 1") {
        dropDown.setAttribute("class", "prio1");
    } else if (dropDown.value === "Priority 2") {
        dropDown.setAttribute("class", "prio2");
    } else if (dropDown.value === "Priority 3") {
        dropDown.setAttribute("class", "prio3");
    }
};


window.onclick = function(e) {
    var day = "";
    var month = "";
    var year = "";
    if (e.target.className === "calendar-day-hover") {
        day = e.target.innerHTML;
        month = document.getElementById("month-picker").innerText;
        year = document.getElementById("year").innerText;
        console.log(day);
        console.log(month);
        console.log(year);
        document.getElementById("deadline_input").value = day + " " + month + " " + year;
        calendar_cont.removeAttribute("style");
        deadline_date = {day: day, month: month, year: year};
    }
};

function incrementTimeByOneHourIfPossibe(date) {
    if (date.getDay() === 0 || date.getDay() > 5) {
        while (date.getDay() === 0 || date.getDay() > 5) {
            date.setDate(date.getDate() + 1);
        }
        date.setHours(9);
    } else if (date.getHours() >= 16) {
        date.setHours(date.getHours() + 24)
        console.log(date.getDay())
        date.setHours(9);
    } else if(date.getHours() < 9) {
        date.setHours(9);
    } else {
        date.setHours(date.getHours() + 1);
    }
    if (date.getDay() === 0 || date.getDay() > 5) {
        while (date.getDay() === 0 || date.getDay() > 5) {
            date.setDate(date.getDate() + 1);
        }
        date.setHours(9);
    }
    return date
}

function addNewTaskByMovingOther(date, task) { /////////////////////////////////////////////////////////////////////////////////////// continue implementation for saving task
    var d = new Date(date)
    console.log(d)
    let selected_user = task["responsible_user"];
    var auxDate = new Date(date);
    firebase.database().ref().child("tasks").get().then((snapshot) => {
        if(snapshot.val()["progress"][selected_user] != null) {
            if (snapshot.val()["progress"][selected_user][Math.floor(date/1000)]) {
                var task_details = {};
                while(snapshot.val()["progress"][selected_user][Math.floor(auxDate/1000)] != null) {
                    var setDate = new Date(auxDate);
                    for (var i = 0; i < parseInt(task["no_hours_to_work"]); i++) {
                        setDate = incrementTimeByOneHourIfPossibe(setDate);
                    }
                    console.log(snapshot.val()["progress"][selected_user][Math.floor(auxDate/1000)])
                    task_details[Math.floor(setDate/1000)] = snapshot.val()["progress"][selected_user][Math.floor(auxDate/1000)];
                    auxDate = incrementTimeByOneHourIfPossibe(auxDate)
                }
                var key = firebase.database().ref().child("tasks/details").push().key;
                firebase.database().ref().child("tasks/details/" + key).set(task);
                for (var i = 0; i < parseInt(task["no_hours_to_work"]); i++) {
                    task_details[Math.floor(date/1000)] = key
                    date = incrementTimeByOneHourIfPossibe(date);
                }
                for(i in task_details) {
                    firebase.database().ref().child("tasks/progress/"+selected_user+"/"+i).set(task_details[i]);
                }
                setNotification(key, task["responsible_user"]);

            } else {
                task["start_time"] =  Math.floor(date/1000);
                var key = firebase.database().ref().child("tasks/details").push().key;
                firebase.database().ref().child("tasks/details/" + key).set(task);
                taskSchedule = {}
                console.log(task["no_hours_to_work"])
                for (var i = 0; i < parseInt(task["no_hours_to_work"]); i++) {
                    taskSchedule[Math.floor(date/1000)] = key;
                    date = incrementTimeByOneHourIfPossibe(date);
                }
                for(i in taskSchedule) {
                    firebase.database().ref().child("tasks/progress/"+selected_user+"/"+i).set(taskSchedule[i]);
                }
                setNotification(key, task["responsible_user"]);
            }
        } else {
            task["start_time"] =  Math.floor(date/1000);
            var key = firebase.database().ref().child("tasks/details").push().key;
            firebase.database().ref().child("tasks/details/" + key).set(task);
            taskSchedule = {}
            console.log(task["no_hours_to_work"])
            for (var i = 0; i < parseInt(task["no_hours_to_work"]); i++) {
                taskSchedule[Math.floor(date/1000)] = key;
                date = incrementTimeByOneHourIfPossibe(date);
            }

            firebase.database().ref().child("tasks/progress/"+selected_user).set(taskSchedule);
            setNotification(key, task["responsible_user"]);

        }
    });
}

function setNotification(id, userID) {
    var date = new Date();date.setSeconds(0, 0);
    // let key = firebase.database().ref().child("users/"+userID+"/notifications").push().key;
    var notification = {
        new: true,
        date_of_creation: Math.floor(date/1000),
        ticketID: id
    }
    firebase.database().ref().child("users/"+userID+"/notifications/").push(notification);
}
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}
submit_button.onclick = function () {
    // dropDown.value = "Priority 2";
    // skills_necessary.value = "CSS";
    // task_title.value = "test title2";
    // task_description.value = "Test description";
    // responsible_user.value = "Emp Emp";
    // hours_necessary.value = "2";
    // deadline_date = {day: 2, month: 2, year: 2022};

    var priority = 0;
    let necessary_skills = [skills_necessary.value]
    switch (dropDown.value) {
        case "Priority 0":
            priority = 0;
            break;
        case "Priority 1":
            priority = 1;
            break;
        case "Priority 2":
            priority = 2;
            break;
        case "Priority 3":
            priority = 3;
            break;
        default:
            priority = 3;
            break;
    }
    var task = {task_title: task_title.value,
        task_description: task_description.value,
        deadline_date: deadline_date,
        responsible_user:responsible_user.value,
        necessary_skills: necessary_skills,
        no_hours_to_work: hours_necessary.value,
        priority: priority};

    // var best_user = {};
    var best_user = employees;

    //remove users without necessary skills
    for (let skill in task["necessary_skills"]) {
        var dismissed_users = []
        best_user.forEach(function (t) {
            if (!t["skills"].includes(task["necessary_skills"][skill])) {
                dismissed_users.push(t["uid"])
                // console.log(dismissed_users)
            }
        })
        dismissed_users.forEach(function (user) {
            best_user.splice(getIndexOfElement(best_user, user), 1);
        })
    }
    var found = false;
    var selected_user = "";



    firebase.database().ref().child("tasks").get().then((snapshot) => {
        while(!found) {
            if (isEmpty(best_user))
                break;


            selected_user = best_user[randomIntFromInterval(best_user.length)]
            // selected_user = best_user[1];
            var currentDate = new Date();currentDate.setMinutes(0, 0, 0);
            var auxDate = new Date(currentDate);
            auxDate = incrementTimeByOneHourIfPossibe(auxDate);
            console.log(best_user)
            console.log(selected_user)
            task["responsible_user"] = selected_user["uid"];
            if(snapshot.val()["progress"][selected_user["uid"]] != null) {
                if (snapshot.val()["progress"][selected_user["uid"]][Math.floor(currentDate/1000)] != null) { //Task t exists
                    if (snapshot.val()["progress"][selected_user["uid"]][Math.floor(auxDate/1000)] != null) { //Task t+1 exits

                        var currentTask = snapshot.val()["progress"][selected_user["uid"]][Math.floor(currentDate/1000)];
                        var currentTaskPriority = snapshot.val()["details"][currentTask]["priority"];

                        if (snapshot.val()["progress"][selected_user["uid"]][Math.floor(currentDate/1000)] === snapshot.val()["progress"][selected_user["uid"]][Math.floor(auxDate/1000)]) { //Task t == task t+1

                            if (currentTaskPriority === priority) { // Task t priority = add task priority
                                auxDate = incrementTimeByOneHourIfPossibe(auxDate);
                                var outOfRange = false;

                                while (!outOfRange) {
                                    if (snapshot.val()["progress"][selected_user["uid"]][Math.floor(auxDate/1000)] == null) {
                                        outOfRange = true;
                                    } else {
                                        if (currentTask === snapshot.val()["progress"][selected_user["uid"]][Math.floor(auxDate/1000)]) {
                                            auxDate = incrementTimeByOneHourIfPossibe(auxDate);
                                        } else {
                                            currentTask = snapshot.val()["progress"][selected_user["uid"]][Math.floor(auxDate/1000)]
                                            currentTaskPriority = snapshot.val()["details"][currentTask]["priority"];
                                            if (currentTaskPriority !== priority) {

                                                outOfRange = true;
                                            }

                                        }
                                    }
                                }

                                addNewTaskByMovingOther(auxDate, task);
                            } else if(currentTaskPriority < priority) { // Task t priority < add task priority
                                auxDate = incrementTimeByOneHourIfPossibe(auxDate);
                                var outOfRange = false;

                                while (!outOfRange) {
                                    if (snapshot.val()["progress"][selected_user["uid"]][Math.floor(auxDate/1000)] == null) {
                                        outOfRange = true;
                                    } else {
                                        if (currentTask === snapshot.val()["progress"][selected_user["uid"]][Math.floor(auxDate/1000)]) {
                                            auxDate = incrementTimeByOneHourIfPossibe(auxDate);
                                        } else {
                                            currentTask = snapshot.val()["progress"][selected_user["uid"]][Math.floor(auxDate/1000)]
                                            currentTaskPriority = snapshot.val()["details"][currentTask]["priority"];
                                            if (currentTaskPriority > priority) {

                                                outOfRange = true;
                                            }

                                        }
                                    }
                                }
                                addNewTaskByMovingOther(auxDate, task);
                            } else {
                                addNewTaskByMovingOther(auxDate, task);
                            }
                        } else if(currentTaskPriority > priority) { // Task t priority < add task priority
                            // auxDate = incrementTimeByOneHourIfPossibe(auxDate);
                            var outOfRange = false;

                            while (!outOfRange) {
                                if (snapshot.val()["progress"][selected_user["uid"]][Math.floor(auxDate/1000)] == null) {
                                    outOfRange = true;
                                } else {
                                    if (currentTask === snapshot.val()["progress"][selected_user["uid"]][Math.floor(auxDate/1000)]) {
                                        auxDate = incrementTimeByOneHourIfPossibe(auxDate);
                                    } else {
                                        currentTask = snapshot.val()["progress"][selected_user["uid"]][Math.floor(auxDate/1000)]
                                        currentTaskPriority = snapshot.val()["details"][currentTask]["priority"];
                                        if (currentTaskPriority > priority) {

                                            outOfRange = true;
                                        }
                                    }
                                }
                            }
                            addNewTaskByMovingOther(auxDate, task);
                        }
                        else {

                            var outOfRange = false;

                            while (!outOfRange) {
                                if (snapshot.val()["progress"][selected_user["uid"]][Math.floor(auxDate/1000)] == null) {
                                    outOfRange = true;
                                } else {
                                    if (currentTask === snapshot.val()["progress"][selected_user["uid"]][Math.floor(auxDate/1000)]) {
                                        auxDate = incrementTimeByOneHourIfPossibe(auxDate);
                                    } else {
                                        currentTask = snapshot.val()["progress"][selected_user["uid"]][Math.floor(auxDate/1000)]
                                        currentTaskPriority = snapshot.val()["details"][currentTask]["priority"];
                                        if (currentTaskPriority > priority) {

                                            outOfRange = true;
                                        }
                                    }
                                }
                            }
                            addNewTaskByMovingOther(auxDate, task);
                        }
                    } else {
                        addNewTaskByMovingOther(auxDate, task);
                    }
                } else {
                    // auxDate = currentDate;auxDate.setHours(auxDate.getHours() >= 16 ? 24 - auxDate.getHours() + 9 : auxDate.getHours() + 1);
                    // addNewTaskByMovingOther(auxDate, task);
                    if (snapshot.val()["progress"][selected_user["uid"]][Math.floor(auxDate/1000)] != null) { //Task t+1 exits

                        var currentTask = snapshot.val()["progress"][selected_user["uid"]][Math.floor(auxDate/1000)];
                        var currentTaskPriority = snapshot.val()["details"][currentTask]["priority"];

                        if (snapshot.val()["progress"][selected_user["uid"]][Math.floor(auxDate/1000)] === snapshot.val()["progress"][selected_user["uid"]][Math.floor(auxDate/1000)]) { //Task t == task t+1

                            if (currentTaskPriority === priority) { // Task already in database priority = add task priority
                                auxDate = incrementTimeByOneHourIfPossibe(auxDate);
                                var outOfRange = false;

                                while (!outOfRange) {
                                    if (snapshot.val()["progress"][selected_user["uid"]][Math.floor(auxDate/1000)] == null) {
                                        outOfRange = true;
                                    } else {
                                        if (currentTask === snapshot.val()["progress"][selected_user["uid"]][Math.floor(auxDate/1000)]) {
                                            auxDate = incrementTimeByOneHourIfPossibe(auxDate);
                                        } else {
                                            currentTask = snapshot.val()["progress"][selected_user["uid"]][Math.floor(auxDate/1000)]
                                            currentTaskPriority = snapshot.val()["details"][currentTask]["priority"];
                                            if (currentTaskPriority !== priority) {

                                                outOfRange = true;
                                            }

                                        }
                                    }
                                }

                                addNewTaskByMovingOther(auxDate, task);
                            } else if(currentTaskPriority < priority) { // Task already in database priority < add task priority (as number, not as actual priority)
                                auxDate = incrementTimeByOneHourIfPossibe(auxDate);
                                var outOfRange = false;

                                while (!outOfRange) {
                                    if (snapshot.val()["progress"][selected_user["uid"]][Math.floor(auxDate/1000)] == null) {
                                        outOfRange = true;
                                    } else {
                                        if (currentTask === snapshot.val()["progress"][selected_user["uid"]][Math.floor(auxDate/1000)]) {
                                            auxDate = incrementTimeByOneHourIfPossibe(auxDate);
                                        } else {
                                            currentTask = snapshot.val()["progress"][selected_user["uid"]][Math.floor(auxDate/1000)]
                                            currentTaskPriority = snapshot.val()["details"][currentTask]["priority"];
                                            if (currentTaskPriority > priority) {

                                                outOfRange = true;
                                            }

                                        }
                                    }
                                }
                                addNewTaskByMovingOther(auxDate, task);
                            } else {
                                addNewTaskByMovingOther(auxDate, task);
                            }
                        } else if(currentTaskPriority > priority) { // Task already in database priority > add task priority
                            auxDate = incrementTimeByOneHourIfPossibe(auxDate);
                            var outOfRange = false;

                            while (!outOfRange) {
                                if (snapshot.val()["progress"][selected_user["uid"]][Math.floor(auxDate/1000)] == null) {
                                    outOfRange = true;
                                } else {
                                    if (currentTask === snapshot.val()["progress"][selected_user["uid"]][Math.floor(auxDate/1000)]) {
                                        auxDate = incrementTimeByOneHourIfPossibe(auxDate);
                                    } else {
                                        currentTask = snapshot.val()["progress"][selected_user["uid"]][Math.floor(auxDate/1000)]
                                        currentTaskPriority = snapshot.val()["details"][currentTask]["priority"];
                                        if (currentTaskPriority > priority) {

                                            outOfRange = true;
                                        }
                                    }
                                }
                            }
                            addNewTaskByMovingOther(auxDate, task);
                        }
                        else {
                            addNewTaskByMovingOther(auxDate, task);
                        }
                    } else {
                        addNewTaskByMovingOther(auxDate, task);
                    }
                }

            }
            else {
                auxDate = incrementTimeByOneHourIfPossibe(auxDate);
                addNewTaskByMovingOther(currentDate, task);
            }
            // currentDate.setHours(auxDate.getHours() >= 15 ? 24 - auxDate.getHours() + 9 : auxDate.getHours() + 1)
            // currentDate.setSeconds(0)
            // var slotFound = false;
            // while (!slotFound) {
            //
            // }

            found = true
        }
    });


    // console.log(assign_user)
    // firebase.database().ref().child("tasks/details").push().set(task);


};
var currentDate = new Date();
console.log(currentDate)
currentDate.setHours(currentDate.getHours())
currentDate.setSeconds(0)
console.log(Math.floor(currentDate/1000))
function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
        textbox.addEventListener(event, function() {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                this.value = "";
            }
        });
    });
}
setInputFilter(document.getElementById("hours_necessary"), function(value) {
    return /^[0-9]/.test(value); // Allow digits and '.' only, using a RegExp
});



//TODO: support for multiple skills
