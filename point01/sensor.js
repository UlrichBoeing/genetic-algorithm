// Sensoren dürfen sich nicht bewegen, shape bewegt sensor
// erstmal nicht -> Sensoren sollen eine gewichtete fitness-history haben (nicht bei Positions-Sensor)

// holt fitness von sensor 
// berechnet streuung mit fitness
// berechnet x neue Punkte mit gaussianRandom
// sucht den besten aus 
// von von vorne 

function PositionSensor(target) {
    this.target = target;
    this.fitness = -1;
}

PositionSensor.prototype.createArrays = function(numProposals) {
    
    
}

PositionSensor.prototype.getFitness = function(x, y) {
    // setter methods for target->maxDistance, numProposals->size of arrays
    
    // calculate maxDistance;
    var maxDistance = createVector();
    maxDistance.x = 300 + Math.abs(this.target.x - 300);
    maxDistance.y = 300 + Math.abs(this.target.y - 300);

    
    var v = createVector(x, y);
    v.sub(this.target);
    this.fitness = 1 - (v.mag() / maxDistance.mag());
    return Math.pow(this.fitness, 1);
}

function ImageSensor(target) {
    this.target = target;
    this.fitness = -1;
}

ImageSensor.prototype.getFitness = function(x, y) {
    // calculates fitness based upon brightness
    var max = 255;
    x = floor(x);
    y = floor(y);

    // var pixel = imgTarget.get(x, y);
    // var redChannel = pixel[0];

    var index = (x + y * imgTarget.height) * 4;
    var altRedChannel = imgTarget.pixels[index];


    // if (redChannel != altRedChannel) {
    //     console.log(redChannel + " " + altRedChannel);
    // }
    this.fitness = altRedChannel / max;
    // this.fitness = 1 - this.fitness;
    return this.fitness;
}

// Is the new point moving "forward"
function ForwardSensor(path) {
    this.path = path;
    this.fitness = -1;
}

ForwardSensor.prototype.getFitness = function(x, y) {
    var max = 180;
    var angle = this.path.getAngleToPoint(x,y);
    this.fitness = (max - angle) / max;
    return Math.pow(this.fitness,0.04);
}


