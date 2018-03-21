
var canvas = document.getElementById("sprite");
canvas.width = 1000;
canvas.height = 500;

var character = new Image();
character.src = "mailbox_5.png";

function gameLoop () {

  window.requestAnimationFrame(gameLoop);

  //display frame 1
  canvas.getContext("2d").drawImage(character, 0, 0, 70, 75, 0, 0, 70, 75);
  //display frame 2
  canvas.getContext("2d").drawImage(character, 70, 0, 70, 75, 0, 75, 70, 75);
  //display frame 3
  canvas.getContext("2d").drawImage(character, 140, 0, 70, 75, 0, 150, 70, 75);
  //display frame 4
  canvas.getContext("2d").drawImage(character, 210, 0, 70, 75, 0, 225, 70, 75);
  //display frame 5
  canvas.getContext("2d").drawImage(character, 280, 0, 70, 75, 0, 300, 70, 75);
  
}

// Start the game loop as soon as the sprite sheet is loaded
character.addEventListener("load", gameLoop);

