function Shape(x, y) {
    this.pos = createVector(x, y);
    this.sensors = [];
    this.count = 0;
}

Shape.prototype.addSensor = function(sensor) {
    this.sensors.push(sensor);
}

Shape.prototype.move = function() {
    if (this.count > 30)
        return;
    var fitness = this.calcFitness(this.pos.x, this.pos.y);
    // fitness = 0.99999;
    if (fitness < 0.99) {
        this.count++;
        console.log(fitness);
    }
    var deviation = map(fitness, 0, 1, 50, 0);
//    console.log(Math.floor(deviation*100)/100);
    deviation = 10;

    var bestFitness = -1;
    var bestPoint = createVector(0,0);
    for (var i = 0; i < 20; i++) {
        var x = randomGaussian(this.pos.x, deviation);
        var y = randomGaussian(this.pos.y, deviation);
        var newFitness = this.calcFitness(x, y);
        if (newFitness > bestFitness) {
            bestFitness = newFitness;
            bestPoint = createVector(x, y);
        }
    }
    // fill(, 20);   
    // ellipse(bestPoint.x, bestPoint.y, 4, 4);
    stroke(palette.complement);
    line(this.pos.x, this.pos.y, bestPoint.x, bestPoint.y)
    this.pos.x = bestPoint.x; 
    this.pos.y = bestPoint.y;



}

Shape.prototype.calcFitness = function(x, y) {
    var sum = 0;
    for (var i = 0; i < this.sensors.length; i++) {
        sum += this.sensors[i].calcFitness(x, y);
    }
    this.fitness = sum / this.sensors.length;
    return this.fitness;
}

Shape.prototype.show = function(){
    noStroke();
    var aColor = color(palette.main.levels[0] , palette.main.levels[1] ,palette.main.levels[2],90);
    fill(aColor);
    ellipse(this.pos.x, this.pos.y, 7, 7);
}

