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

 firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
   // document.body.style.filter="blur(3px)";
  //  document.body.style.display="none";
 var iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    document.getElementById("loader").style.display="block";
  
    setTimeout(function() { window.location.href="home_user.html"; } , 5000);
  } else {
    
  }
});

var teamnames=[];
var teamsref = firebase.database().ref('teams');
teamsref.on('child_added', function(data) {
  teamnames.push(data.val().name);


});
autocompleteteam(document.getElementById("team"), teamnames);
function closepopup(popupid) {
var popup = document.getElementById(popupid);
  popup.classList.toggle("show");
}
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
function validateRegistration(){
  var manager=false;
  var allgood=1;
  var str = [];
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
	document.getElementById("first_name").style.borderColor="green";
    
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
document.getElementById("last_name").style.borderColor="green";
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
   document.getElementById("email").style.borderColor="red";
     var popup = document.getElementById("emailpopup");
popup.innerHTML="Invalid format";
  popup.classList.toggle("show");
    allgood=0;
    }
    else
    {
firebase.database().ref().child("users").orderByChild("email").equalTo(document.forms.register.email.value).on("value", function(snapshot) {
if (snapshot.exists()) {
    document.getElementById("email").style.borderColor="red";
      var popup = document.getElementById("emailpopup");
popup.innerHTML="Email used";
  popup.classList.toggle("show");
     allgood=0;
}
else
{
	document.getElementById("email").style.borderColor="green";
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
  document.getElementById("job_title").style.borderColor="green";
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
	      document.getElementById("birthday").style.borderColor="green";
    }
    if(document.forms.register.password.value==""){
             document.getElementById("password").style.borderColor="red";
      var popup = document.getElementById("passwordpopup");
popup.innerHTML="Field required";
  popup.classList.toggle("show");
	allgood=0;
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
document.getElementById("password").style.borderColor="green";
    }
    if(document.forms.register.cpassword.value==""){
        document.getElementById("cpassword").style.borderColor="red";
     var popup = document.getElementById("cpasswordpopup");
popup.innerHTML="Field required";
  popup.classList.toggle("show");
	allgood=0;
    }
    else if(!(document.forms.register.password.value===document.forms.register.cpassword.value)){
      document.getElementById("cpassword").style.borderColor="red";
      var popup = document.getElementById("cpasswordpopup");
popup.innerHTML="Password do not match";
  popup.classList.toggle("show");
    allgood=0;
    }
    else
    {
document.getElementById("cpassword").style.borderColor="green";
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
 document.getElementById("admin_code").style.borderColor="green";
	manager=true;
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
}
});

}
	}
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
	 document.getElementById("team").style.borderColor="green";
}
});

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
if (theArray.length==0)
{
allgood=0;
  var popup = document.getElementById("skillpopup");
popup.innerHTML="At least one skill is required";
  popup.classList.toggle("show");
}


if (allgood==1){
var photo="https://github.com/mdo.png";
var fname=document.getElementById("first_name").value;
var lname=document.getElementById("last_name").value;
var team=document.getElementById("team").value;
var job=document.getElementById("job_title").value;
var birthday=document.getElementById("birthday").value;
var email=document.getElementById("email").value;
var pass=document.getElementById("password").value;
var photo2;

firebase.auth().createUserWithEmailAndPassword(email, pass)
  .then((userCredential) => {
   if(uploaded==1){
   var storageRef = firebase.storage().ref('users_avatar/'+userCredential.user.uid+'.'+fileNameExt);
   var image=document.getElementById("file").files[0];
   storageRef.put(image);
   photo='users_avatar/'+userCredential.user.uid+'.'+fileNameExt;
   photo2=userCredential.user.uid+"."+fileNameExt;
   }

    firebase.database().ref('users/' + userCredential.user.uid).set({
      first_name: fname,
      last_name: lname,
      job: job,
      team: team,
      email: email,
      birthday: birthday,
      manager: manager,
      skills: theArray,
      imgURL: photo  
    });

  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });

 var name= fname+" "+lname;
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
  var userid=user.uid;

 if(manager)
{

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
}
else
{

 var ref = firebase.database().ref("teams");
ref.on("child_added", function(snapshot) {
var team2=snapshot.key;

firebase.database().ref("teams/"+team2).on('value', function(snapshot) {
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
} 

user.updateProfile({
  displayName: name,
  photoURL: photo2
}).then(function() {
var popup = document.getElementById("emailpopup");
  popup.classList.toggle("show");
if (manager)
{
var popup=document.getElementById("teampopup");
popup.classList.toggle("show");
}

var popup= document.getElementById("emailpopup");
  popup.classList.toggle("show");
}).catch(function(error) {

});

  } else {

  }
}); 

}
else
{
}
  return false;
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
            $('#user_img').attr('src',"https://github.com/mdo.png");
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
    entry.style.width="595px";
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
