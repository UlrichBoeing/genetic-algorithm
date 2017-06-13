var target;
var shape01;
var canvas;
var palette;
var watch01;

function setup() {
    canvas = createCanvas(600, 600);
    canvas.parent('sketch');
    watch01 = document.getElementById('watch01');
    watch01.innerHTML = "Wert01";

    palette = {
        bg: color('#051126'),
        highBg: color('#010102'),
        main: color('#007f97'),
        complement: color('#7c587f'),
        fg: color('#CCE5E5')
    };


    background(palette.highBg);

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
    watch01.innerHTML = shape01.count;
    shape01.show();

    // var bgColor = fitness * 255;
     
    // target zeichnen
    fill(palette.fg);
    ellipse(target.x, target.y, 8, 8);
    // shape01.show();
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
