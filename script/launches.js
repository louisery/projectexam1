// Launch countdown

// Countdown date
var countdownDate = new Date("Jul 31, 2018 00:00:00").getTime();

// Update the countdown every 1 second
var x = setInterval(function() {

  // Todays date and time
  var now = new Date().getTime();

  // Distance between now and the countdown date
  var distance = countdownDate - now;

  // Days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Output the results
  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;

  // If the countdown is over, show EXPIRED
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdownTimer").innerHTML = "EXPIRED";
  }
}, 1000);

// API Launches

fetch("https://api.spacexdata.com/v2/launches/all")
.then(result => result.json())
.then((res) => {
  res.forEach(e => createLaunchBox(e));
});

function createLaunchBox(resultItem) {
  console.log(resultItem);
  var launches = document.getElementById('launches')
  var outputDiv = document.createElement("div");
  var mission_name = document.createElement("h3");
  var rocket_name = document.createElement("div");
  var flight_number = document.createElement("div");
  var launch_year = document.createElement("div");
  var launch_date_utc = document.createElement("div");
  var rocket_type = document.createElement("div");
  var site_name = document.createElement("div");
  var mission_patch_small = document.createElement("div");
  var mission_patch_small_image = document.createElement("img");
  var article_link = document.createElement("div");
  var article_link_more = document.createElement("a");
  mission_name.innerHTML = resultItem.mission_name;
  flight_number.innerHTML = "Flight number: " + resultItem.flight_number;
  rocket_name.innerHTML = "Rocket name: " + resultItem.rocket.rocket_name;
  launch_year.innerHTML = "Launch year: " + resultItem.launch_year;
  launch_date_utc.innerHTML = "Launch date: " + resultItem.launch_date_utc;
  rocket_type.innerHTML = "Rocket type: " + resultItem.rocket.rocket_type;
  site_name.innerHTML = "Launch site: " + resultItem.launch_site.site_name;
  mission_patch_small_image.setAttribute("src", resultItem.links.mission_patch_small);
  mission_patch_small.appendChild(mission_patch_small_image);
  article_link_more.setAttribute("href", resultItem.links.article_link);
  article_link.appendChild(article_link_more);
  article_link_more.innerHTML = "Read More";
  outputDiv.className = "launchBox";
  article_link_more.className = "btn-primary-small";
  mission_patch_small_image.className = "patch-image";;

  if (resultItem.launch_success) {
    outputDiv.className += " item_completed";
  } else {
    outputDiv.className += " item_incomplete";
  }

  outputDiv.appendChild(mission_name);
  outputDiv.appendChild(flight_number);
  outputDiv.appendChild(rocket_name);
  outputDiv.appendChild(launch_year);
  outputDiv.appendChild(launch_date_utc);
  outputDiv.appendChild(rocket_type);
  outputDiv.appendChild(site_name);
  outputDiv.appendChild(mission_patch_small);
  outputDiv.appendChild(article_link);
  launches.appendChild(outputDiv);
}
