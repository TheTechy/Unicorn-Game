// a basic controller object that handles key input
controller = {
	left:	false,
	right:	false,
	up:		false,
	down:	false,

	keyUpDown: function(event) {
		var key_state = (event.type == "keydown") ? true : false;
		switch(event.keyCode) {
			case 32: controller.up		=	key_state; break; // space bar
			case 37: controller.left	= 	key_state; break; // left key
			case 38: controller.up		= 	key_state; break; // up key
			case 39: controller.right	= 	key_state; break; // right key
			case 40: controller.down	= 	key_state; break; // right key
		}
	}
};

display = {
	canvas:	document.getElementById("cnv"),
	ctx:	document.getElementById("cnv").getContext("2d"),
	width:	window.innerWidth,
	height:	window.innerHeight,

	render:	() => {
		display.ctx.clearRect(0, 0, display.width, display.height);
		// display.ctx.beginPath();

		// draw score and lives
		display.ctx.font = "28px 'Press Start 2P'";
		display.ctx.fillStyle = 'rgb(255,0,0)';
		display.ctx.fillText("Score: " + game.player.score, 15, 60);

		display.ctx.font = "28px 'Press Start 2P'";
		display.ctx.fillStyle = 'rgb(255,0,0)';
		display.ctx.fillText("Lives: " + game.player.lives, (display.width-240), 60);

		display.ctx.font = "28px 'Press Start 2P'";
		display.ctx.fillStyle = 'rgb(255,0,0)';
		display.ctx.fillText("Moons: " + game.player.moons, 300, 60);
		
		for (let index = game.world.map.length - 1; index > -1; -- index) {
			let tmpFillStyle = 'rgba(0,0,0,0)';
			switch(game.world.map[index]) {
				case 0:
					// Empty block, no need to draw
				break;
				case 1:
					// tmpFillStyle = "#0099" + game.world.map[index] + "f"
					var	spriteWidth = game.world.tile_size, spriteHeight = game.world.tile_size, pl = 270, pt = 0,
						canvasPosX   = (index % game.world.columns) * game.world.tile_size,
						canvasPosY   = Math.floor(index / game.world.columns) * game.world.tile_size;
					display.ctx.drawImage(gameSprites, pl, pt, spriteWidth, spriteHeight, canvasPosX, canvasPosY, spriteWidth,spriteHeight);
				break;
				case 2:
					tmpFillStyle = "#0099" + game.world.map[index] + "f"
				break;
				case 3:
					tmpFillStyle = "#0099" + game.world.map[index] + "f"
				break;
				case 4: // Block tile
					var	spriteWidth = game.world.tile_size , spriteHeight = game.world.tile_size, pl = 90, pt = 0,
						canvasPosX   = (index % game.world.columns) * game.world.tile_size,
						canvasPosY   = Math.floor(index / game.world.columns) * game.world.tile_size;
					display.ctx.drawImage(gameSprites, pl, pt, spriteWidth, spriteHeight, canvasPosX, canvasPosY, spriteWidth, spriteHeight);
				break;
				case 5: // Floor tile
					var	spriteWidth = game.world.tile_size , spriteHeight = game.world.tile_size, pl = 45, pt = 0,
						canvasPosX   = (index % game.world.columns) * game.world.tile_size,
						canvasPosY   = Math.floor(index / game.world.columns) * game.world.tile_size;
					display.ctx.drawImage(gameSprites, pl, pt, spriteWidth, spriteHeight, canvasPosX, canvasPosY, spriteWidth, spriteHeight);
				break;
				case 6:
					// spacer block, no need to draw
				break;
				case 7: // Gold coin
					var	spriteWidth = game.world.tile_size, spriteHeight = game.world.tile_size, pl = 0, pt = 0,
						canvasPosX   = (index % game.world.columns) * game.world.tile_size,
						canvasPosY   = Math.floor(index / game.world.columns) * game.world.tile_size;
					display.ctx.drawImage(gameSprites, pl, pt, spriteWidth, spriteHeight, canvasPosX, canvasPosY, spriteWidth,spriteHeight);
				break;
				case 8: // Power moon
					var	spriteWidth = game.world.tile_size, spriteHeight = game.world.tile_size, pl = 135, pt = 0,
						canvasPosX   = (index % game.world.columns) * game.world.tile_size,
						canvasPosY   = Math.floor(index / game.world.columns) * game.world.tile_size;
					display.ctx.drawImage(gameSprites, pl, pt, spriteWidth, spriteHeight, canvasPosX, canvasPosY, spriteWidth,spriteHeight);
				break;
				case 9:
					// This will be a gold moon tile
				break;
				case 10:
					// Treasure chest
					var	spriteWidth = game.world.tile_size, spriteHeight = game.world.tile_size, pl = 225, pt = 0,
						canvasPosX   = (index % game.world.columns) * game.world.tile_size,
						canvasPosY   = Math.floor(index / game.world.columns) * game.world.tile_size;
					display.ctx.drawImage(gameSprites, pl, pt, spriteWidth, spriteHeight, canvasPosX, canvasPosY, spriteWidth,spriteHeight);
				break;
				case 11: // fire
					var	spriteWidth = game.world.tile_size, spriteHeight = game.world.tile_size, pl = 315, pt = 0,
						canvasPosX   = (index % game.world.columns) * game.world.tile_size,
						canvasPosY   = Math.floor(index / game.world.columns) * game.world.tile_size;
					display.ctx.drawImage(gameSprites, pl, pt, spriteWidth, spriteHeight, canvasPosX, canvasPosY, spriteWidth,spriteHeight);
				break;
			};
		}
		// Draw the character
		// display.ctx.drawImage(imageObj, game.player.x, game.player.y * imageObj.height / imageObj.width);

		// var	spriteWidth = game.world.tile_size, spriteHeight = game.world.tile_size, pl = 225, pt = 0,
		// canvasPosX   = (index % game.world.columns) * game.world.tile_size,
		// canvasPosY   = Math.floor(index / game.world.columns) * game.world.tile_size;

		display.ctx.drawImage(gameSprites, 180, 0, 45, 45, game.player.x, game.player.y, 45,45);

	},
	resize: () => {
		display.canvas.width = display.width;
		display.canvas.height = display.height;
		display.render();
	}
};

game = {
	init: () => {
		// Set jumping to true at start to prevent initial mid air jump
		game.player.jumping = true;
	},
	player: {
		color:			"#ff9900",
		width:			45,
		height:			45,
		jumping:		false,
		old_x:			0,// used for tracking last position for collision detection
		old_y:			0,
		velocity_x:		6,
		velocity_y:		0,
		x:				0,
		y:				0,
		score:			0,
		coins:			0,
		moons:			0,
		lives:			3
	},
	// the world object holds information about our tile map
	world: {
		columns:		32,
		rows:			16,
		coins:			10,
		moons:			3,
		tile_size:		Math.floor(display.width/32),
		tileWidth:		Math.floor(display.width/32),
		tileHeight:		Math.floor(display.width/16),
		map:[
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,7,0,7,0,7,0,7,0,7,0,0,0,0,0,0,0,0,0,0,7,4,0,7,0,0,0,0,0,0,0,
			4,4,4,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,4,4,4,4,4,11,4,4,4,4,4,4,4,4,
			4,4,4,4,4,4,4,4,4,4,4,4,0,0,8,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,4,11,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,8,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,
			0,0,0,7,0,0,0,0,0,0,0,0,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,
			0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,
			0,11,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,
			4,4,4,4,4,4,4,0,0,0,4,0,0,0,0,0,4,4,0,0,0,4,4,4,4,4,4,4,4,4,4,4,
			1,1,1,1,1,1,4,4,11,4,4,0,0,0,0,4,1,1,4,0,0,4,1,1,1,1,1,1,1,1,1,1,
			5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5
		]
	},
	collision: { // Perform action based on the tile type
		1: (object, row, column, mapElem) => {	// tile type 1: top & right side detection
			if (game.collision.topCollision(object, row, mapElem, 1)) { return; }
			game.collision.rightCollision(object, column, mapElem, 1);
		},
		2: (object, row, column, mapElem) => {	// tile type 2: top & left side detection
			if (game.collision.topCollision(object, row, mapElem, 2)) { return; }
			game.collision.leftCollision(object, column, mapElem, 2);
		},
		3: (object, row, column, mapElem) => {	// tile type 3: right side detection
			game.collision.rightCollision(object, column, mapElem, 3);
		},
		4: (object, row, column, mapElem) => {	// tile type 4: top, left & right side detection
			if (game.collision.topCollision(object, row, mapElem, 4)) { return; }
			else if (game.collision.leftCollision(object, column, mapElem, 4)) { return; }
			game.collision.rightCollision(object, column, mapElem, 4);
		},
		5: (object, row, column, mapElem) => {	// tile type 5: top, left & right side detection
			game.collision.topCollision(object, row, mapElem, 5);
		},
		6: (object, row, column, mapElem) => {	// tile type 6: invisible block left, right & top detection
			game.collision.topCollision(object, row, mapElem, 6);
		},
		7: (object, row, column, mapElem) => {	// Gold coin // tile type 7: top, left & right side detection
			if (game.collision.topCollision(object, row, mapElem, 7)) {
				game.player.score += 5;
				game.player.coins++;
				return;
			} else if (game.collision.leftCollision(object, column, mapElem, 7)) {
				game.player.score += 5;
				game.player.coins++;
				return;
			}
			game.player.score += 5;
			game.player.coins++;
			game.collision.rightCollision(object, column, mapElem, 7);
		},
		8: (object, row, column, mapElem) => {	// Power moon // tile type 8: top, bottom, left & right side detection
			if (game.collision.topCollision(object, row, mapElem, 8)) {
				game.player.moons++;
				return;
			} else if (game.collision.bottomCollision(object, row, mapElem, 8)) {
				game.player.moons++;
				return;
			} else if (game.collision.leftCollision(object, column, mapElem, 8)) {
				game.player.moons++;
				return;
			} else {
				game.player.moons++;
				game.collision.rightCollision(object, column, mapElem, 8);
			}
		},
		10: (object, row, column, mapElem) => {	// tile type 4: top, left & right side detection
			if (game.collision.topCollision(object, row, mapElem, 10)) { return; }
			else if (game.collision.bottomCollision(object, row, mapElem, 10)) { return; }
			else if (game.collision.leftCollision(object, column, mapElem, 10)) { return; }
			game.collision.rightCollision(object, column, mapElem, 10);
		},
		11: (object, row, column, mapElem) => {	// fire: top, left & right side detection
			if (game.collision.topCollision(object, row, mapElem, 11)) {
				game.player.lives--;
				game.player.x = 0;
				game.player.y = 0;
				game.player.velocity_x = 24;
				return;
			} else if (game.collision.bottomCollision(object, row, mapElem, 11)) {
				game.player.lives--;
				game.player.x = 0;
				game.player.y = 0;
				game.player.velocity_x = 24;
				return;
			} else if (game.collision.leftCollision(object, column, mapElem, 11)) {
				game.player.lives--;
				game.player.x = 0;
				game.player.y = 0;
				game.player.velocity_x = 24;
				return;
			} else {
				game.collision.rightCollision(object, column, mapElem, 11);
				game.player.lives--;
				game.player.x = 0;
				game.player.y = 0;
				game.player.velocity_x = 24;
			}
		},
		leftCollision: (object, column, mapElem, blockType) => {
			switch(blockType) {
				case 7: // Gold coin
					game.world.map[mapElem] = 0;
				break;
				case 8: // Moon
					game.world.map[mapElem] = 0;
				break;
				default:
				break;
			}
			if (object.velocity_x > 0 && blockType > 5) {	// If the object is moving right
				var left = column * game.world.tile_size;	// calculate the left side of the collision tile
				if (object.x + object.width * 0.5 > left && object.old_x <= left) {	// If the object was to the right of the collision object, but now is to the left of it
					object.x = object.old_x = left - object.width * 0.5 - 0.001;// place object outside of collision
					return true;
				}
			} else {	// If the object is moving right
				var left = column * game.world.tile_size;	// calculate the left side of the collision tile
				if (object.x + object.width * 0.5 > left && object.old_x <= left) {	// If the object was to the right of the collision object, but now is to the left of it
					object.velocity_x = 0;// Stop moving
					object.x = object.old_x = left - object.width * 0.5 - 0.001;// place object outside of collision
					return true;
				}
			}
			return false;
		},
		rightCollision: (object, column, mapElem, blockType) => {
			switch(blockType) {
				case 7: // Gold coin
					game.world.map[mapElem] = 0;
				break;
				case 8: // Moon
					game.world.map[mapElem] = 0;
				break;
				default:
				break;
			}
			if (object.velocity_x < 0 && blockType > 5) {
				var right = (column + 1) * game.world.tile_size;
				if (object.x + object.width * 0.5 < right && object.old_x + object.width * 0.5 >= right) {
					object.old_x = object.x = right - object.width * 0.5;
					return true;
				}
			} else {
				var right = (column + 1) * game.world.tile_size;
				if (object.x + object.width * 0.5 < right && object.old_x + object.width * 0.5 >= right) {
					object.velocity_x = 0;
					object.old_x = object.x = right - object.width * 0.5;
					return true;
				}
			}
			return false;
		},
		topCollision: (object, row, mapElem, blockType) => {
			switch(blockType) {
				case 7: // Gold coin
					game.world.map[mapElem] = 0;
				break;
				case 8: // Moon
					game.world.map[mapElem] = 0;
				break;
				case 11: // fire
					// game.world.map[mapElem] = 0;
				break;
				default:
				break;
			}
			if (object.velocity_y > 0) {
				var top = row * game.world.tile_size;
				if (object.y + object.height > top && object.old_y + object.height <= top) {
					object.jumping = false;
					object.velocity_y = 0;
					object.old_y = object.y = top - object.height - 0.01;
					return true;
				}
			}
			return false;
		},
		bottomCollision: (object, row, mapElem, blockType) => {
			switch(blockType) {
				case 7: // Gold coin
					game.world.map[mapElem] = 0;
				break;
				case 8: // Moon
					game.world.map[mapElem] = 0;
				break;
				case 10: // Chest
					game.world.map[mapElem] = 0;
				break;
				default:
				break;
			}
			if (object.velocity_y < 0) {
				var bottom = row * game.world.tile_size + game.player.height;
				if (object.y - object.height < bottom && object.old_y - object.height <= bottom) {
					object.velocity_y = 0;
					object.jumping = false;
					// object.old_y, object.y = bottom - object.height - 0.01;
					return true;
				}
			}
			return false;
		}
	},
	loop: () => {
		if(game.player.coins >= game.world.coins) {
			document.getElementById('gameWin').style.display = 'block';
			game.init();
		}

		if(game.player.lives <= 0) {
			document.getElementById('gameLose').style.display = 'block';
			game.init();
		}

		// get and use keyboard input
		if (controller.left) {
			game.player.velocity_x -= 0.75;
		}
		if (controller.right) {
			game.player.velocity_x += 0.75;
		}
		if (controller.up && !game.player.jumping) {
			game.player.velocity_y = -32;
			game.player.jumping = true;
		}

		game.player.velocity_y += 1.35; // add gravity
		game.player.old_x = game.player.x;// store the last position of the player
		game.player.old_y = game.player.y;// before we move it on this cycle
		game.player.x += game.player.velocity_x;// move the player's current position
		game.player.y += game.player.velocity_y;

		// do collision detection with the level boundaries so the player can't leave the screen
		if (game.player.x < 0) {
			game.player.velocity_x = 0;
			game.player.old_x = game.player.x = 0;
		} else if (game.player.x + game.player.width > display.canvas.width) {
			game.player.velocity_x = 0;
			game.player.old_x = game.player.x = display.canvas.width - game.player.width;
		}

		if (game.player.y < 0) {
			game.player.velocity_y = 0;
			game.player.old_y = game.player.y = 0;
		} else if (game.player.y + game.player.height > display.canvas.height) {
			game.player.velocity_y = 0;
			game.player.old_y = game.player.y = display.canvas.height - game.player.height;
			game.player.jumping = false;
		}

		game.player.velocity_x *= 0.875;// apply some friction to the player's velocity
		game.player.velocity_y *= 0.9;// the reason we do this after the collision code  

		display.ctx.clearRect(0, 0, display.width, display.height);
		display.ctx.beginPath();

		// Collison detection
		// calculate the player's x and y tile position in the tile map
		var tile_x = Math.floor((game.player.x + game.player.width * 0.5) / game.world.tile_size);
		var tile_y = Math.floor((game.player.y + game.player.height) / game.world.tile_size);
		// get the value at the tile position in the map
		var value_at_index = game.world.map[tile_y * game.world.columns + tile_x];
		// get the array element to check for coins, moons etc
		var mapElem = tile_y * game.world.columns + tile_x;

		// if it's not an empty tile, we need to do narrow phase collision detection and possibly response!
		if (value_at_index != 0) {
			// simply call one of the routing functions in the collision object and pass
			// in values for the collision tile's location in grid/map space
			game.collision[value_at_index](game.player, tile_y, tile_x, mapElem);
		}

		tile_x = Math.floor((game.player.x + game.player.width * 0.5) / game.world.tile_size);
		tile_y = Math.floor((game.player.y + game.player.height) / game.world.tile_size);
		value_at_index = game.world.map[tile_y * game.world.columns + tile_x];
		mapElem = tile_y * game.world.columns + tile_x;

		if (value_at_index != 0) {
			game.collision[value_at_index](game.player, tile_y, tile_x, mapElem);
		} // and that's it! You checked twice and resolved any collisions with the map!

		display.render();
		window.requestAnimationFrame(game.loop);
	}
};


var gameSprites	= new Image();
gameSprites.src	= 'gameSprites.png'

function startGame () {
	game.init();
	display.resize();
	game.loop();
}

window.addEventListener("keydown", controller.keyUpDown);
window.addEventListener("keyup", controller.keyUpDown);

document.getElementById('startGame').addEventListener('click', (evt) => {
	document.getElementById('startGameBg').style.display = 'none';
	document.getElementById('startGame').style.display = 'none';
	game.init();
	display.resize();
	document.getElementById('cnv').style.display = 'block';
	document.getElementById('cnv').style.cursor = 'none';
	game.loop();
}, true);