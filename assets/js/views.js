
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
/// This is the meat and potatoes
function viewToggle(welcomeView, findFriendView, favoritesView, petDetailsView) {
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

};

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