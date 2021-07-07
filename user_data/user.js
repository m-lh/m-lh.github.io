


(function(win) {
	console.log("123");
	var activateDarkMode_ = win.activateDarkMode;
	win.activateDarkMode = function() {
		activateDarkMode_();
		var header = document.querySelector('#page-header');
		header.style.backgroundImage = "url(\"/images/night.png\")";
		var footer = document.querySelector('#footer');
		footer.style.backgroundImage = "url(\"/images/night.png\")";
	}

	var activateLightMode_ = win.activateLightMode;
	win.activateLightMode = function() {
		activateLightMode_();
		var header = document.querySelector('#page-header');
		header.style.backgroundImage = "url(\"/images/sky.png\")";
		var footer = document.querySelector('#footer');
		footer.style.backgroundImage = "url(\"/images/footer.png\")";
	}

	if (document.documentElement.getAttribute('data-theme') === 'dark') {
		var header = document.querySelector('#page-header');
		header.style.backgroundImage = "url(\"/images/night.png\")";
		var footer = document.querySelector('#footer');
		footer.style.backgroundImage = "url(\"/images/night.png\")";
	}

})(window);