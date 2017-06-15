// Constructor 
function Path() {
    this.points = [];
    this.sensors = [];

    this.maxPoints = 20;
    this.running = false;
}

Path.prototype.addSensor = function(sensor) {
    this.sensors.push(sensor);    
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

    var lastPoint = this.points[this.points.length -1];
    if (this.createProposals(lastPoint)) {
        var point = this.getBestProposal(this.proposals)
        this.points.push(point);
    }
}

// fill in code to terminate the build process
Path.prototype.checkTermination = function() {
    // if max. number of points is exceeded
    if (this.points.length >= this.maxPoints) {
        return true;
    }

    // maybe check if new points stay in a spot
    // instead of moving forward

    return false;
}


// fill in code to generate points examined by the fitness-function
// points can be generated with randomGaussian or simply by circling around
Path.prototype.createProposals = function(point) {
    // function parameters
    var deviation = 12;
    var numProposals = 20;

    this.proposals = [];
    for (i = 0; i < numProposals; i++) {
        var x = randomGaussian(point.x, deviation);
        var y = randomGaussian(point.y, deviation);
        var v = createVector(x, y);

        if (this.checkProposal(v)) {
            this.proposals.push(createVector(x, y));
        }
    }
    if (this.proposals.length == 0) {
        logError("No valid proposals generated");
        return false;
    }
    return true;
}

// fill in code to check proposals
Path.prototype.checkProposal = function(v) {
    if ((v.x < 0) || (v.x > width) || (v.y < 0 ) || (v.y > height)) {
        logError("Proposal outside canvas");
        return false;
    } 
    return true;
}

Path.prototype.getBestProposal = function() {
    bestFitness = -1;
    bestIndex = -1;
    for (var i = 0; i < this.proposals.length; i++) {
        var fitness = this.getFitness(this.proposals[i]);
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

Path.prototype.getFitness = function(point) {
    var sum = 0;
    for (var i = 0; i < this.sensors.length; i++) {
        sum += this.sensors[i].getFitness(point.x, point.y);
    }
    this.fitness = sum / this.sensors.length;
    return this.fitness;
}

Path.prototype.show = function(){
    // show parameters
    var size = 4;
    var aColor = color(palette.main.levels[0] , palette.main.levels[1] ,palette.main.levels[2],90);

    noStroke();
    fill(aColor);
    for (var i = 0; i < this.points.length; i++) {
        ellipse(this.points[i].x, this.points[i].y, size, size);
    }
}


function logError(message) {
    console.log("Error: " + message)
}