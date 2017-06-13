var canvas;
var pInfo;

// ideas: image-map to control length of lines

var aPopulation;
var target;

var canvasSize = 700;
var canvasMargin = 100;
var numPoints = 1;

var isDrawing = true;

function setup() {
  canvas = createCanvas(canvasSize, canvasSize);
  canvas.parent('sketch');
  pInfo = document.getElementById("info");


  background(0);
  fill(10);
  stroke(32);
  rect(canvasMargin, canvasMargin, canvasSize - 2*canvasMargin, canvasSize - 2*canvasMargin);

  target = new DNA(numPoints);

  aPopulation = new Population(1000);
  aPopulation.calcFitness();
  aPopulation.calcProb();
  aPopulation.show();
  target.show("target");

  frameRate(3);
}

function draw() {
  pInfo.innerHTML = aPopulation.population[0].fitness.toString();
  background(10);
  stroke(0);
  fill(0);
  rect(canvasMargin, canvasMargin, canvasSize - 2*canvasMargin, canvasSize - 2*canvasMargin);
  aPopulation.calcFitness();
  aPopulation.calcProb();
  aPopulation.generate();
  aPopulation.show();
  target.show("target");
}

function keyPressed() {
  if (keyCode = 32) {
    if (isDrawing) {
      noLoop();
    }
    else {
      loop();
    }
    isDrawing = !isDrawing;
  }
}
