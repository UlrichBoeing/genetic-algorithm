// Sensoren dürfen sich nicht bewegen, shape bewegt sensor
// erstmal nicht !Sensoren sollen eine gewichtete fitness-history haben (nicht bei Positions-Sensor)

// holt fitness von sensor 
// berechnet streuung mit fitness
// berechnet x neue Punkte mit gaussianRandom
// sucht den besten aus 
// von von vorne 

// Sensor kann neue Punkte vorschlagen???


function Sensor(target) {
    this.fitness = -1;
    this.target = target;
}

Sensor.prototype.calcFitness = function(x, y) {
    // calculate maxDistance;
    var maxDistance = createVector();
    maxDistance.x = 300 + Math.abs(this.target.x - 300);
    maxDistance.y = 300 + Math.abs(this.target.y - 300);

    
    var v = createVector(x, y);
    v.sub(target);
    this.fitness = 1 - (v.mag() / maxDistance.mag());
    return this.fitness;
}

function Shape(x, y) {
    this.pos = createVector(x, y);
    this.sensor01 = new Sensor(target);

}