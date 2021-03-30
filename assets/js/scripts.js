// # // in this way, they need to provide their city or location to get lat lon
// # // we can simply run the searching by their city, don't need to find lat lon 

// # /* let cityGeocodeUrl = `https://api.positionstack.com/v1/forward?access_key=cbfda538c5445110ea0ae5fb6a27ebb4&query=${yourCity}&limit=1`
// # fetch(cityGeocodeUrl)
// #   .then(function (response) {
// # 	return response.json();
// #   })
// #   .then(function (data) {
// # 	let lat = data.data[0].latitude;
// # 	let lon = data.data[0].longitude;
// # 	console.log(lat, lon)
// # 	var mapAPIkey =''
// # 	var img_url = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&zoom=14&size=400x300&sensor=false&key=${mapAPIkey}`
// #   $("#mapholder").innerHTML = `<img src='${img_url}'>`;
// #   },
// # );
// #  */

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
});

// functions for slide show
var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}