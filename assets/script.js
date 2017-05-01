function changeSlide(slideshowID,slideName) {
	var slideshowContainer = document.getElementById("slideshow-" + slideshowID + "-container");
	var shownSlide = slideshowContainer.getElementsByClassName("shown")[0];
	var slide = document.getElementById(slideshowID + "-" + slideName);

	slide.className += " shown";
	shownSlide.className = shownSlide.className.replace(/(\sshown|shown\s)/, "");

	var slideshowControls = document.getElementById("slideshow-" + slideshowID + "-controls");
	var selectedButton = slideshowControls.getElementsByClassName("selected")[0];
	var button = document.getElementById(slideshowID + "-" + slideName + "-controls");

	button.className += " selected";
	if (typeof selectedButton !== null)
	selectedButton.className = selectedButton.className.replace(/(\sselected|selected\s)/, "");
}

if (Clipboard.isSupported()) {
	var button = document.getElementById("nav-copy-button");
	button.className = "button";
	button.setAttribute("title", "Cliquez pour copier");

	var popupIsOnScreen = false;

	var clipboard = new Clipboard(button);
	clipboard.on("success",  function () {
		if (!popupIsOnScreen) {
			popupIsOnScreen = true;

			document.getElementById("copy-text").className = "visible";

			window.setTimeout(function () {
				// Amazing and incomprehensible trick to make the css animation play again
				document.getElementById("copy-text").className = ""
				void document.getElementById("copy-text").offsetWidth;
				document.getElementById("copy-text").className = "visible hiding";
			}, 3000);

			window.setTimeout(function () {
				document.getElementById("copy-text").className = "";
				popupIsOnScreen = false;
			}, 3400);
		}
	})
}

var x = 0,
y = 0;

backgroundContainer = document.getElementById("background");

document.body.onmousemove = function (e) {
	x = event.clientX;
	y = event.clientY;
}

function updateBackground() {
	var translateX = -(x - (window.innerWidth / 2)) / window.innerWidth * 15 + "px",
	translateY = -(y - (window.innerHeight / 2)) / window.innerHeight * 15 + "px";

	backgroundContainer.style.transform = "translate(" + translateX + ", " + translateY + ")" // Translate is the least laggy way to do thig thing

	window.requestAnimationFrame(updateBackground);
};

window.requestAnimationFrame(updateBackground);
