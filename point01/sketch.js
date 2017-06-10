var target;
var shape01;

function setup() {
    createCanvas(600, 600);
    background(51);

    target = createVector(300, 300);
    shape01 = new Shape(300, 300);

    noStroke();
}

function draw() {
    // var fitness = sensor01.calcFitness(mouseX, mouseY);

    // var deviation = map(fitness, 0, 1, 0, 35);
    // fill(250, 20);
    // var x = randomGaussian(mouseX, deviation);
    // var y = randomGaussian(mouseY, deviation);
    // ellipse(x, y, 4, 4);

    shape01.move();
    shape01.show();

    // var bgColor = fitness * 255;
     
    // target zeichnen
    fill(280, 0, 0);
    ellipse(target.x, target.y, 8, 8);
    shape01.show();
}

function mousePressed() {
    shape01 = new Shape(mouseX, mouseY);
    shape01.show();

}




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


// class Shape {
//     constructor(x, y) {
//         this.sensor = new Sensor(x, y);
//     }
// }













// function setup() {
//     createCanvas(600, 600);
    
//     background(240);
//     stroke(180, 0, 0);
//     ellipse(300, 300, 350 ,350);
//     ellipse(300, 300, 250  ,250); 
//     ellipse(300, 300, 100 ,100);  
//     noStroke();
// }

// function draw() {
//     fill(180, 0, 0);
//     ellipse(300, 300, 4, 4);

//     var x = randomGaussian(300, 50);
//     var y = randomGaussian(300, 50);
//     fill(51, 30);
//     ellipse(x, y, 8, 8); 
// }
