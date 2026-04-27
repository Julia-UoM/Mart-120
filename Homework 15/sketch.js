let lights = [];
let stars = [];

function setup() {
  let canvas = createCanvas(700, 450);
  canvas.parent("canvas-container");

  for (let i = 0; i < 45; i++) {
    lights.push({
      x: random(width),
      y: random(80, height - 80),
      size: random(8, 35),
      speed: random(0.5, 2.5)
    });
  }

  for (let i = 0; i < 90; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(1, 3)
    });
  }
}

function draw() {
  let dreamMode = mouseIsPressed;

  if (dreamMode) {
    background(12, 10, 35);
  } else {
    background(190, 215, 230);
  }

  drawOutsideWorld(dreamMode);
  drawTrainWindow(dreamMode);
  drawReflection(dreamMode);
  drawText(dreamMode);
}

function drawOutsideWorld(dreamMode) {
  if (dreamMode) {
    noStroke();
    fill(220, 210, 255, 120);

    for (let i = 0; i < stars.length; i++) {
      ellipse(stars[i].x, stars[i].y, stars[i].size);
    }

    fill(180, 150, 255, 60);
    ellipse(mouseX, mouseY, 90);

    fill(230, 220, 255, 130);
    ellipse(mouseX, mouseY, 35);
  }

  for (let i = 0; i < lights.length; i++) {
    let l = lights[i];

    l.x += l.speed;

    if (l.x > width + 40) {
      l.x = -40;
      l.y = random(80, height - 80);
      l.size = random(8, 35);
      l.speed = random(0.5, 2.5);
    }

    if (dreamMode) {
      fill(170, 120, 255, 130);
      stroke(170, 120, 255, 60);
    } else {
      fill(255, 210, 160, 110);
      stroke(255, 230, 180, 50);
    }

    noStroke();
    ellipse(l.x, l.y, l.size);

    strokeWeight(2);
    if (dreamMode) {
      stroke(170, 120, 255, 60);
    } else {
      stroke(255, 230, 180, 50);
    }

    line(l.x - 45, l.y, l.x, l.y);
  }
}

function drawTrainWindow(dreamMode) {
  noStroke();

  if (dreamMode) {
    fill(25, 22, 45);
  } else {
    fill(230, 225, 220);
  }

  rect(0, 0, width, height);

  if (dreamMode) {
    fill(12, 10, 35);
  } else {
    fill(190, 215, 230);
  }

  rect(70, 55, width - 140, height - 130, 18);

  strokeWeight(8);

  if (dreamMode) {
    stroke(80, 65, 110);
  } else {
    stroke(120, 120, 130);
  }

  noFill();
  rect(70, 55, width - 140, height - 130, 18);

  strokeWeight(4);
  line(width / 2, 55, width / 2, height - 75);
}

function drawReflection(dreamMode) {
  strokeWeight(2);

  if (dreamMode) {
    stroke(255, 255, 255, 35);
  } else {
    stroke(255, 255, 255, 75);
  }

  line(140, 80, 260, height - 95);
  line(210, 80, 330, height - 95);
  line(450, 80, 560, height - 95);
}

function drawText(dreamMode) {
  noStroke();
  textSize(14);
  textAlign(LEFT);

  if (dreamMode) {
    fill(225, 215, 255);
    text("somewhere between sleep and arrival", 25, height - 25);
  } else {
    fill(60, 65, 75);
    text("press and hold to drift", 25, height - 25);
  }
}
