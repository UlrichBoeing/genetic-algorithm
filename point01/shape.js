Shape.prototype.move = function() {
    var fitness = this.sensor01.calcFitness(this.pos.x, this.pos.y);
    // fitness = 0.99999;
    if (fitness < 0.99)
        console.log(fitness);
    var deviation = map(fitness, 0, 1, 50, 0);
//    console.log(Math.floor(deviation*100)/100);

    var bestFitness = -1;
    var bestPoint = createVector(0,0);
    for (var i = 0; i < 20; i++) {
        var x = randomGaussian(this.pos.x, deviation);
        var y = randomGaussian(this.pos.y, deviation);
        var newFitness = this.sensor01.calcFitness(x, y);
        if (newFitness > bestFitness) {
            bestFitness = newFitness;
            bestPoint = createVector(x, y);
        }
    }
    // fill(250, 20);   
    // ellipse(bestPoint.x, bestPoint.y, 4, 4);
    stroke(30);
    line(this.pos.x, this.pos.y, bestPoint.x, bestPoint.y)
    this.pos.x = bestPoint.x; 
    this.pos.y = bestPoint.y;

}


Shape.prototype.show = function(){
    fill(0, 0, 255);
    ellipse(this.pos.x, this.pos.y, 4,4);
}

