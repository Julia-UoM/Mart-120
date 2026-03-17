function setup() {
  createCanvas(400, 500);
  background(220, 230, 255);
}

function draw() {
  background(220, 230, 255);

  // title
  fill(0);
  textSize(20);
  text("Self Portrait", 140, 30);

  // hair (base)
  fill(80, 50, 30);
  ellipse(200, 170, 180, 200);

  // hair
  rect(130, 110, 140, 40);

  // face
  fill(245, 210, 185);
  ellipse(200, 190, 140, 180);

  // eyes
  fill(255);
  ellipse(170, 170, 25, 15);
  ellipse(230, 170, 25, 15);

  fill(0);
  ellipse(170, 170, 8, 8);
  ellipse(230, 170, 8, 8);

  // nose
  line(200, 180, 190, 210);
  line(190, 210, 205, 210);

  // mouth
  line(175, 235, 225, 235);

  // ears
  fill(245, 210, 185);
  ellipse(135, 195, 20, 35);
  ellipse(265, 195, 20, 35);

  // neck
  rect(180, 255, 40, 40);

  // shirt (black)
  fill(0);
  rect(140, 280, 120, 140);

  // shoulders
  triangle(140, 280, 260, 280, 200, 350);

  // arms
  strokeWeight(2);
  line(140, 300, 100, 390);
  line(260, 300, 300, 390);

  // hands 
  strokeWeight(6);
  point(100, 390);
  point(300, 390);

  // name
  noStroke();
  fill(0);
  textSize(16);
  text("Julia Hansson", 140, 470);
}