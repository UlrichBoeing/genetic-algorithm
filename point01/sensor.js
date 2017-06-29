// Sensoren dürfen sich nicht bewegen, shape bewegt sensor
// erstmal nicht -> Sensoren sollen eine gewichtete fitness-history haben (nicht bei Positions-Sensor)

// holt fitness von sensor 
// berechnet streuung mit fitness
// berechnet x neue Punkte mit gaussianRandom
// sucht den besten aus 
// von von vorne 

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

    console.log(this.uFitness);
    console.log(this.fitness);
}

Sensor.prototype.mapFitness = function() {
    this.fitness = new Array(this.uFitness.length);

    for (var i = 0; i < this.uFitness.length; i++) {
        var val = map(this.uFitness[i], this.inRange[0], this.inRange[1], 0, 1);
        val = Math.pow(val, this.exponent);
        this.fitness[i] = map(val, 0, 1, this.outRange[0], this.outRange[1]);
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


function PositionSensor(path, target) {
    Sensor.call(this, path);
    this.target = target;
    this.name = "PositionSensor";
}
PositionSensor.prototype = Object.create(Sensor.prototype);

PositionSensor.prototype.createArrays = function(numProposals) {
    
    
}

// PositionSensor.prototype.calcFitness = function() {
//     var proposals = this.path.proposals;
//     this.uFitness = new Array(proposals.length);
//     this.inRange = [1, 0];


//     // calculate maxDistance;
//     var maxDistance = createVector();
//     maxDistance.x = 300 + Math.abs(this.target.x - 300);
//     maxDistance.y = 300 + Math.abs(this.target.y - 300);

//     for (var i = 0; i < proposals.length; i++) {
//         var v = proposals[i];
//         v = v.copy();
//         v.sub(this.target);
//         var fitness = 1 - (v.mag() / maxDistance.mag())
//         this.uFitness[i] = fitness;
//         this.adjustInRange(fitness);
//     }
//     this.mapFitness();
// }

PositionSensor.prototype.getFitness = function(x, y) {
    // setter methods for target->maxDistance
    
    // calculate maxDistance;
    var maxDistance = createVector();
    maxDistance.x = 300 + Math.abs(this.target.x - 300);
    maxDistance.y = 300 + Math.abs(this.target.y - 300);

    
    var v = createVector(x, y);
    v.sub(this.target);
    this.fitness = 1 - (v.mag() / maxDistance.mag());
    return this.fitness;
}

function ImageSensor(path, target) {
    Sensor.call(this, path);
    this.target = target;
    this.name = "ImageSensor";    
}
ImageSensor.prototype = Object.create(Sensor.prototype);

// ImageSensor.prototype.calcFitness = function() {
//     var proposals = this.path.proposals;
//     this.uFitness = new Array(proposals.length);
//     this.inRange = [1, 0];

//     var max = 255;
//      for (var i = 0; i < proposals.length; i++) {
//         var x = floor(proposals[i].x);
//         var y = floor(proposals[i].y);

//         var index = (x + y * this.target.height) * 4;
//         var altRedChannel = this.target.pixels[index];
//         var fitness = altRedChannel / max;
//         this.uFitness[i] = fitness;
//         this.adjustInRange(fitness);
//     }
//     this.mapFitness();
// }  

ImageSensor.prototype.getFitness = function(x, y) {
    // calculates fitness based upon brightness
    var max = 255;
    x = floor(x);
    y = floor(y);

    // var pixel = imgTarget.get(x, y);
    // var redChannel = pixel[0];

    var index = (x + y * this.target.height) * 4;
    var altRedChannel = this.target.pixels[index];


    // if (redChannel != altRedChannel) {
    //     console.log(redChannel + " " + altRedChannel);
    // }
    this.fitness = altRedChannel / max;
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
    return Math.pow(this.fitness, 0.04);
}


