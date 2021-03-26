/*
App Name: (yucky) Pet Adoption App  (If  you come up with something put it here).

Developers: Drew, Saranya, Tam and Anthony

Tam:
	API stuff and Data 

Anthony:
	HTML/CSS/UI/DESIGN

Saranya:
	HTML/CSS/UI/DESIGN

Drew:
	Floater, JS and view logic outside of the api call and page/data view building

Project scope: Building an app that helps people leisurely browse adorable, adoptable pets and add them to a favorites list that can be referenced later.

UserStory: 

AS a USER, when I visit the app I am presented with a brief introduction and a button to get started
WHEN i click on the button I am presented a window with pictures of two different animals
THIS window has options at the top to refine my search
THIS window has a field to enter an address and something to select the range of my search
WHEN I click on a picture, that get added to a local storage item and saved
THEN another set of images is presented on the screen.
WHEN I click on a button it takes me to a page where all my selections are.
WHEN the selections window is visible, I can click a link to where the animal is and see additional information about that pet.
WHEN the selections window is visible, I am able to delete one pet at a time, or all of my saved pets.
WHEN the selections window is visible, I am able to click a button to go back to selecting animals


Acceptance Criteria:

The app works and does what we say above.

Backlog:



New Technology: What new technology will we use? (this is part of the Acceptance Criteria)
	Google Fonts - Saranya

	Material Icons (part of google fonts) - anthony
	Auto-complete library of some sort - drew]

	Wish List
	Chat
	Maybe animation library - drew

API’s: (list of API sources we will be using)
Petfinder API
Positionstack geocode API - Turns Address into latitude and longitude, which we will use to search for pets.


Libraries:
Materialize CSS or Bootstrap
Material Icons
JQuery
More but uknown as of now.












*/

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
});

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

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