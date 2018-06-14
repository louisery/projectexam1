// Navbar background on scroll
$(function () {
  $(document).scroll(function () {
    var $nav = $(".fixed-top");
    $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
  });
});

// Contact Forms

//Form - contact page
//Modal pop up on successful submit
function onSubmitTwo() {
  $("#contactModal").first().modal();
}

//Form - competition page
//The first name and last name fields should not be empty.
function emptyField() {
  var firstName = document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;

  if (firstName === "" || lastName === "") {
    alert(document.getElementById("firstNameError").innerHTML);
    return false;
  }
  else {
    return true;
  }
}

//The number format should be: xxx xxx xxxx, xxx-xxx-xxxx, xxx.xxx.xxxx
function validateNumber(phoneField){
  var regN = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  if (regN.test(phoneField.value) === false)
  {
    alert(document.getElementById("phoneError").innerHTML);
    return false;
  }
  return true;
}

//The email field should have a valid email address inside it.
function validateEmail(emailField){
  var regE = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (regE.test(emailField.value) === false)
  {
    alert(document.getElementById("emailError").innerHTML);
    return false;
  }
  return true;
}

//Modal pop up on successful submit
function onSubmit() {
  $("#competitionModal").first().modal();
}

//API info

fetch('https://api.spacexdata.com/v2/info')
.then(result => result.json())
.then((res) => {
  createSummary(res);
})
.catch(err => console.log(err))

//About summary
function createSummary(result){
  var details = document.getElementById('aboutSummary');
  details.innerHTML += result.summary;
}

fetch('https://api.spacexdata.com/v2/info')
.then(result => result.json())
.then((res) => {
  createAboutInfo(res);
})
.catch(err => console.log(err))

//About details
function createAboutInfo(result){
  var name = document.getElementById('name');
  var founder = document.getElementById('founder')
  var founded = document.getElementById('founded')
  var employees = document.getElementById('employees')
  var vehicles = document.getElementById('vehicles')
  var launch_sites = document.getElementById('launch_sites')
  var test_sites = document.getElementById('test_sites')
  var ceo = document.getElementById('ceo')
  var coo = document.getElementById('coo')
  var cto_propulsion = document.getElementById('cto_propulsion')
  name.innerHTML += "<span>Name: " + result.name + "</span>";
  founder.innerHTML += "<span>Founder:   " + result.founder + "</span>";
  founded.innerHTML += "<span>Founded: " + result.founded + "</span>";
  employees.innerHTML += "<span>Employees:   " + result.employees + "</span>";
  vehicles.innerHTML += "<span>Vehicles: " + result.vehicles + "</span>";
  launch_sites.innerHTML += "<span>Launch Sites:   " + result.launch_sites + "</span>";
  test_sites.innerHTML += "<span>Test Sites:: " + result.test_sites + "</span>";
  ceo.innerHTML += "<span>CEO:   " + result.ceo + "</span>";
  coo.innerHTML += "<span>COO: " + result.coo + "</span>";
  cto_propulsion.innerHTML += "<span>CTO: " + result.cto_propulsion + "</span>";
}


fetch('https://api.spacexdata.com/v2/info')
.then(result => result.json())
.then((res) => {
  createContactInfo(res);
})
.catch(err => console.log(err))

//Contact address
function createContactInfo(result){
  var address = document.getElementById('contactAddress');
  address.innerHTML += result.headquarters.address + ", " + result.headquarters.city + ", " + result.headquarters.state;
}
