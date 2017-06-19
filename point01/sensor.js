// Sensoren dürfen sich nicht bewegen, shape bewegt sensor
// erstmal nicht -> Sensoren sollen eine gewichtete fitness-history haben (nicht bei Positions-Sensor)

// holt fitness von sensor 
// berechnet streuung mit fitness
// berechnet x neue Punkte mit gaussianRandom
// sucht den besten aus 
// von von vorne 

// Sensor kann neue Punkte vorschlagen???

function PositionSensor(target) {
    this.target = target;
    this.fitness = -1;
}

PositionSensor.prototype.getFitness = function(x, y) {
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

    var pixel = get(x, y);
    var redChannel = pixel[0];
    this.fitness = redChannel / max;
    
    return Math.pow(this.fitness, 1);
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


