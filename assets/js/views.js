
//These are the window elements of the switching
const welcomeViewEl = document.querySelector(".welcome-view");
const findFriendViewEl = document.querySelector(".find-friend-view");
const favoritesViewEl = document.querySelector(".favorites-view");




function initialSetup() {
	if (imagesViewEl.classList.contains("visible") || infoViewEL.classList.contains("visible")) {
		//Hides the scores view, hides the questions view, shows intro
		viewToggle("visible","hidden","hidden");
	}

}
/// This is the meat and potatoes
function viewToggle(welcomeView, findFriendView, favoritesView) {
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
	console.log("Welcome View Showing.");
	viewToggle("visible", "hidden", "hidden");
};
//Also call this when the game ends
function findFriendView() {
	console.log("Find Friend View Showing.");
	//Shows the find friend view, hides the favorites view, hides wlecome
	viewToggle("hidden", "visible", "hidden");

};
function favoritesView() {
	console.log("Favorites View Showing.");

	//Hides the welcome view, hides the find friend view, shows favorites
	viewToggle("hidden", "hidden", "visible");

};



const clickContainer = document.querySelector("body");
clickContainer.addEventListener("click", function (event) {
	var elementClicked = event.target;

	console.log(elementClicked)
	console.log($("a.home"))
	if (elementClicked.classList.contains("welcome-link")) {
		welcomeView()
	} else if (elementClicked.classList.contains("find-friend-link")) {
		findFriendView()
	} else if (elementClicked.classList.contains("favorites-link")) {
		favoritesView()
	};


})