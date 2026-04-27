let playerX;
let playerY;
let playerSize = 22;
let speed = 2.5;

let photos = [];
let memories = [];

let collected = 0;
let gameState = "intro";

let message = "";
let messageTimer = 0;

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
  playerY = height / 2 + 60;

  createMemories();
}

function createMemories() {
  memories = [];

  let texts = [
    "this looks familiar..",
    "wait.. where am I?",
    "I recognize this place..",
    "what was I doing here?",
    "am I still dreaming?"
  ];

  for (let i = 0; i < 5; i++) {
    let valid = false;
    let x, y;

    while (!valid) {
      x = random(60, width - 60);
      y = random(60, height - 60);

      let d = dist(x, y, width / 2, height / 2 + 60);

      // must be far enough from player start
      if (d > 140) {
        valid = true;
      }
    }

    memories.push({
      x: x,
      y: y,
      size: 58,
      found: false,
      photo: photos[i],
      text: texts[i]
    });
  }
}

function draw() {
  drawBackground();

  if (gameState === "intro") {
    drawMemories();
    drawPlayer();
    drawIntro();
  } else if (gameState === "play") {
    playGame();
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
  drawMessage();
}

function movePlayer() {
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) playerX -= speed;
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) playerX += speed;
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) playerY -= speed;
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) playerY += speed;

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
  for (let m of memories) {
    let d = dist(playerX, playerY, m.x, m.y);

    if (!m.found && d < playerSize / 2 + m.size / 2) {
      m.found = true;
      collected++;
      message = m.text;
      messageTimer = 140;
    }
  }

  if (collected >= memories.length) {
    gameState = "end";
  }
}

function drawUI() {
  fill(160, 140, 200, 160);
  textAlign(CENTER, TOP);
  textSize(14);
  text("fragments: " + collected + " / " + memories.length, width / 2, 15);
}

function drawMessage() {
  if (messageTimer > 0) {
    fill(205, 185, 255);
    textAlign(CENTER, CENTER);
    textSize(22);
    text(message, width / 2, height - 55);
    messageTimer--;
  }
}

function drawEnd() {
  drawPlayer();

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
  }
}
