var score = 0;


// function to randomly select two falling objects//

function random(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

function setBG() {
	if (Math.round(Math.random())) {
		return "https://eimzpink.files.wordpress.com/2015/07/simpsons-donut.png";
	} else {
		return "http://icons.iconarchive.com/icons/gordon-irving/simpsons-2/128/Duff-2-icon.png";
	}
}

// function to set size, velocity and movement of falling objects//

function dropBox() {
	var length = random(100, ($(".game").width() - 100));
	var velocity = random(1000, 10000);
	var size = random(202);
	var thisBox = $("<div/>", {
		class: "box",
		style: "width:" + size + "px; height:" + size + "px; left:" + length + "px; transition: transform " + velocity + "ms linear;"
	});

	//set data and bg based on data
	thisBox.data("test", Math.round(Math.random()));
	if (thisBox.data("test")) {
		thisBox.css({
			"background": "url('https://eimzpink.files.wordpress.com/2015/07/simpsons-donut.png')",
			"background-size": "contain"
		});
	} else {
		thisBox.css({
			"background": "url('http://icons.iconarchive.com/icons/gordon-irving/simpsons-2/128/Duff-2-icon.png')",
			"background-size": "contain"
		});
	}


	//insert falling elements element
	$(".game").append(thisBox);

	//random start for animation
	setTimeout(function () {
		thisBox.addClass("move");
	}, random(0, 5000));

	//remove this object when animation is over
	thisBox.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
		function (event) {
			$(this).remove();
		});
}

for (i = 0; i < 10; i++) {
	dropBox();
}


// click function that changes the score

$(document).on('click', '.box', function () {


	if ($(this).data("test")) {
		score += 1;
	} else {
		score -= 1;
	}

	$(".score").html(score);
	$(this).remove();
});


// set interval to start the game

var runGame = setInterval(function () {
	for (i = 0; i < 10; i++) {
		dropBox();
	}
}, 5000);



// Monitor score every 0.5s and change Homer's look according to score

setInterval(function () {
	if (score > 5) {
		document.getElementById("homerSimpson").style.backgroundImage = "url(img/homerObese.png)";

		document.getElementById("endGame").style.visibility = 'visible';
		document.getElementById("logoMarge").style.visibility = 'visible';

	} else if (score < -5) {
		document.getElementById("homerSimpson").style.backgroundImage = "url(img/homerDrunk.png)";

		document.getElementById("endGame").style.visibility = 'visible';
		document.getElementById("logoMarge").style.visibility = 'visible';
	} else {
		document.getElementById("homerSimpson").style.backgroundImage = "url(img/homer.png)";

		document.getElementById("endGame").style.visibility = 'hidden';
		document.getElementById("logoMarge").style.visibility = 'hidden';

	}
}, 500);

//Give users the option to choose to continue or quit the game

document.getElementById("continue").addEventListener('click', resumeGame, false);

function resumeGame() {
	document.getElementById("endGame").style.visibility = 'hidden';
	score = 0;
	document.getElementById("score").innerHTML = score;
}

document.getElementById("quit").addEventListener('click', quitGame, false);

function quitGame() {
	window.location.replace("http://www.matteofusilli.co.uk/");
}


// Activate game with 'Play' button //
document.getElementById("play").addEventListener('click', startGame, false);

function startGame() {
	document.getElementById("landingPage").style.visibility = 'hidden';
}


// Move Homer with mouse over objects //

$(document).bind('mousemove', function (e) {
	$('#homerSimpson').css({
		left: e.pageX - 80,
		top: e.pageY - 80
	});
});


// === Alternative function to move with arrow keys === //


/*setInterval(moveHomer, 20);
var keys = {}

$(document).keydown(function(e) {
    keys[e.keyCode] = true;
});

$(document).keyup(function(e) {
    delete keys[e.keyCode];
});

function moveHomer() {
    for (var direction in keys) {
        if (!keys.hasOwnProperty(direction)) continue;
        if (direction == 37) {
            $("#homerSimpson").animate({left: "-=10"}, 0);
        }

        if (direction == 39) {
            $("#homerSimpson").animate({left: "+=10"}, 0);  
        }

    }
}*/