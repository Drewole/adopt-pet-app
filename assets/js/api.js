
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
var selectedFavs = [];

var form = new FormData();

var token = "";

form.append('grant_type', 'client_credentials');
form.append('client_id', 'uX6OHJkjYlNy9eLD9RKw6iJ5LB08IAWqgeGrkz7KMq56QX3QOU');
form.append('client_secret', 'ofgHmo9uEQRltYORcc6MZ1frZdJXJzY7Y8hcrMXj');


// the option value setup

let btn = $('<button>')
btn.text('search').addClass('waves-effect waves-light btn-large')


//$(".checkboxId").prop('checked', false)

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
		url = 'https://api.petfinder.com/v2/animals?'
		urlfinal = ''

		$('select option').each(function () {
			if ($(this).is(':selected')) {
				if (url = 'https://api.petfinder.com/v2/animals?') {
					url = url + $(this).val().substring(1)
				} else {
					url = url + $(this).val()
				}
			}
			// console.log(url)
		})

		$('.checkbox').each(function () {
			if ($(this).is(':checked')) {
				if (url = 'https://api.petfinder.com/v2/animals?') {
					url = url + $(this).val().substring(1)
				} else {
					url = url + $(this).val()
				}
			}
			// console.log(url)
		})

		//after getting token, we make the call request
		$.ajax({
			url: url,
			dataType: 'json',
			headers: {
				'Authorization': `Bearer ${token}`,
			},
			success: function (data) {
				let petSelection = data;
				let petOne = petSelection.animals[0].photos[0];
				let petTwo = petSelection.animals[1].photos[0];

				if (petSelection.animals[0].photos[0].medium === "") {
					petOne = "https://via.placeholder.com/300";
				}
				if (petSelection.animals[1].photos[0].medium === "") {
					petTwo = "https://via.placeholder.com/300";
				}
				
				
				// TODO: I am having problems when there isn't a medium image and it returns undefined. The logic above this comment is trying to figure that out.
				console.log(petSelection)
				let choicesTemplate = 
					`	<div class="selection-image first-image col s6 m6 center-align">
								<h4>${petSelection.animals[0].name}</h4>
								<img id="${petSelection.animals[0].id}" src="${petOne}" width="300" height="300" />
							</div>
							<div class="selection-image second-image col s6 m6 center-align">
								<h4>${petSelection.animals[1].name}</h4>
								<img id="${petSelection.animals[1].id}" src="${petTwo}" width="300" height="300" />
							</div>
						 `
				$(".images-wrapper").append(choicesTemplate).removeClass("hidden");
				$(".selection-image").on("click", function(e){
					console.log($(this).attr("id"));
					//TODO: need to then get the data of the clicked item by using the ID, and display that in the box that is below it in the HTML. Fields are there, just need to replace necessary text.
				});


			},
			error: function (error) {
				console.log(error)
			}
		})

	}).catch(error => {
		console.error(error);
	})

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







// in this way, they need to provide their city or location to get lat lon
// we can simply run the searching by their city, don't need to find lat lon 

/* let cityGeocodeUrl = `https://api.positionstack.com/v1/forward?access_key=cbfda538c5445110ea0ae5fb6a27ebb4&query=${yourCity}&limit=1`
fetch(cityGeocodeUrl)
  .then(function (response) {
	return response.json();
  })
  .then(function (data) {
	let lat = data.data[0].latitude;
	let lon = data.data[0].longitude;
	console.log(lat, lon)
	var mapAPIkey =''
	var img_url = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&zoom=14&size=400x300&sensor=false&key=${mapAPIkey}`
  $("#mapholder").innerHTML = `<img src='${img_url}'>`;
  },
);
 */
