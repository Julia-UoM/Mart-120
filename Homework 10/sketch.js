let eyeX1 = 160;
let eyeX2 = 240;
let eyeDir1 = 1;
let eyeDir2 = -1;

let shoulderY1 = 300;
let shoulderY2 = 300;
let shoulderDir1 = 1;
let shoulderDir2 = -1;

let starX = 70;
let starY = 70;
let starDirX = 1;
let starDirY = 1;

let eyeSpeed1;
let eyeSpeed2;
let shoulderSpeed1;
let shoulderSpeed2;
let starSpeedX;
let starSpeedY;

let titleSize = 24;
let titleGrowing = true;
let titleCount = 0;

function setup() {
  createCanvas(400, 500);

  eyeSpeed1 = random(1, 3);
  eyeSpeed2 = random(1, 3);
  shoulderSpeed1 = random(1, 3);
  shoulderSpeed2 = random(1, 3);
  starSpeedX = random(1, 3);
  starSpeedY = random(1, 3);
}

function draw() {
  background(220, 230, 255);

  // title animation
  fill(40);
  textAlign(CENTER);
  textSize(titleSize);
  text("Self Portrait", width / 2, 40);

  if (frameCount % 10 == 0) {
    if (titleGrowing) {
      titleSize += 2;
      titleCount++;
      if (titleCount == 5) {
        titleGrowing = false;
        titleCount = 0;
      }
    } else {
      titleSize -= 2;
      titleCount++;
      if (titleCount == 5) {
        titleGrowing = true;
        titleCount = 0;
      }
    }
  }

  // diagonal moving shape
  fill(255, 200, 0);
  ellipse(starX, starY, 20, 20);

  starX += starSpeedX * starDirX;
  starY += starSpeedY * starDirY;

  if (starX > 120 || starX < 40) {
    starDirX *= -1;
  }
  if (starY > 120 || starY < 40) {
    starDirY *= -1;
  }

  // body
  fill(0);
  rect(140, 280, 120, 140);

  // shoulder movement
  fill(20);
  ellipse(140, shoulderY1, 50, 50);
  ellipse(260, shoulderY2, 50, 50);

  shoulderY1 += shoulderSpeed1 * shoulderDir1;
  shoulderY2 += shoulderSpeed2 * shoulderDir2;

  if (shoulderY1 > 320 || shoulderY1 < 290) {
    shoulderDir1 *= -1;
  }
  if (shoulderY2 > 320 || shoulderY2 < 290) {
    shoulderDir2 *= -1;
  }

  // neck
  fill(240, 210, 190);
  rect(180, 250, 40, 35);

  // head
  fill(240, 210, 190);
  ellipse(200, 180, 140, 170);

  // hair
  fill(30);
  arc(200, 150, 150, 140, PI, TWO_PI);
  rect(125, 110, 150, 35); // bangs
  rect(120, 140, 20, 120); // left hair
  rect(260, 140, 20, 120); // right hair

  // eye movement
  fill(255);
  ellipse(eyeX1, 175, 22, 14);
  ellipse(eyeX2, 175, 22, 14);

  fill(0);
  ellipse(eyeX1, 175, 8, 8);
  ellipse(eyeX2, 175, 8, 8);

  eyeX1 += eyeSpeed1 * eyeDir1;
  eyeX2 += eyeSpeed2 * eyeDir2;

  if (eyeX1 > 170 || eyeX1 < 150) {
    eyeDir1 *= -1;
  }
  if (eyeX2 > 250 || eyeX2 < 230) {
    eyeDir2 *= -1;
  }

  // nose
  fill(220, 180, 170);
  triangle(200, 185, 193, 215, 207, 215);

  // mouth
  stroke(120, 60, 80);
  strokeWeight(2);
  line(185, 230, 215, 230);
  noStroke();

  // name
  fill(40);
  textSize(18);
  text("Julia", width / 2, 470);
}
