let playerX;
let playerY;
let playerSize = 22;
let speed = 2.5;

let photos = [];
let memories = [];

let collected = 0;
let gameState = "intro";
let currentMemory = null;

// 
let canCollect = false;

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

  //
  playerX = 400;
  playerY = 420;

  memories = [
    { x: 120, y: 120, size: 58, found: false, photo: photos[0], text: "this looks familiar.." },
    { x: 650, y: 100, size: 58, found: false, photo: photos[1], text: "wait.. where am I?" },
    { x: 220, y: 300, size: 58, found: false, photo: photos[2], text: "I recognize this place.." },
    { x: 610, y: 310, size: 58, found: false, photo: photos[3], text: "what was I doing here?" },
    { x: 400, y: 150, size: 58, found: false, photo: photos[4], text: "am I still dreaming?" }
  ];
}

function draw() {
  drawBackground();

  if (gameState === "intro") {
    drawMemories();
    drawPlayer();
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
  let r = map(sin(frameCount * 0.01), -1, 1, 7, 18);
  let g = map(sin(frameCount * 0.008), -1, 1, 7, 15);
  let b = map(sin(frameCount * 0.006), -1, 1, 18, 38);

  background(r, g, b);

  noStroke();

  for (let i = 0; i < 70; i++) {
    let x = (i * 91 + frameCount * 0.12) % width;
    let y = (i * 57) % height;
    let sparkle = map(sin(frameCount * 0.03 + i), -1, 1, 10, 45);

    fill(180, 140, 255, sparkle);
    ellipse(x, y, 2, 2);
  }
}

function drawIntro() {
  fill(10, 10, 20, 130);
  rect(0, 0, width, height);

  fill(205, 185, 255);
  textAlign(CENTER, CENTER);

  textSize(28);
  text("Dream Archive", width / 2, height / 2 - 40);

  textSize(14);
  text("press any key", width / 2, height / 2 + 5);
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

  let moved = false;

  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    playerX -= speed;
    moved = true;
  }

  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    playerX += speed;
    moved = true;
  }

  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    playerY -= speed;
    moved = true;
  }

  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
    playerY += speed;
    moved = true;
  }

  if (moved) {
    canCollect = true;
  }

  playerX = constrain(playerX, playerSize / 2, width - playerSize / 2);
  playerY = constrain(playerY, playerSize / 2, height - playerSize / 2);
}

function drawPlayer() {
  noStroke();

  fill(190, 145, 255, 35);
  ellipse(playerX, playerY, playerSize + 34);

  fill(190, 145, 255, 75);
  ellipse(playerX, playerY, playerSize + 20);

  fill(225, 205, 255);
  ellipse(playerX, playerY, playerSize);
}

function drawMemories() {
  for (let m of memories) {
    if (!m.found) {
      let pulse = sin(frameCount * 0.04 + m.x) * 5;

      noStroke();

      fill(160, 115, 220, 30);
      ellipse(m.x, m.y, m.size + 32 + pulse);

      fill(160, 115, 220, 70);
      ellipse(m.x, m.y, m.size + 14 + pulse);

      imageMode(CENTER);
      tint(255, 115);
      image(m.photo, m.x, m.y, m.size, m.size);
      noTint();

      fill(150, 110, 210, 90);
      ellipse(m.x, m.y, m.size);

      fill(220, 200, 255, 50);
      ellipse(m.x - 10, m.y - 12, 12, 12);
    }
  }
}

function checkMemories() {
  if (!canCollect) return;

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
  fill(160, 140, 200, 160);
  textAlign(CENTER, TOP);
  textSize(14);
  text("fragments: " + collected + " / " + memories.length, width / 2, 15);
}

function drawEnd() {
  fill(205, 185, 255);
  textAlign(CENTER, CENTER);

  textSize(26);
  text("archive complete", width / 2, height / 2 - 15);

  textSize(14);
  text("refresh to return", width / 2, height / 2 + 30);
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
