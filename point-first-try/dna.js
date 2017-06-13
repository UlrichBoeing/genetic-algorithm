
// DNA-Constructor (makes a random DNA)
function DNA(numPoints) {
  // The genetic data
  this.genes = [];
  this.fitness = 0;
  this.prob = 0;
  this.picked = 0;

  for (var i = 0; i < numPoints; i++) {
    var x = canvasMargin + Math.floor(random(canvasSize - 2 * canvasMargin));
    var y = canvasMargin + Math.floor(random(canvasSize - 2 * canvasMargin));
    var p = createVector(x, y);
    this.genes[i] = p;
  }
}

DNA.prototype.show = function(type) {
  switch (type) {
    case "target":
      stroke(230, 0, 0);
      fill(255, 20);
      break;
    default:
      this.calcFitness(target);
      // var color01 = map(this.fitness, 0.5, 0.8, 0, 250);
      var m = map(this.fitness, 0, 1, 100, 5);
      stroke(255,m);
      noFill();
  }

  ellipse(this.genes[0].x, this.genes[0].y, 6, 6);
  // translate(canvasMargin, canvasMargin);
  // beginShape();
  // // l is index of last element in genes-array
  // var l = this.genes.length - 1;
  // curveVertex(this.genes[l].x, this.genes[l].y);
  // for (var i = 0; i <= l; i++) {
  //   curveVertex(this.genes[i].x, this.genes[i].y);
  // }
  // curveVertex(this.genes[0].x, this.genes[0].y);
  // curveVertex(this.genes[1].x, this.genes[1].y);
  // endShape();
  //

  // // show vertex numbers
  // fill(220, 0, 0);
  // noStroke();
  // textSize(14);
  // // textStyle(BOLD);
  // for (var i = 0; i <= l; i++) {
  //   text((i+1).toString(), this.genes[i].x, this.genes[i].y);
  // }
}

DNA.prototype.showFitness = function() {
  fill(220, 200, 0);
  noStroke();
  textSize(14);
  roundFitness = Math.round(this.fitness * 100) / 100;
  roundProb = Math.round(this.prob * 100) / 100;
  text(roundFitness.toString(), this.genes[0].x + 25, this.genes[0].y)
  text(roundProb.toString(), this.genes[0].x + 25, this.genes[0].y + 25)
}

DNA.prototype.calcFitness = function(target) {
  var totalDistance = 0;

  // sum up  distance between all corresponding points
  for (var i = 0; i < this.genes.length; i++) {
    var distance = p5.Vector.sub(target.genes[i], this.genes[i]);
    totalDistance += distance.mag();

    // // draw line between corresponding vertex points
    // stroke(200, 150, 0);
    // var v = this.genes[i];
    // line(v.x, v.y, v.x + distance.x, v.y + distance.y);
  }
  // this.fitness = totalDistance * totalDistance ;
  // calculation maximum distance
  var maxSide = canvasSize - 2 * canvasMargin;
  var maxDistance = Math.sqrt(2 * Math.pow(maxSide, 2));

  this.fitness = 1 - (totalDistance / (maxDistance * this.genes.length));
}

DNA.prototype.crossover = function(partner) {
  var child = new DNA(numPoints);
  for (var i = 0; i < this.genes.length; i++) {
    if ((i % 2) == 1)
      child.genes[i] = this.genes[i];
    else {
      child.genes[i] = partner.genes[i];
    }
  }
  // // first version
  // var child = new DNA(numPoints);
  //
  // for (var i = 0; i < this.genes.length; i++) {
  //   var distance = p5.Vector.sub(partner.genes[i], this.genes[i]);
  //   distance.mult(0.5);
  //   child.genes[i] = p5.Vector.add(this.genes[i], distance);
  // }
  return child;
}

DNA.prototype.mutate = function(mutationRate) {
  for (var i = 0; i < this.genes.length; i++) {
    if (mutationRate > random(1)) {
      var x = Math.floor(random(3));
      var y = Math.floor(random(3));
      this.genes[i].x += -2 + x;
      this.genes[i].y += -2 + y;
    }
  }
}
