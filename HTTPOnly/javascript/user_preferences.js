 // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
    firebase.analytics();
    firebase.database();	
    firebase.storage();
function closepopup(popupid) {
var popup = document.getElementById(popupid);
  popup.classList.toggle("show");
}
var teamnames=[];
var teamsref = firebase.database().ref('teams');
teamsref.on('child_added', function(data) {
  teamnames.push(data.val().name);

});
autocompleteteam(document.getElementById("team"), teamnames);
function autocompleteteam(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}
/*execute a function when someone clicks in the document:*/
document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});
}


firebase.auth().onAuthStateChanged(function(user) {

  if (user) {
var userid=user.uid;
var first_name;
var last_name;
var birthday;
var team;
var job;
var imgURL;
var email;
var manager;
var arrayofskills;


firebase.database().ref('users/'+userid).on('value', function(snapshot) {
     first_name = snapshot.val().first_name;
     last_name= snapshot.val().last_name;
     birthday= snapshot.val().birthday;
     team= snapshot.val().team;
     job= snapshot.val().job;
     arrayofskills= snapshot.val().skills;
     imgURL= snapshot.val().imgURL;
     email= snapshot.val().email;
     manager= snapshot.val().manager;

document.forms.register.first_name.value=first_name;
document.forms.register.last_name.value=last_name;
document.forms.register.birthday.value=birthday;
document.forms.register.team.value=team;
document.forms.register.job_title.value=job;
document.forms.register.email.value=email;
 document.getElementById("avatar_name").innerHTML=first_name+" "+last_name;
if(manager){
 document.getElementById("checkbox").style.display="none";
document.getElementById("admin_code").style.display="none";
document.getElementById("apply").style.display="none";
}
if(imgURL==="https://github.com/mdo.png")
{
document.getElementById("avatar_img").src=imgURL;
document.getElementById("user_img").src=imgURL;
}
else
{
firebase.storage().ref().child(imgURL).getDownloadURL()
    .then((url) => {
      
      document.getElementById("avatar_img").src=url;
 document.getElementById("user_img").src=url;
    })
    .catch((error) => {
     
    });
}
var mylist = document.getElementById('demo');

var skillid = 0;
if(arrayofskills.length>0){
var list2 = document.getElementById('demo').childNodes;
    var exists=0;
    for(var j=0;j<list2.length;j++)
    {
    var listvalue = list2[j].innerHTML;
    var remove_button = listvalue.indexOf('<');
    var finalitem =  listvalue.substring(0, remove_button);
    if(firstname==finalitem)
    {
	exists=1;
    }
    }
if(exists==0){
for(var k=0;k<arrayofskills.length;k++){
 var skill = document.createElement('li');
    skill.appendChild(document.createTextNode(arrayofskills[k]));
    skill.setAttribute('id','item'+skillid);
    var removeButton = document.createElement('button');
    removeButton.setAttribute('onClick','removeName("'+'item'+skillid+'")');
    removeButton.setAttribute('class', 'close-icon');
    skill.appendChild(removeButton);
    lastid+=1;
    mylist.appendChild(skill); 
   }
}
}
});
  } else {
window.location.href = "login.html";
  }
});
function validateRegistration(){
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
var userid=user.uid;
var first_name;
var last_name;
var birthday;
var team;
var job;
var arrayofskills;
var imgURL;
var email;
var manager;
var password;
var skills;
var photo;
firebase.database().ref('users/'+userid).on('value', function(snapshot) {
     first_name = snapshot.val().first_name;
     last_name= snapshot.val().last_name;
     birthday= snapshot.val().birthday;
     team= snapshot.val().team;
     job= snapshot.val().job;
     arrayofskills= snapshot.val().skills;
     imgURL= snapshot.val().imgURL;
     email= snapshot.val().email;
     manager= snapshot.val().manager;
     });
   var fields = [];
  var allgood=0;
  var changeemail=0;
  var changepass=0;
  skills=arrayofskills.join();

 

        if(document.forms.register.first_name.value==""){
	document.getElementById("first_name").style.borderColor="red";
        var popup = document.getElementById("firstnamepopup");
popup.innerHTML="Field required";
  popup.classList.toggle("show");
	allgood=0;
    }
    else if(!document.forms.register.first_name.value.match(/^[a-zA-Z-' ]*$/)){
   document.getElementById("first_name").style.borderColor="red";
   var popup = document.getElementById("firstnamepopup");
popup.innerHTML="Only letters";
  popup.classList.toggle("show");
	allgood=0;
    }
    else
    {
    if(document.forms.register.first_name.value!=first_name)	{
    fields.push("first name");
first_name=document.forms.register.first_name.value;
document.getElementById("first_name").style.borderColor="green";
allgood=1;



    }
}
    if(document.forms.register.last_name.value==""){
    document.getElementById("last_name").style.borderColor="red";
    var popup = document.getElementById("lastnamepopup");
popup.innerHTML="Field required";
  popup.classList.toggle("show");
allgood=0;
    }
    else if(!document.forms.register.last_name.value.match(/^[a-zA-Z-' ]*$/)){
    document.getElementById("last_name").style.borderColor="red";
  var popup = document.getElementById("lastnamepopup");
popup.innerHTML="Only letters";
  popup.classList.toggle("show");
allgood=0;
    }
    else
    {
    if(document.forms.register.last_name.value!=last_name) {
document.getElementById("last_name").style.borderColor="green";
last_name=document.forms.register.last_name.value;
 fields.push("last name");
allgood=1;}
    }
    if(document.forms.register.email.value==""){
         document.getElementById("email").style.borderColor="red";
        var popup = document.getElementById("emailpopup");
popup.innerHTML="Field required";
  popup.classList.toggle("show");
	allgood=0;
    }
    else if(!document.forms.register.email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/
)){
    var popup = document.getElementById("emailpopup");
popup.innerHTML="Invalid format";
  popup.classList.toggle("show");
    allgood=0;
    }
    else
    {
firebase.database().ref().child("users").orderByChild("email").equalTo(document.forms.register.email.value).on("value", function(snapshot) {
if (snapshot.exists()) {
if(email!=document.forms.register.email.value){
      document.getElementById("email").style.borderColor="red";
      var popup = document.getElementById("emailpopup");
popup.innerHTML="Email used";
  popup.classList.toggle("show");
     allgood=0;
}
else {
if(document.forms.register.email.value!=email) {
document.getElementById("email").style.borderColor="green";
changeemail=1;
allgood=1;
email=document.forms.register.email.value;
}
}	
}
});
}


    if(document.forms.register.job_title.value==""){
         document.getElementById("job_title").style.borderColor="red";
var popup = document.getElementById("jobpopup");
popup.innerHTML="Field required";
  popup.classList.toggle("show");
	allgood=0;
    }
    else if(!document.forms.register.job_title.value.match(/^[a-zA-Z-' ]*$/)){
     document.getElementById("job_title").style.borderColor="red";
      var popup = document.getElementById("jobpopup");
  popup.innerHTML="Only letters";
  popup.classList.toggle("show");
    allgood=0;
    }
    else
    {
    if(document.forms.register.job_title.value!=job) {
 fields.push("job");
job=document.forms.register.job_title.value;
 document.getElementById("job_title").style.borderColor="green";
allgood=1;
}
    }
  
    if(document.forms.register.birthday.value==""){
         document.getElementById("birthday").style.borderColor="red";


     var popup = document.getElementById("birthdaypopup");
popup.innerHTML="Field required";
  popup.classList.toggle("show");
	allgood=0;
    }
    else if(!document.forms.register.birthday.value.match(/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/)){
      document.getElementById("birthday").style.borderColor="red";
       var popup = document.getElementById("birthdaypopup");
popup.innerHTML="Invalid format";
  popup.classList.toggle("show");
    allgood=0;
    }
    else
    {
    if(document.forms.register.birthday.value!=birthday) {
 fields.push("birthday");
 document.getElementById("birthday").style.borderColor="green";
birthday=document.forms.register.birthday.value;
allgood=1;}	
    }
    if(document.forms.register.password.value==""){
    
    }
    else if(!document.forms.register.password.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)){
     document.getElementById("password").style.borderColor="red";
     var popup = document.getElementById("passwordpopup");
popup.innerHTML="Password is too weak";
  popup.classList.toggle("show");
    allgood=0;
    }
    else
    {
allgood=1;
     changepass=1;
password=document.forms.register.password.value;
     
    }
    if(document.forms.register.cpassword.value==""){
   
	
    }
    else if(!(document.forms.register.password.value===document.forms.register.cpassword.value)){
   document.getElementById("cpassword").style.borderColor="red";
      var popup = document.getElementById("cpasswordpopup");
popup.innerHTML="Password do not match";
  popup.classList.toggle("show");
    changepass=0;
    allgood=0;
    }
    else
    {
allgood=1;
     changepass=1;
    }
    if(document.getElementById("checkbox").checked) {
     if(document.forms.register.admin_code.value==""){
         document.getElementById("admin_code").style.borderColor="red";
           var popup = document.getElementById("codepopup");
popup.innerHTML="Field required";
  popup.classList.toggle("show");
	allgood=0;
    }
    else if(!(document.forms.register.admin_code.value==="123")){
      document.getElementById("admin_code").style.borderColor="red";
          var popup = document.getElementById("codepopup");
popup.innerHTML="Invalid code";
  popup.classList.toggle("show");
    allgood=0;
    }
    else{
	allgood=1;
       fields.push("manager");
	manager=true;
	}
    }
else
{
if(manager===true)
{

if(document.forms.register.team.value==""){
         document.getElementById("team").style.borderColor="red";
    var popup = document.getElementById("teampopup");
    popup.innerHTML="Field required";
  popup.classList.toggle("show");
	allgood=0;
    }
    else
{
if(document.forms.register.team.value!=team)
{
firebase.database().ref("teams").orderByChild("name").equalTo(document.forms.register.team.value).on("value", function(snapshot) {
if (snapshot.exists()) {

     document.getElementById("team").style.borderColor="red";
  var popup = document.getElementById("teampopup");
  popup.innerHTML="Team already exists";
  popup.classList.toggle("show");

    allgood=0;
   
}

 else
    {
  

document.getElementById("team").style.borderColor="green";
fields.push("team");
team=document.forms.register.team.value;
 var newTeamKey = firebase.database().ref().child('teams').push().key;
var managers=[];
managers.push(userid);
var data={
name: team,
manager: managers
};
var updates={};
updates['/teams/'+newTeamKey]=data;
firebase.database().ref().update(updates);
allgood=1;
    }
   
}); 
}}
}
else
{
 
if(document.forms.register.team.value==""){
         document.getElementById("team").style.borderColor="red";
    var popup = document.getElementById("teampopup");
    popup.innerHTML="Field required";
  popup.classList.toggle("show");
	allgood=0;
    }
    else
{
firebase.database().ref().child("teams").orderByChild("name").equalTo(document.forms.register.team.value).on("value", function(snapshot) {
if (!snapshot.exists()) {
     document.getElementById("team").style.borderColor="red";
  var popup = document.getElementById("teampopup");
  popup.innerHTML="Invalid team";
  popup.classList.toggle("show");
    allgood=0;
   
}

 else
    {
   if(document.forms.register.team.value!=team) { 

document.getElementById("team").style.borderColor="green";
fields.push("team");
 var team2=team;
team=document.forms.register.team.value;

 var ref = firebase.database().ref("teams");
ref.on("child_added", function(snapshot) {
var team3=snapshot.key;

firebase.database().ref("teams/"+team3).on('value', function(snapshot) {
if(snapshot.val().name===team2)
{
var members=snapshot.val().team;
if(members.includes(userid))
{
index=members.indexOf(userid);
if(index>-1)
{
members.splice(index,1);
}
snapshot.ref.update({"team": members});
}


}
});
}); 

ref.on("child_added", function(snapshot) {
var team3=snapshot.key;

firebase.database().ref("teams/"+team3).on('value', function(snapshot) {
if(snapshot.val().name===team)
{
var members=snapshot.val().team;
if(members!=null)
{
if(!members.includes(userid))
{
members.push(userid);
snapshot.ref.update({"team": members});
}
}
else
{
var members2=[];
members2.push(userid);
snapshot.ref.update({"team": members2});
}
}
});
}); 



allgood=1;
    }
   }
}); 
} 
} 
}

var list = document.getElementById('demo').childNodes;
var theArray = [];
for(var i=0;i < list.length; i++) {
    var arrValue = list[i].innerHTML;
    var remove_after= arrValue.indexOf('<');
    var result =  arrValue.substring(0, remove_after);
    theArray.push(result);
}
var currentskills=theArray.toString();
if(currentskills!=skills && theArray.length!=0)
{
allgood=1;
fields.push("skills");
skills=currentskills;
}
else
{
theArray=skills.split(",");
if(theArray.length==0){
  var popup = document.getElementById("skillpopup");
popup.innerHTML="At least one skill is required";
  popup.classList.toggle("show");
}
}
 if(uploaded==1){
   alert("Avatar succesfully updated");
   var storageRef = firebase.storage().ref('users_avatar/'+userid+'.'+fileNameExt);
   var image=document.getElementById("file").files[0];
   deleteRef=firebase.storage().ref().child(imgURL);
   deleteRef.delete();
   storageRef.put(image);
   imgURL='users_avatar/'+userid+'.'+fileNameExt;
   photo=userid+"."+fileNameExt;
   allgood=1;
   }
if(allgood==1)
{

firebase.database().ref('users/'+userid).set({ 
first_name: first_name,
last_name: last_name,
job: job,
team: team,
imgURL: imgURL,
skills: theArray,
manager: manager,
email: email,
birthday: birthday
});
var name=first_name+" "+last_name;
user.updateProfile({
  displayName: last_name,
  photoURL: photo
}).then(function() {
	
}).catch(function(error) {
	
}); 

if(changeemail==1 || changepass==1)
{

var promptCount = 0;
window.pw_prompt = function(options) {
    var lm = options.lm || "Password:",
        bm = options.bm || "Submit";
    if(!options.callback) { 
        alert("No callback function provided! Please provide one.") 
    };

    var prompt = document.createElement("div");
    prompt.className = "pw_prompt";

    var submit = function() {
        options.callback(input.value);
        document.body.removeChild(prompt);
    };

    var label = document.createElement("label");
    label.textContent = lm;
    label.for = "pw_prompt_input" + (++promptCount);
    prompt.appendChild(label);

    var input = document.createElement("input");
    input.id = "pw_prompt_input" + (promptCount);
    input.type = "password";
    input.addEventListener("keyup", function(e) {
        if (e.keyCode == 13) submit();
    }, false);
    prompt.appendChild(input);

    var button = document.createElement("button");
    button.textContent = bm;
    button.addEventListener("click", submit, false);
    prompt.appendChild(button);

    document.body.appendChild(prompt);
};

pw_prompt({
    lm:"Please enter your password:", 
    callback: function(password) {
      
 var credential = firebase.auth.EmailAuthProvider.credential(
                user.email,
                password
            );

user.reauthenticateWithCredential(credential).then(function() {
 if(changepass==1)
{
user.updatePassword(password).then(function() {
 alert("Password succesfully updated");
}).catch(function(error) {
  alert("There was a problem updating your password");
});
}
 if(changeemail==1)
{
user.updateEmail(email).then(function() {
  alert("Email succesfully updated");
}).catch(function(error) {
  alert("There was a problem updating your email");
});
}
}).catch(function(error) {
 alert(error);
});
    }
});


}

if(fields.length>0)
{
 var popup = document.createElement('div');
    popup.className = 'popup';
    popup.id = 'test';
    var cancel = document.createElement('div');
    cancel.className = 'cancel';
    var message=document.createElement('span');
    cancel.onclick = function (e) { popup.parentNode.removeChild(popup) };
    var changeslist=document.createElement('ul');     
    changeslist.style.width="480px";
    changeslist.style.borderBottomWidth="0px";
    message.style.color="white";                
    popup.appendChild(cancel);
    popup.appendChild(message);
    popup.appendChild(changeslist);
    document.body.appendChild(popup);
message.innerHTML="Updated fields";
for(var k=0;k<fields.length;k++)
{
var li=document.createElement("li");
li.style.width="480px";
li.style.color="white";
li.style.borderBottom="1px solid white";
li.appendChild(document.createTextNode(fields[k]));
changeslist.appendChild(li);
}
}
}
else {

}


  } else {
   alert("error");
  }
});


  return false;
}
var uploaded=0;
var arrayofskills = ["Javascript","Java","PHP","Python","HTML","CSS","C++"];
function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
	      changeText();
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}
/*execute a function when someone clicks in the document:*/
document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});
}
$("#user_img").click(function(e) {
    $("#file").click();
});
var fileNameExt="";
function show(input) {
        debugger;
        var validExtensions = ['jpg','png','jpeg','gif']; //array of valid extensions
        var fileName = input.files[0].name;
        fileNameExt = fileName.substr(fileName.lastIndexOf('.') + 1);
        if ($.inArray(fileNameExt, validExtensions) == -1) {
            input.type = ''
            input.type = 'file'
              var popup = document.getElementById("avatarpopup");
popup.innerHTML="Invalid format";
  popup.classList.toggle("show");
	    uploaded=0;
        }
        else
        {
	var size = input.files[0].size;

                if(size > 500000){
                    var popup = document.getElementById("avatarpopup");
popup.innerHTML="File is too big";
  popup.classList.toggle("show");
		    uploaded=0;
	}
	else
	{
        if (input.files && input.files[0]) {
            var filerdr = new FileReader();
            filerdr.onload = function (e) {
                $('#user_img').attr('src', e.target.result);
		uploaded=1;
            }
            filerdr.readAsDataURL(input.files[0]);
        }
        }
        }
   }
var list = document.getElementById('demo');
var lastid = 0;

function changeText() {
    var firstname = document.getElementById('search_skills').value;
    search_skills.value="";
    var list2 = document.getElementById('demo').childNodes;
    var exists=0;
    for(var j=0;j<list2.length;j++)
    {
    var listvalue = list2[j].innerHTML;
    var remove_button = listvalue.indexOf('<');
    var finalitem =  listvalue.substring(0, remove_button);
    if(firstname==finalitem)
    {
	exists=1;
    }
    }
    if(exists==0)
    {
    var entry = document.createElement('li');
    entry.style.width="610px";
    entry.appendChild(document.createTextNode(firstname));
    entry.setAttribute('id','item'+lastid);
    var removeButton = document.createElement('button');
    removeButton.setAttribute('onClick','removeName("'+'item'+lastid+'")');
    removeButton.setAttribute('class', 'close-icon');
    entry.appendChild(removeButton);
    lastid+=1;
    list.appendChild(entry); 
   }
   else
    {
        var popup = document.getElementById("skillpopup");
popup.innerHTML="Skill already selected";
  popup.classList.toggle("show");
    }  
}


function removeName(itemid){
    var item = document.getElementById(itemid);
    list.removeChild(item);
}
autocomplete(document.getElementById("search_skills"), arrayofskills);