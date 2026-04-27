let playerX;
let playerY;
let playerSize = 24;
let speed = 3;

let photos = [];
let memories = [];

let collected = 0;
let gameState = "intro";
let currentMemory = null;

function preload() {
  photos[0] = loadImage("images/photo1.jpg");
  photos[1] = loadImage("images/photo2.jpg");
  photos[2] = loadImage("images/photo3.jpg");
  photos[3] = loadImage("images/photo4.jpg");
  photos[4] = loadImage("images/photo5.jpg");
}

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("sketch-holder");

  playerX = width / 2;
  playerY = height / 2;

  memories = [
    {
      x: 130,
      y: 120,
      size: 28,
      found: false,
      photo: photos[0],
      text: "A place I almost remember."
    },
    {
      x: 650,
      y: 110,
      size: 28,
      found: false,
      photo: photos[1],
      text: "Light from somewhere outside the dream."
    },
    {
      x: 230,
      y: 380,
      size: 28,
      found: false,
      photo: photos[2],
      text: "Something familiar, but quiet."
    },
    {
      x: 590,
      y: 360,
      size: 28,
      found: false,
      photo: photos[3],
      text: "A memory waiting to be seen."
    },
    {
      x: 400,
      y: 245,
      size: 28,
      found: false,
      photo: photos[4],
      text: "The last image before waking."
    }
  ];
}

function draw() {
  drawDreamBackground();

  if (gameState === "intro") {
    drawIntroScreen();
  } else if (gameState === "play") {
    playGame();
  } else if (gameState === "memory") {
    playGame();
    drawMemoryScreen();
  } else if (gameState === "end") {
    drawEndScreen();
  }
}

function drawDreamBackground() {
  let red = map(sin(frameCount * 0.01), -1, 1, 230, 248);
  let green = map(sin(frameCount * 0.008), -1, 1, 220, 238);
  let blue = map(sin(frameCount * 0.006), -1, 1, 235, 250);

  background(red, green, blue);

  noStroke();

  for (let i = 0; i < 25; i++) {
    let x = (i * 83 + frameCount * 0.3) % width;
    let y = (i * 47) % height;

    fill(255, 255, 255, 35);
    ellipse(x, y, 5, 5);
  }
}

function drawIntroScreen() {
  fill(60, 48, 65);
  textAlign(CENTER, CENTER);

  textSize(34);
  text("Dream Archive", width / 2, height / 2 - 65);

  textSize(17);
  text("You wake up somewhere quiet.", width / 2, height / 2 - 20);
  text("Collect the photographs to recover the archive.", width / 2, height / 2 + 10);

  textSize(15);
  text("Press any key to begin", width / 2, height / 2 + 70);
}

function playGame() {
  drawRoom();
  movePlayer();
  drawMemories();
  checkForMemories();
  drawPlayer();
  drawCounter();
}

function drawRoom() {
  noStroke();

  fill(255, 255, 255, 45);
  rect(70, 70, 660, 360, 30);

  fill(210, 190, 215, 70);
  rect(120, 220, 560, 40, 20);

  fill(180, 160, 190, 45);
  rect(380, 90, 40, 320, 20);
}

function movePlayer() {
  if (gameState !== "play") {
    return;
  }

  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    playerX -= speed;
  }

  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    playerX += speed;
  }

  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    playerY -= speed;
  }

  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
    playerY += speed;
  }

  playerX = constrain(playerX, playerSize / 2, width - playerSize / 2);
  playerY = constrain(playerY, playerSize / 2, height - playerSize / 2);
}

function drawPlayer() {
  noStroke();

  fill(50, 40, 60, 70);
  ellipse(playerX + 4, playerY + 5, playerSize, playerSize * 0.7);

  fill(65, 50, 80);
  ellipse(playerX, playerY, playerSize, playerSize);
}

function drawMemories() {
  for (let i = 0; i < memories.length; i++) {
    let memory = memories[i];

    if (memory.found === false) {
      let pulse = sin(frameCount * 0.06 + i) * 5;

      fill(255, 255, 255, 150);
      ellipse(memory.x, memory.y, memory.size + 20 + pulse);

      fill(170, 130, 180);
      ellipse(memory.x, memory.y, memory.size);

      fill(255, 255, 255, 200);
      rect(memory.x - 6, memory.y - 8, 12, 16, 2);
    }
  }
}

function checkForMemories() {
  if (gameState !== "play") {
    return;
  }

  for (let i = 0; i < memories.length; i++) {
    let memory = memories[i];
    let distance = dist(playerX, playerY, memory.x, memory.y);

    if (memory.found === false && distance < playerSize / 2 + memory.size / 2) {
      memory.found = true;
      collected++;
      currentMemory = memory;
      gameState = "memory";
    }
  }
}

function drawMemoryScreen() {
  fill(35, 25, 40, 210);
  rect(0, 0, width, height);

  fill(255, 248, 252);
  rect(width / 2 - 220, height / 2 - 170, 440, 340, 20);

  imageMode(CENTER);
  image(currentMemory.photo, width / 2, height / 2 - 45, 300, 180);

  fill(60, 48, 65);
  textAlign(CENTER, CENTER);

  textSize(17);
  text(currentMemory.text, width / 2 - 170, height / 2 + 80, 340, 60);

  textSize(13);
  text("Press space to continue", width / 2, height / 2 + 135);
}

function drawCounter() {
  fill(60, 48, 65);
  textAlign(LEFT, TOP);
  textSize(15);
  text("Photos recovered: " + collected + " / " + memories.length, 20, 20);
}

function drawEndScreen() {
  fill(60, 48, 65);
  textAlign(CENTER, CENTER);

  textSize(32);
  text("Archive Complete", width / 2, height / 2 - 60);

  textSize(17);
  text("All of the photographs have returned.", width / 2, height / 2 - 15);
  text("The dream is quiet again.", width / 2, height / 2 + 15);

  textSize(14);
  text("Refresh the page to play again.", width / 2, height / 2 + 80);
}

function keyPressed() {
  if (gameState === "intro") {
    gameState = "play";
  } else if (gameState === "memory" && key === " ") {
    if (collected >= memories.length) {
      gameState = "end";
    } else {
      gameState = "play";
    }
  }
}
