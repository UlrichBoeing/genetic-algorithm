var posTarget, imgTarget;

var path01;
var canvas;
var palette;
var watch01;

function preload() {
    imgTarget = loadImage("images/map01.jpg");
}

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

    // Test: for better performance
    imgTarget.loadPixels();
    // frameRate(1);

    background(palette.highBg);
    noStroke();

    posTarget = createVector(307, 335);
    path01 = new Path();
    path01.addSensor(new PositionSensor(posTarget));
    path01.addSensor(new ImageSensor(imgTarget));
    path01.addSensor(new ForwardSensor(path01));
    
}

function draw() {
    imgTarget.loadPixels();
    background(palette.highBg);
    image(imgTarget, 0, 0);
    // watch01.innerHTML = path01.points.length;
    if (path01.running) {
        for (var i = 1; i < 4; i++)
            path01.addPoint();
    } else {

    }
    path01.show();

 
    // posTarget zeichnen
    fill(palette.bg);
    ellipse(posTarget.x, posTarget.y, 8, 8);

    imgTarget.updatePixels();
}

function mousePressed() {
    // path01 = new Path();
    // path01.addSensor(new PositionSensor(posTarget));
    path01.start(mouseX, mouseY);
    
    // path01.show();

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
