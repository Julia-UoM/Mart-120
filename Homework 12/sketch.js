let playerX = 50;
let playerY = 200;
let playerSize = 25;
let speed = 5;

let obstacle1X = 100;
let obstacle1Y = 100;
let obstacle1W = 40;
let obstacle1H = 60;
let obstacle1SpeedX;
let obstacle1SpeedY;

let obstacle2X = 300;
let obstacle2Y = 250;
let obstacle2W = 70;
let obstacle2H = 30;
let obstacle2SpeedX;
let obstacle2SpeedY;

let mouseObstacleX = -100;
let mouseObstacleY = -100;
let mouseObstacleSize = 40;
let mousePlaced = false;

let exitX = 550;
let exitY = 150;
let exitW = 40;
let exitH = 100;

let won = false;

function setup() {
  createCanvas(600, 400);

  obstacle1SpeedX = random(-3, 3);
  obstacle1SpeedY = random(-3, 3);

  obstacle2SpeedX = random(-4, 4);
  obstacle2SpeedY = random(-4, 4);
}

function draw() {
  background(230, 245, 235);

  drawBorder();
  drawExit();
  createPlayer();
  movePlayer();
  createObstacles();
  moveObstacle1();
  moveObstacle2();
  drawMouseObstacle();
  checkWin();
  displayWinMessage();
  displayText();
}

function createPlayer() {
  fill(180, 170, 220, 180);
  ellipse(playerX, playerY, playerSize + 10, playerSize + 10);

  fill(180, 170, 220);
  ellipse(playerX, playerY, playerSize, playerSize);
}

function movePlayer() {
  if (keyIsDown(LEFT_ARROW)) {
    playerX -= speed;
  } else if (keyIsDown(RIGHT_ARROW)) {
    playerX += speed;
  }

  if (keyIsDown(UP_ARROW)) {
    playerY -= speed;
  } else if (keyIsDown(DOWN_ARROW)) {
    playerY += speed;
  }
}

function drawMouseObstacle() {
  if (mousePlaced == true) {
    fill(255, 220, 180);
    rect(mouseObstacleX, mouseObstacleY, mouseObstacleSize, mouseObstacleSize);
  }
}

function createObstacles() {
  fill(245, 180, 200);
  rect(obstacle1X, obstacle1Y, obstacle1W, obstacle1H);

  fill(180, 230, 200);
  rect(obstacle2X, obstacle2Y, obstacle2W, obstacle2H);
}

function moveObstacle1() {
  obstacle1X += obstacle1SpeedX;
  obstacle1Y += obstacle1SpeedY;

  if (obstacle1X > width) {
    obstacle1X = -obstacle1W;
  } else if (obstacle1X + obstacle1W < 0) {
    obstacle1X = width;
  }

  if (obstacle1Y > height) {
    obstacle1Y = -obstacle1H;
  } else if (obstacle1Y + obstacle1H < 0) {
    obstacle1Y = height;
  }
}

function moveObstacle2() {
  obstacle2X += obstacle2SpeedX;
  obstacle2Y += obstacle2SpeedY;

  if (obstacle2X > width) {
    obstacle2X = -obstacle2W;
  } else if (obstacle2X + obstacle2W < 0) {
    obstacle2X = width;
  }

  if (obstacle2Y > height) {
    obstacle2Y = -obstacle2H;
  } else if (obstacle2Y + obstacle2H < 0) {
    obstacle2Y = height;
  }
}

function drawBorder() {
  noFill();

  stroke(200, 230, 210);
  strokeWeight(12);
  rect(0, 0, width, height);

  stroke(240, 200, 220);
  strokeWeight(6);
  rect(0, 0, width, height);

  stroke(220, 240, 230);
  strokeWeight(2);
  rect(0, 0, width, height);

  noStroke();
}

function drawExit() {
  let pulse = sin(frameCount * 0.05) * 5;

  fill(255, 200, 220, 120);
  ellipse(exitX + exitW / 2, exitY + exitH / 2, exitW + 40 + pulse, exitH + 40 + pulse);

  fill(255, 210, 230, 160);
  ellipse(exitX + exitW / 2, exitY + exitH / 2, exitW + 20, exitH + 20);

  fill(255, 230, 240);
  ellipse(exitX + exitW / 2, exitY + exitH / 2, exitW, exitH);

  fill(150, 120, 140);
  textSize(14);
  textAlign(CENTER);
  text("EXIT", exitX + exitW / 2, exitY - 10);
}

function checkWin() {
  if (
    playerX > exitX &&
    playerX < exitX + exitW &&
    playerY > exitY &&
    playerY < exitY + exitH
  ) {
    won = true;
  } else {
    won = false;
  }
}

function displayWinMessage() {
  if (won == true) {
    fill(220, 120, 160);
    textSize(32);
    textAlign(CENTER);
    text("You Win", width / 2, height / 2);
  }
}

function displayText() {
  fill(120, 140, 130);
  textSize(20);
  textAlign(LEFT);
  text("Escape Portal", 20, 30);

  fill(130, 150, 140);
  textSize(14);
  text("Use arrow keys to move", 20, 360);
  text("Click to place an obstacle", 20, 380);
}

function mousePressed() {
  mouseObstacleX = mouseX;
  mouseObstacleY = mouseY;
  mousePlaced = true;
}
