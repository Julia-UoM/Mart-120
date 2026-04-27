let playerX;
let playerY;
let playerSize = 20;
let speed = 2.5;

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
    { x: 120, y: 120, size: 26, found: false, photo: photos[0], text: "this looks familiar.." },
    { x: 650, y: 100, size: 26, found: false, photo: photos[1], text: "wait.. where am I?" },
    { x: 230, y: 380, size: 26, found: false, photo: photos[2], text: "I recognize this place.." },
    { x: 580, y: 360, size: 26, found: false, photo: photos[3], text: "what was I doing here?" },
    { x: 400, y: 250, size: 26, found: false, photo: photos[4], text: "am I still dreaming?" }
  ];
}

function draw() {
  drawBackground();

  if (gameState === "intro") {
    drawIntro();
  } else if (gameState === "play") {
    playGame();
  } else if (gameState === "memory") {
    playGame();
    drawMemory();
  } else if (gameState === "end") {
    drawEnd();
  }
}

function drawBackground() {
  let r = map(sin(frameCount * 0.01), -1, 1, 15, 30);
  let g = map(sin(frameCount * 0.008), -1, 1, 15, 25);
  let b = map(sin(frameCount * 0.006), -1, 1, 30, 50);

  background(r, g, b);

  noStroke();

  for (let i = 0; i < 40; i++) {
    let x = (i * 91 + frameCount * 0.2) % width;
    let y = (i * 57) % height;

    fill(255, 255, 255, 20);
    ellipse(x, y, 3, 3);
  }
}

function drawIntro() {
  drawMemories();
  drawPlayer();

  fill(10, 10, 20, 150);
  rect(0, 0, width, height);

  fill(200, 180, 255);
  textAlign(CENTER, CENTER);

  textSize(28);
  text("Dream Archive", width / 2, height / 2 - 20);

  textSize(14);
  text("press any key", width / 2, height / 2 + 30);
}

function playGame() {
  movePlayer();
  drawMemories();
  checkMemories();
  drawPlayer();
  drawUI();
}

function movePlayer() {
  if (gameState !== "play") return;

  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) playerX -= speed;
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) playerX += speed;
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) playerY -= speed;
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) playerY += speed;

  playerX = constrain(playerX, playerSize / 2, width - playerSize / 2);
  playerY = constrain(playerY, playerSize / 2, height - playerSize / 2);
}

function drawPlayer() {
  noStroke();

  fill(180, 140, 255, 40);
  ellipse(playerX, playerY, playerSize + 20);

  fill(180, 140, 255, 80);
  ellipse(playerX, playerY, playerSize + 10);

  fill(220, 200, 255);
  ellipse(playerX, playerY, playerSize);
}

function drawMemories() {
  for (let m of memories) {
    if (!m.found) {
      let pulse = sin(frameCount * 0.05 + m.x) * 4;

      fill(255, 255, 255, 60);
      ellipse(m.x, m.y, m.size + 18 + pulse);

      fill(150, 110, 200);
      ellipse(m.x, m.y, m.size);
    }
  }
}

function checkMemories() {
  if (gameState !== "play") return;

  for (let m of memories) {
    let d = dist(playerX, playerY, m.x, m.y);

    if (!m.found && d < playerSize / 2 + m.size / 2) {
      m.found = true;
      collected++;
      currentMemory = m;
      gameState = "memory";
    }
  }
}

function drawMemory() {
  fill(10, 10, 20, 220);
  rect(0, 0, width, height);

  imageMode(CENTER);
  image(currentMemory.photo, width / 2, height / 2 - 40, 320, 200);

  fill(200, 180, 255);
  textAlign(CENTER, CENTER);

  textSize(18);
  text(currentMemory.text, width / 2, height / 2 + 80);

  textSize(12);
  fill(180, 160, 200);
  text("press space", width / 2, height / 2 + 120);
}

function drawUI() {
  fill(160, 140, 200);
  textAlign(CENTER, TOP);
  textSize(14);
  text("fragments: " + collected + " / " + memories.length, width / 2, 15);
}

function drawEnd() {
  fill(200, 180, 255);
  textAlign(CENTER, CENTER);

  textSize(26);
  text("archive complete", width / 2, height / 2);

  textSize(14);
  text("refresh to return", width / 2, height / 2 + 40);
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
