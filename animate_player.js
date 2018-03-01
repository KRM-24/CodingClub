(function () {
			
	var player,
		playerImage,
		canvas;

	function gameLoop () {
	
	  window.requestAnimationFrame(gameLoop);

	  player.update();
	  player.render();
	}
	
	function sprite (options) {
	
		var that = {},
			frameIndex = 0,
			tickCount = 0,
			ticksPerFrame = options.ticksPerFrame || 0,
			numberOfFrames = options.numberOfFrames || 1;
		
		var action_list = {stand: 1, attack: 2, hit: 4, dead: 8};
		var action_current = action_list.stand;
		var action_previous = action_list.stand;
		
		that.context = options.context;
		that.width = options.width;
		that.height = options.height;
		that.image = options.image;
		
		//if spacebar was pushed, we want to attack
		that.attack = function(e){
			if(e.keyCode == 32) {
				action_previous = action_current;
				action_current = action_list.attack;
			} else {
				action_previous = action_current;
				action_current = action_list.stand;
			}
		};
		
		that.update = function () {

            tickCount += 1;
			
			//delay time to slow frame rate
            if (tickCount > ticksPerFrame) {

				tickCount = 0;
				
				if (action_current == action_list.attack) {
					// If the current frame index is in range
					if (frameIndex < numberOfFrames - 1) {
						// Go to the next frame
						frameIndex += 1;
					} else {
						//attack is finished, reset frame
						action_previous = action_current;
						action_current = action_list.stand;
						frameIndex = 0;
					}
				} else {
					//just standing around, like a good mailbox should
					frameIndex = 0;
				}
            }
        };
		
		that.render = function () {
		
		  // Clear the canvas
		  that.context.clearRect(0, 0, that.width, that.height);
		  
		  // Draw the animation
		  that.context.drawImage(
		    //image
			that.image,
			//example frame: 0 * 280 / 4 = 0; 1 * 280 / 4 = 70; 2 * 280 / 4 = 140; 3 * 280 / 4 = 210
		    //x position of spritesheet
			frameIndex * that.width / numberOfFrames,
		    //y position of spritesheet
			0,
		    //frame width
			that.width / numberOfFrames,
		    //frame height
			that.height,
		    //x of canvas
			0,
			//y of canvas
		    0,
			//image width on canvas
		    that.width / numberOfFrames,
			//image height on canvas
		    that.height);
		};
		
		return that;
	}
	
	// Get canvas
	canvas = document.getElementById("playerAnimation");
	canvas.width = 400;
	canvas.height = 160;
	
	// Create sprite sheet
	playerImage = new Image();	
	
	// Create sprite
	player = sprite({
		context: canvas.getContext("2d"),
		width: 280,
		height: 80,
		image: playerImage,
		numberOfFrames: 4,
		ticksPerFrame: 10
	});
	
	// Load sprite sheet
	playerImage.addEventListener("load", gameLoop);
	playerImage.src = "mailbox.png";

	//capture keyboard input: the spacebar in particular
	document.addEventListener("keydown", player.attack);
	document.addEventListener("keyup", player.attack);
} ());