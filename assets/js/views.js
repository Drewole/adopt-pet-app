
//These are the window elements of the switching
const containerEl = $(".container");
const welcomeEl = $(".welcome");
const imagesEl = $(".images");
const infoEl = $(".info");




function initialSetup() {
	if (highScoresWindow.classList.contains("visible") || questionsWindow.classList.contains("visible")) {
		//Hides the scores view, hides the questions view, shows intro
		introView();
	}
	changeHighScoreBtnText("High Scores");

}

function viewToggle(welcomeView, imagesView, infoView) {
	if (welcomeView === "visible") {
		welcomeEl.classList.remove("hidden");
		welcomeEl.classList.add("visible");
	} else {
		welcomeEl.classList.remove("visible");
		welcomeEl.classList.add("hidden");
	};

	if (imagesView === "visible") {
		imagesEl.classList.remove("hidden");
		imagesEl.classList.add("visible");
	} else {
		imagesEl.classList.remove("visible");
		imagesEl.classList.add("hidden");
	};

	if (infoView === "visible") {
		infoEl.classList.remove("hidden");
		infoEl.classList.add("visible");
	} else {
		infoEl.classList.remove("visible");
		infoEl.classList.add("hidden");
	};

};