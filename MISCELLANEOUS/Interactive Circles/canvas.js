let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');
/*
c.fillStyle = 'rgba(13,500,200,0.4)';
c.fillRect(10,10,80,50);

c.beginPath();
c.moveTo(150,20);
c.lineTo(200,60);
c.lineTo(500,10);
c.lineTo(150,20);
c.strokeStyle = 'red';
c.stroke();

for (var i = 0; i<10; i++){
var x = Math.random()*window.innerWidth;
var y = Math.random()*window.innerHeight;
var r = Math.random()*100;
c.beginPath();
c.arc(x,y,r,0,Math.PI*2,false);
c.strokeStyle = 'aqua';
c.stroke();
}
*/

var mouse = {
    x: undefined,
    y: undefined
}

var maxRadius = 40;
var minRadius = 3;

var colorArray = [
    'red',
    'black',
    'blue',
    'lavender',
    'pink',
    'green',
    'white'
];

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

window.addEventListener('mousemove', 
    function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
}); //for tracking the mouse or touch movements

function Circle(x, y, dx, dy, radius) {
    //starting the name of the function with a captial letter indicates creating an JS object
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.fillStyle = this.color; // color that is filled
        c.fill(); //fills the inner circle
    }

    this.update = function() {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx; // To make the canvas bounce off when it gets to the end
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.dy = -this.dy;
        }

        this.y += this.dy;
        this.x += this.dx;

        //interactivity
        if (mouse.x - this.x < 40 && mouse.x - this.x > -40 && mouse.y - this.y < 40 && mouse.y - this.y > -40) {
            if(this.radius < maxRadius){
                this.radius += 1;
        }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }
        
        this.draw();
    }
}

/*
var x = innerWidth * Math.random();
var y = innerHeight * Math.random();
var dx = (Math.random() - 0.5) * 8; // horizontal velocity of the circle
var dy = (Math.random() - 0.5) * 8; // vertical velocity of the circle
var radius = 60;
*/

var circleArray = []; //creating an array to store the circles

function init() {
    circleArray = [];

    for(var i = 0; i < 800; i++) {
        var radius = Math.random() * 3 + 1;
        var x = Math.random() * (innerWidth - 2*radius) + radius;
        var y = Math.random() * (innerHeight - 2*radius) + radius;
        var dx = (Math.random() - 0.5);
        var dy = (Math.random() - 0.5);
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
}

function animation() {
    requestAnimationFrame(animation);
    c.clearRect(0,0,innerWidth,innerHeight); // Clearing the canvas so the circles don't overlap

    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}

init();
animation();