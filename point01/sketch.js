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
