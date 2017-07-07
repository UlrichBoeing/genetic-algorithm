var posTarget, imgTarget, imgDisplay;

var path01;
var canvas;
var palette;
var watch01;
var slider;

function preload() {
    imgTarget = loadImage("images/map_eiffel.jpg");
    imgDisplay = loadImage("images/map_eiffel.jpg");
}

function setup() {
    canvas = createCanvas(800, 800);
    canvas.parent('sketch');
    watch01 = document.getElementById('watch01');
    watch01.innerHTML = "Wert01";
    slider = document.getElementById('range01');
    slider.max = 1000;


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

    posTarget = createVector(310, 320);
    path01 = new Path();
    var ps = new PositionSensor(path01, posTarget);
    ps.weight = 1.5;
    path01.addSensor(ps);
    
    var is = new ImageSensor(path01, imgTarget);
    is.weight = 1;
    path01.addSensor(is);

    var fs = new ForwardSensor(path01);
    fs.weight = 0.3;
    path01.addSensor(fs);

    // frameRate(2);
    background(palette.highBg);
    // image(imgDisplay, 0, 0);
    
}

function draw() {
    // if (frameCount == 1000) {
    //     noLoop();
    // }
    // console.log(slider.value);
    // path01.sensors[1].exponent = Math.floor(slider.value / 10);
    // imgTarget.loadPixels();
    // watch01.innerHTML = path01.points.length;
    var x = random(width);
    var y = random(height);

    path01.make(x, y);
    path01.show();

    
    // // posTarget zeichnen
    // fill(palette.bg);
    // ellipse(posTarget.x, posTarget.y, 8, 8);

    // imgTarget.updatePixels();
}

function mousePressed() {
    // path01 = new Path();
    // path01.addSensor(new PositionSensor(posTarget));

    if (!(mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height)) {
        path01.sensors[0].weight = 1;
        path01.make(mouseX, mouseY);
        // Show starting point in panel
        var msg = "(" + mouseX + ", " + mouseY + ")";
        watch01.innerHTML = msg;
    }

}

function keyPressed() {
    // Restart from last point
    if (keyCode = 'r') {
        var x = path01.points[0].x;
        var y = path01.points[0].y;
        path01.start(x, y);
    }
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



