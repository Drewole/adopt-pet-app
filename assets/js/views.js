





function initialSetup() {
	score = 0;
	countDownTimer.textContent = "-";

	if (highScoresWindow.classList.contains("visible") || questionsWindow.classList.contains("visible")) {
		//Hides the scores view, hides the questions view, shows intro
		introView();
	}
	changeHighScoreBtnText("High Scores");

}

function viewToggle(introView, questionsView, highScoreView) {
	if (introView === "visible") {
		introWindow.classList.remove("hidden");
		introWindow.classList.add("visible");
	} else {
		introWindow.classList.remove("visible");
		introWindow.classList.add("hidden");
	}

	if (questionsView === "visible") {
		questionsWindow.classList.remove("hidden");
		questionsWindow.classList.add("visible");
	} else {
		questionsWindow.classList.remove("visible");
		questionsWindow.classList.add("hidden");
	};

	if (highScoreView === "visible") {
		highScoresWindow.classList.remove("hidden");
		highScoresWindow.classList.add("visible");
	} else {
		highScoresWindow.classList.remove("visible");
		highScoresWindow.classList.add("hidden");
	}

};