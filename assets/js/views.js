
//These are the window elements of the switching
const headerEl = $("header");
const footerEL = $("footer");
const containerEl = $(".container");
const welcomeViewEl = $(".welcome");//The ones below here might have to be changed
const imagesViewEl = $(".images");
const infoViewEl = $(".info");




function initialSetup() {
	if (highScoresWindow.classList.contains("visible") || questionsWindow.classList.contains("visible")) {
		//Hides the scores view, hides the questions view, shows intro
		introView();
	}

}
/// This is the meat and potatoes
function viewToggle(welcomeView, imagesView, infoView) {
	if (welcomeView === "visible") {
		welcomeViewEl.classList.add("visible");
		welcomeViewEl.classList.remove("hidden");
	} else {
		welcomeViewEl.classList.remove("visible");
		welcomeViewEl.classList.add("hidden");
	};

	if (imagesView === "visible") {
		imagesViewEl.classList.remove("hidden");
		imagesViewEl.classList.add("visible");
	} else {
		imagesViewEl.classList.remove("visible");
		imagesViewEl.classList.add("hidden");
	};

	if (infoView === "visible") {
		infoViewEl.classList.remove("hidden");
		infoViewEl.classList.add("visible");
	} else {
		infoViewEl.classList.remove("visible");
		infoViewEl.classList.add("hidden");
	};

};

headerEl.on("click", function (e) {

})

footerEl.on("click", function (e) {

})
