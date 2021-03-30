
// curl -d "grant_type=client_credentials&client_id={CLIENT-ID}&client_secret={CLIENT-SECRET}"
//               https://api.petfinder.com/v2/oauth2/token
// curl -H "Authorization: Bearer {YOUR_ACCESS_TOKEN}"
//               https://api.petfinder.com/v2/{CATEGORY}/{ACTION}?{parameter_1}={value_1}&{parameter_2}={value_2};


// This is a information should appear in the Petfinder credit file

/* openapi: 3.0.2
info:
  title: Petfinder API
  description: |
	The Petfinder API allows you to access the Petfinder database of hundreds
	of thousands of pets ready for adoption and over ten thousand animal
	welfare organizations.
  termsOfService: 'https://www.petfinder.com/api-terms-of-service/'
  contact:
	name: Petfinder API Help
	url: 'https://www.petfinder.com/developers/support/'
	email: help@petfinder.com
  version: 1.0.0
servers:
  - url: 'https://api.petfinder.com/v2'
externalDocs:
  description: Petfinder API Documentation
  url: 'https://www.petfinder.com/developers/v2/docs/'
*/
var selectedFavs

var form = new FormData();

var token = "";
var petId
var selectedAnimal

form.append('grant_type', 'client_credentials');
form.append('client_id', 'uX6OHJkjYlNy9eLD9RKw6iJ5LB08IAWqgeGrkz7KMq56QX3QOU');
form.append('client_secret', 'ofgHmo9uEQRltYORcc6MZ1frZdJXJzY7Y8hcrMXj');


// the option value setup

let btn = $('<button>')
btn.text('search').addClass('waves-effect waves-light btn-large')

var category

document.addEventListener('DOMContentLoaded', function () {
	var elems = document.querySelector('select');
	elems.onchange = selectThem;
	var instances = M.FormSelect.init(elems);
	function selectThem(e) {
		category = e.target.value
	}
});

function retrieveFromLocalStorage(storageName, arr) {
	if (localStorage.getItem(storageName !== null)) {
		arr = JSON.parse(localStorage.getItem(storageName));
		return arr;
	}
}
retrieveFromLocalStorage("favorites",selectedFavs);


function saveToLocalStorage(storageName,val) {
	localStorage.setItem(storageName, JSON.stringify(val));
}


let group = $('.group')
group.append(btn)


// general the request link


btn.on('click', function () {

	fetch('https://api.petfinder.com/v2/oauth2/token', {
		method: 'POST',
		body: form,
	}).then(response => {
		return response.json()
	}).then(data => {
		token = data.access_token;
		// console.log(token)
		//generation url of the request
		if(category !== undefined) {
			url = 'https://api.petfinder.com/v2/animals?'+ category
		} else {
			url = 'https://api.petfinder.com/v2/animals?'
		}

		
		//after getting token, we make the call request
		$.ajax({
			url: url,
			dataType: 'json',
			headers: {
				'Authorization': `Bearer ${token}`,
			},
			success: function (data) {
				var animals = data.animals;
				$('.images-wrapper').html('')
				// console.log(petSelection)
				animals.forEach(animal => {
					$(".images-wrapper").append(
					`	<div class="selection-image first-image col s12 m6 l4 center-align" id="${animal.id}" >
								<h4>${animal.name}</h4>
								<img src="${animal.photos.length ? animal.photos[0].medium : 'assets/images/doge.png'}" width="300" height="300" />
							</div>
						 `).removeClass('hidden')
				});

				$(".selection-image").on("click", function(	){
					petId = $(this).attr("id"); //123
					$('.pet-detail .btn-small').removeClass('favorite');
					$('.pet-detail').removeClass('hidden')
					$('.find-friend-view').addClass('hidden')
					selectedAnimal = animals.find(function(animal){
						return animal.id==petId
					})
					var selectedAnimalImage = selectedAnimal.photos.length ? selectedAnimal.photos[0].medium : 'assets/images/doge.png'
					$("#petDetailImage").html("<img src="+selectedAnimalImage+" width='300' height='300' />")
					$('#petName').html(selectedAnimal.name+' The '+selectedAnimal.species)
					$('#gender').html(selectedAnimal.gender)
					$('#age').html(selectedAnimal.age)
					$('#breed').html(selectedAnimal.breeds.primary)
					$('#goodWithChild').html(selectedAnimal.environment.children=== true ? 'Yes' : 'No')
					$('#color').html(selectedAnimal.colors.primary)
					$('#description').html(selectedAnimal.description)
				});

				console.log(data)
			},
			error: function (error) {
				console.log(error)
			}
		})

	}).catch(error => {
		console.error(error);
	})

});

	
$('.pet-detail .btn-small.add-fav').on("click" , function() {
	selectedFavs = JSON.parse(localStorage.getItem('favorites'));
	var thisFav = selectedFavs ? selectedFavs : [];

	var AnimalFavorite = thisFav.find(function(animal){  //{}
	console.log('animal', animal)
		return animal.id==petId
	})

	var isAnimalFavorite = AnimalFavorite && Object.keys(AnimalFavorite).length > 0 ? true : false //[id,gender]

	if(isAnimalFavorite){
		$(this).removeClass("favorite");
		thisFav = thisFav.filter(function(animal){ // returns remaining animals in the favorite
			return animal.id !== AnimalFavorite.id
		})
		localStorage.setItem("favorites", JSON.stringify(thisFav));
	} else {
		$(this).addClass("favorite");
		thisFav.push(selectedAnimal);
		localStorage.setItem("favorites", JSON.stringify(thisFav));
	}
});

//Lets get the coords of the city the user searches
$('#locationBtn').text("Get My Location")

$('#locationBtn').on('click', function () {

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else {
		$('#map').text("Geolocation is not supported by this browser.");
	}
});

function showPosition(position) {
	$('#map').text(`Latitude:${position.coords.latitude} Longitude:${position.coords.longitude}`);
}

