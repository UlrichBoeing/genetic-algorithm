// Sensoren dürfen sich nicht bewegen, shape bewegt sensor
// erstmal nicht -> Sensoren sollen eine gewichtete fitness-history haben (nicht bei Positions-Sensor)

// holt fitness von sensor 
// berechnet streuung mit fitness
// berechnet x neue Punkte mit gaussianRandom
// sucht den besten aus 
// von von vorne 

// sensor untersucht checkProposal (radius erhöhen)

/* **************************************************************
 Sensor base class 
 ************************************************************** */
function Sensor(path) {
    this.path = path;
    
    // unnormalized fitness
    this.uFitness = [];
    this.fitness = [];
    this.inRange = [];
    this.outRange = [0, 1];
    this.weight = 1;
    this.exponent = 1;

}

Sensor.prototype.calcFitness = function() {
    //  clear arrays
    var proposals = this.path.proposals;
    this.uFitness = new Array(proposals.length);
    this.inRange = [1, 0];

    for (var i = 0; i < proposals.length; i++) {
        var fitness = this.getFitness(proposals[i].x, proposals[i].y);        
        this.uFitness[i] = fitness;
        this.adjustInRange(fitness);
    }
    this.mapFitness();

    // console.log(this.uFitness);
    // console.log(this.fitness);
}

Sensor.prototype.getFitness = function(x, y) {
    return 1;
}

Sensor.prototype.mapFitness = function() {
    this.fitness = new Array(this.uFitness.length);

    for (var i = 0; i < this.uFitness.length; i++) {
        var val = this.uFitness[i]
        // var val = map(val, this.inRange[0], this.inRange[1], 0, 1);
        val = Math.pow(val, this.exponent);
        // val = map(val, 0, 1, this.outRange[0], this.outRange[1]);
        this.fitness[i] = val;
    }
}

Sensor.prototype.adjustInRange = function(fitness) {
    if (fitness < this.inRange[0]) {
        this.inRange[0] = fitness;
    }
    if (fitness > this.inRange[1]) {
        this.inRange[1] = fitness;
    }
}

Sensor.prototype.checkProposal = function(x, y) {
    return true;
}

Sensor.prototype.checkTermination = function() {
    return false;
}

function PositionSensor(path, target) {
    Sensor.call(this, path);
    this.target = target;
    this.name = "PositionSensor";
}
PositionSensor.prototype = Object.create(Sensor.prototype);

PositionSensor.prototype.getFitness = function(x, y) {
    // setter methods for target->maxDistance
    
    // calculate maxDistance;
    var maxDistance = createVector();
    maxDistance.x = 300 + Math.abs(this.target.x - 300);
    maxDistance.y = 300 + Math.abs(this.target.y - 300);

    
    var v = createVector(x, y);
    v.sub(this.target);
    var fitness = 1 - (v.mag() / maxDistance.mag());
    
    return fitness;
}

PositionSensor.prototype.checkTermination = function() {
    var lastPoint = this.path.lastPoint();
    var fitness = this.getFitness(lastPoint.x, lastPoint.y);
    if (fitness > 0.975)
        return true;

    return false;
}

function ImageSensor(path, target) {
    Sensor.call(this, path);
    this.target = target;
    this.name = "ImageSensor";    
}
ImageSensor.prototype = Object.create(Sensor.prototype);

ImageSensor.prototype.getFitness = function(x, y) {
    // calculates fitness based upon brightness
    var max = 255;
    x = floor(x);
    y = floor(y);

    // var pixel = imgTarget.get(x, y);
    // var redChannel = pixel[0];

    var index = (x + y * this.target.height) * 4;
    var altRedChannel = this.target.pixels[index+2];


    // if (redChannel != altRedChannel) {
    //     console.log(redChannel + " " + altRedChannel);
    // }
    this.fitness = (altRedChannel / max);
    // this.fitness = 1 - this.fitness;
    return this.fitness;
}

// Is the new point moving "forward"
function ForwardSensor(path) {
    Sensor.call(this, path);
    this.name = "ForwardSensor";
}
ForwardSensor.prototype = Object.create(Sensor.prototype);

ForwardSensor.prototype.getFitness = function(x, y) {
    var max = 180;
    var angle = this.path.getAngleToPoint(x,y);
    this.fitness = (max - angle) / max;
    return this.fitness;
}

ForwardSensor.prototype.checkProposal= function(x, y) {
    if (this.path.points.length < 2) {
        return true;
    }

    var fitness = this.getFitness(x, y);
    // console.log(fitness);
    if (fitness < 0.4) {
        return false;
    }
    return true;
}


