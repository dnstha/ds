let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(canvas);

let c = canvas.getContext('2d');

var mouse = {
    x: innerWidth/2,
    y: innerHeight/2
};

var gravity = 1;
var friction = 0.95;

var colors = [
    '#a28089',
    '#e5eaf5',
    '#ff1d58',
    '#400036',
    '#015958',
    '#7A577A',
    '#F2C6C2'
];

addEventListener('mousemove', function(event){
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

addEventListener('resize', function() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init(); 
});

addEventListener('click', function(){
    init();
});

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function Ball(x, y, dx, dy, radius, color){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;

    this.update = function() {
        if (this.y + this.radius + this.dy > canvas.height){
            this.dy = -this.dy * friction;
        } else {
            this.dy += gravity;
        }
        if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius <= 0){
            this.dx = -this.dx * friction;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    };

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.lineWidth = 5; // changes stroke amount
        c.stroke();
        c.fill();
        c.closePath();
    };
}

var ball;
var ballArray;
function init(){
    ballArray = [];
    for (var i = 0; i < 100; i++) {
        var radius = randomInt(10, 60);
        var x = randomInt(radius, canvas.width - radius);
        var y = randomInt(0, canvas.height-radius);
        var dx = randomInt(-4, 4)
        var dy = randomInt(-2, 6);
        var color = randomColor(colors);
        ballArray.push(new Ball(x, y, dx, dy, radius, color));
    }
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = 0; i<ballArray.length; i++) {
        ballArray[i].update();
    }

}

init();
animate();
