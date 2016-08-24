(function () {

	var jellyfish,
	jellyfishpic,
	canvas;

	function gameLoop () {

		window.requestAnimationFrame(gameLoop);
		jellyfish.update();
		jellyfish.render();
	}

	function sprite (options) {

		var that = {},

		frameIndex = 0,
		tickCount = 0,
		ticksPerFrame = options.ticksPerFrame || 0,
		numberOfFrames = options.numberOfFrames || 1;

		that.context = options.context;
		that.width = options.width;
		that.height = options.height;
		that.image = options.image;

		// that.loop = options.loop;

		that.update = function () {
			tickCount += 1;

			if (tickCount > ticksPerFrame) {
				tickCount = 0;

				if (frameIndex < numberOfFrames - 1) {
					frameIndex += 1;
				} else {
					frameIndex = 0;
				}
			}
		};

		that.render = function() {
			// Clear the canvas
			that.context.clearRect(0, 0, that.width, that.height);
			
			console.log("I'm in the render!")

			// Draw the animation
			that.context.drawImage(
				that.image,
				frameIndex * that.width / numberOfFrames,
				0,
				that.width / numberOfFrames,
				that.height,
				0,
				0,
				that.width / numberOfFrames,
				that.height);
		};

		return that;
	}

	// Get canvas
	canvas = document.getElementById("jellyfishAnimation");
	canvas.width = 90;
	canvas.height = 150;

	// Create sprite sheet
	var jellyfishImage = new Image();

	// Create sprite
	var jellyfish = sprite({
		context: canvas.getContext("2d"),
		width: 1600,
		height: 125,
		image: jellyfishImage,
		numberOfFrames: 20,
		ticksPerFrame: 3
	});

	// Load sprite sheet

	jellyfishImage.addEventListener("load", gameLoop);
	jellyfishImage.src = "jellyfishpic.png";

} ());