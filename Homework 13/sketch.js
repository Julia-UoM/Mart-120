let playerX = 50;
let playerY = 50;
let playerSize = 25;
let moveSpeed = 5;

let obstacleX = [];
let obstacleY = [];
let obstacleW = [];
let obstacleH = [];
let obstacleColor = [];
let obstacleDX = [];
let obstacleDY = [];

let clickedObstacleX = [];
let clickedObstacleY = [];
let clickedObstacleSize = [];

let exitX = 730;
let exitY = 520;
let exitW = 45;
let exitH = 45;

let win = false;

function setup() {
  createCanvas(800, 600);

  for (let i = 0; i < 5; i++) {
    obstacleX[i] = random(width);
    obstacleY[i] = random(height);
    obstacleW[i] = random(35, 80);
    obstacleH[i] = random(35, 80);
    obstacleColor[i] = color(
      random(180, 255),
      random(180, 255),
      random(180, 255)
    );
    obstacleDX[i] = random(-3, 3);
    obstacleDY[i] = random(-3, 3);

    if (obstacleDX[i] === 0) {
      obstacleDX[i] = 1;
    }
    if (obstacleDY[i] === 0) {
      obstacleDY[i] = 1;
    }
  }
}

function draw() {
  background(245, 240, 250);

  drawInstructions();
  drawBorders();
  drawExit();
  movePlayer();
  drawPlayer();
  moveObstacles();
  drawObstacles();
  drawClickedObstacles();
  checkWin();
  displayWinMessage();
}

function drawInstructions() {
  fill(120, 120, 140);
  textSize(18);
  textAlign(LEFT);
  text("Use WASD to move to the exit. Click to add obstacles.", 20, 30);
}

function drawBorders() {
  fill(210, 205, 220);
  rect(0, 0, width, 10);
  rect(0, height - 10, width, 10);
  rect(0, 0, 10, height);
  rect(width - 10, 0, 10, height);
}

function drawExit() {
  fill(185, 245, 220);
  rect(exitX, exitY, exitW, exitH, 10);

  fill(100, 120, 110);
  textSize(16);
  textAlign(LEFT);
  text("EXIT", exitX - 2, exitY - 10);
}

function drawPlayer() {
  fill(170, 210, 255);
  ellipse(playerX, playerY, playerSize);
}

function movePlayer() {
  if (!win) {
    if (keyIsDown(87)) {
      playerY -= moveSpeed;
    }
    if (keyIsDown(83)) {
      playerY += moveSpeed;
    }
    if (keyIsDown(65)) {
      playerX -= moveSpeed;
    }
    if (keyIsDown(68)) {
      playerX += moveSpeed;
    }
  }
}

function moveObstacles() {
  for (let i = 0; i < obstacleX.length; i++) {
    obstacleX[i] += obstacleDX[i];
    obstacleY[i] += obstacleDY[i];

    if (obstacleX[i] > width) {
      obstacleX[i] = -obstacleW[i];
    }
    if (obstacleX[i] + obstacleW[i] < 0) {
      obstacleX[i] = width;
    }
    if (obstacleY[i] > height) {
      obstacleY[i] = -obstacleH[i];
    }
    if (obstacleY[i] + obstacleH[i] < 0) {
      obstacleY[i] = height;
    }
  }
}

function drawObstacles() {
  for (let i = 0; i < obstacleX.length; i++) {
    fill(obstacleColor[i]);
    rect(obstacleX[i], obstacleY[i], obstacleW[i], obstacleH[i], 12);
  }
}

function mouseClicked() {
  clickedObstacleX.push(mouseX);
  clickedObstacleY.push(mouseY);
  clickedObstacleSize.push(random(20, 50));
}

function drawClickedObstacles() {
  for (let i = 0; i < clickedObstacleX.length; i++) {
    fill(255, 190, 210);
    circle(clickedObstacleX[i], clickedObstacleY[i], clickedObstacleSize[i]);
  }
}

function checkWin() {
  if (
    playerX > exitX &&
    playerX < exitX + exitW &&
    playerY > exitY &&
    playerY < exitY + exitH
  ) {
    win = true;
  }
}

function displayWinMessage() {
  if (win) {
    fill(185, 160, 255);
    textSize(42);
    textAlign(CENTER);
    text("You Win!", width / 2, height / 2);
  }
}
