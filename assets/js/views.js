
//These are the window elements of the switching
const welcomeViewEl = document.querySelector(".welcome-view");
const findFriendViewEl = document.querySelector(".find-friend-view");
const favoritesViewEl = document.querySelector(".favorites-view");
const petDetailViewEl = document.querySelector(".pet-detail");

$("#confirmMessage").hide();

function initialSetup() {
	if (findFriendViewEl.classList.contains("visible") || favoritesViewEL.classList.contains("visible")) {
	
		 welcomeView();
	}
}

var selectedFavAnimal
var favPetId
var favoriteAnimals

/// This is the meat and potatoes
function viewToggle(welcomeView, findFriendView, favoritesView) {
	petDetailViewEl.classList.remove("visible");
	petDetailViewEl.classList.add("hidden");
	if (welcomeView === "visible") {
		welcomeViewEl.classList.add("visible");
		welcomeViewEl.classList.remove("hidden");
	} else {
		welcomeViewEl.classList.remove("visible");
		welcomeViewEl.classList.add("hidden");
	};

	if (findFriendView === "visible") {
		findFriendViewEl.classList.add("visible");
		findFriendViewEl.classList.remove("hidden");
	} else {
		findFriendViewEl.classList.remove("visible");
		findFriendViewEl.classList.add("hidden");
	};

	if (favoritesView === "visible") {
		favoritesViewEl.classList.remove("hidden");
		favoritesViewEl.classList.add("visible");
	} else {
		favoritesViewEl.classList.remove("visible");
		favoritesViewEl.classList.add("hidden");
	};

};

function welcomeView() { 
	//Shows the welcome view, hides the favorites view, hides find friends                   
	viewToggle("visible", "hidden", "hidden");
};

function findFriendView() {
	//Shows the find friend view, hides the favorites view, hides wlecome
	viewToggle("hidden", "visible", "hidden");
};
function favoritesView() {
	//Hides the welcome view, hides the find friend view, shows favorites
	viewToggle("hidden", "hidden", "visible");
	favoriteAnimals = JSON.parse(localStorage.getItem('favorites'))
	$(".fav-images-wrapper").html('')
	if(favoriteAnimals.length){
	favoriteAnimals.forEach(favoriteAnimal => {
		$(".fav-images-wrapper").append(
		`	<div class="select-fav-image first-image col s12 m6 l4 center-align" id="${favoriteAnimal.id}" >
				<h4>${favoriteAnimal.name}</h4>
				<img src="${favoriteAnimal.photos.length ? favoriteAnimal.photos[0].medium : 'assets/images/doge.png'}" width="300" height="300" />
			</div>
		`)
	});
	}
	$(".select-fav-image").on("click", function(){
		
		favPetId = $(this).attr("id"); //123
		$('.pet-detail .btn-small').removeClass('favorite');
		$('.pet-detail').removeClass('hidden')
		$('.find-friend-view').addClass('hidden')
		$('.add-fav').addClass("favorite");
		favoritesViewEl.classList.remove("visible");
		favoritesViewEl.classList.add("hidden");

		selectedFavAnimal = favoriteAnimals.find(function(animal){
			return animal.id==favPetId	
		})
		var selectedAnimalImage = selectedFavAnimal.photos.length ? selectedFavAnimal.photos[0].medium : 'assets/images/doge.png'
		$("#petDetailImage").html("<img src="+selectedAnimalImage+" width='300' height='300' />")
		$('#petName').html(selectedFavAnimal.name+' The '+selectedFavAnimal.species)
		$('#gender').html(selectedFavAnimal.gender)
		$('#age').html(selectedFavAnimal.age)
		$('#breed').html(selectedFavAnimal.breeds.primary)
		$('#goodWithChild').html(selectedFavAnimal.environment.children=== true ? 'Yes' : 'No')
		$('#color').html(selectedFavAnimal.colors.primary)
		$('#description').html(selectedFavAnimal.description)
	});

};

$('.pet-detail .btn-small.add-fav').on("click" , function() {
	console.log('coming')
	var thisFav = favoriteAnimals ? favoriteAnimals : [];
	var AnimalFavorite = thisFav.find(function(animal){
		return animal.id==favPetId
	})

	var isAnimalFavorite = AnimalFavorite && Object.keys(AnimalFavorite).length > 0 ? true : false

	if(isAnimalFavorite){
		$(this).removeClass("favorite");
		thisFav = thisFav.filter(function(animal){ 
			return animal.id !== AnimalFavorite.id
		})
		localStorage.setItem("favorites", JSON.stringify(thisFav));
	} else {
		$(this).addClass("favorite");
		thisFav.push(selectedAnimal);
		localStorage.setItem("favorites", JSON.stringify(thisFav));
	}
});


$('#backToHome').on('click', function(){
	viewToggle("visible", "hidden", "hidden");
	$("#userForm").show()
	$("#confirmMessage").hide();
})

// Confirm message for user
$("#findFriendLink").on("click", function (){
	var userDetails = []
	userDetails = JSON.parse(localStorage.getItem('AppliedUserDetails'))
	userDetails.push({firstName:$("#firstName").val(),lastName:$("#lastName").val(), telephone:$("#telephone").val(),email:$("#email").val()})
	$("#userForm").hide()
	$("#confirmMessage").show();
	localStorage.setItem("AppliedUserDetails", JSON.stringify(userDetails));
})



const clickContainer = document.querySelector("body");
clickContainer.addEventListener("click", function (event) {
	var elementClicked = event.target;
	if (elementClicked.classList.contains("welcome-link")) {
		welcomeView()
	} else if (elementClicked.classList.contains("find-friend-link")) {
		findFriendView()
	} else if (elementClicked.classList.contains("favorites-link")) {
		favoritesView()
	}
})