// 3 standard sensors
// Positionsensor -> is target reached
// ForwardSensor -> is path moving backwards
// ImageSensor -> should part of path be visible


// Constructor 
function Path() {
    this.points = [];
    this.sensors = [];
    this.proposals = [];

    this.maxPoints =100;
    this.running = false;
}

Path.prototype.addSensor = function(sensor) {
    this.sensors.push(sensor);    
}

Path.prototype.make = function(x, y) {
    this.start(x, y);
    while (this.addPoint()) {
        // console.log(this.points.length);
    }
}

Path.prototype.start = function(x, y) {
    this.points = [];
    var point = createVector(x, y);
    this.points.push(point);
    this.running = true;
}

Path.prototype.addPoint = function(v) {

    if (this.checkTermination()) {
        this.running = false;
        return false;
    }

    if (this.createProposals(this.lastPoint())) {
        var point = this.getBestProposal(this.proposals)
        if (point == false) {
            this.running = false;
            return false;
        } else {
        this.points.push(point);
        return true;
        }
    } else {
        this.running = false;
        return false;
    }

}

Path.prototype.lastPoint = function() {
    return this.points[this.points.length -1];
}

// fill in code to terminate the build process
Path.prototype.checkTermination = function() {
    // if max. number of points is exceeded
    if (this.points.length >= this.maxPoints) {
        return true;
    }

    for (var i = 0; i < this.sensors.length; i++) {
        if (this.sensors[i].checkTermination())
            return true;
    }
    // maybe check if new points stay in a spot
    // instead of moving forward

    return false;
}


// fill in code to generate points examined by the fitness-function
// points can be generated with randomGaussian or simply by circling around
Path.prototype.createProposals = function(point) {
    this.proposals = [];

    // this.createGaussianProposal(point);
    this.createCircleProposals(point);

    if (this.proposals.length < 1) {
        logError("No valid proposals generated");
        return false;
    }
    // calculate unnormalized fitness values
    // &&& for all sensors
    for (var i = 0; i < this.sensors.length; i++) {
        // console.log(this.sensors[i].name);
        this.sensors[i].calcFitness();
    }
    return true;
}

// creating different kind of proposals
Path.prototype.createGaussianProposal = function(point) {
    // function parameters
    var numProposals = 30;
    var deviation = 12;

    for (i = 0; i < numProposals; i++) {
        var x = randomGaussian(point.x, deviation);
        var y = randomGaussian(point.y, deviation);
        var v = createVector(x, y);

        if (this.checkProposal(v)) {
            this.proposals.push(createVector(x, y));
        }
    }
}

Path.prototype.createCircleProposals = function(point) {
    var numProposals = 20;
    var radius = 10;

    for (var i = 0; i < numProposals; i++) {
        radius = random(4,20);
        var angle = (i / numProposals) * TWO_PI;
        var x = point.x + cos(angle) * radius;
        var y = point.y + sin(angle) * radius;
        var v = createVector(x, y);

        if (this.checkProposal(v)) {
            this.proposals.push(createVector(x, y));
        }
    }
}


// fill in code to check proposals
Path.prototype.checkProposal = function(v) {
    if ((v.x < 0) || (v.x > width) || (v.y < 0 ) || (v.y > height)) {
        // logError("Proposal outside canvas");
        return false;
    } 

    for (var i = 0; i < this.sensors.length; i++) {
        if (!this.sensors[i].checkProposal(v.x, v.y)) {
            return false;
        }
    }
    return true;
}

Path.prototype.getBestProposal = function() {
    bestFitness = -1;
    bestIndex = -1;

    if (this.proposals.length == 1) {
        return this.proposals[0];
    }

    for (var i = 0; i < this.proposals.length; i++) {
        var fitness = this.getFitness(i);
        if (fitness > bestFitness) {
            bestIndex = i;
            bestFitness = fitness;
        }
    }
    if (bestFitness == -1) {
        logError("No best proposal.")
        return false;
    }
    return this.proposals[bestIndex];
}

Path.prototype.getFitness = function(index) {
    var sum = 0;
    var sumWeight = 0;

    for (var i = 0; i < this.sensors.length; i++) {
        sum += this.sensors[i].fitness[index] * this.sensors[i].weight;
        sumWeight += this.sensors[i].weight;
    }
    this.fitness = sum / sumWeight;
    return this.fitness;
}

Path.prototype.getAngleToPoint= function(x, y) {
    // to cut short
    var len = this.points.length;

    // 2 segments -> 3 points are necessary
    // 2 points in the array and one new point (x,y)
    if (len < 2) {
        return -1;
    }
    // vector to new point
    var vNew = createVector(x, y);
    
    // angle between segments lastToNew and secondToLast
    var vLastToNew = p5.Vector.sub(vNew, this.points[len-1]);
    var vSecondToLast = p5.Vector.sub(this.points[len-1], this.points[len-2]);
    var radAngle = vSecondToLast.angleBetween(vLastToNew)

    // returns angles between 0 (forward) and 180 (going back)
    return (radAngle / TWO_PI) * 360;
}

Path.prototype.show = function(){
    noFill();
    stroke(random(220, 255), random(1,100), random(1,10), 20);
    beginShape();
    for (var i = 0; i < this.points.length; i++) {
        curveVertex(this.points[i].x, this.points[i].y);
    }
    endShape();


    // show parameters
    // var size = 9;
    // var aColor = color(palette.bg.levels[0] , palette.bg.levels[1] ,palette.bg.levels[2],90);
    // noStroke();
    // fill(aColor);
    // for (var i = 0; i < this.points.length; i++) {
    //     x = this.points[i].x;
    //     y = this.points[i].y;
    //     red = 255 * this.sensors[0].getFitness(x, y);
    //     blue = 255 * this.sensors[1].getFitness(x, y);
    //     var aColor = color(red, red/3, red/2);
    //     fill(aColor);
    //     ellipse(this.points[i].x, this.points[i].y, size, size);
    // }

    // }
}


function logError(message) {
    console.log("Error: " + message)
}