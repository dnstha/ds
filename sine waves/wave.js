let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(canvas);

let c = canvas.getContext('2d');

var colors = [
    '#a28089',
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

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
    let xDist = x2 - x1;
    let yDist = y2 - y1;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}


function Object(x, y, radius, color){
    this.x = x;
    this.y = y;
    this.velocity = {
        x: (Math.random() - 0.5) * 8,
        y: (Math.random() - 0.5) * 8
    };
    this.radius = radius;
    this.color = color;
    this.opacity = 0;
    this.mass = 1;

    this.update = () => { //modern method of writing a function
        this.draw();
    };

    this.draw = () => {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.save();
        c.globalAlpha = this.opacity; // opacity 
        c.fillStyle = this.color;
        c.fill();
        c.restore();
        c.strokeStyle = 'black';
        c.stroke();
        c.closePath();
    };
}

for (let i = 0; i < canvas.width; i++) {
    c.lineTo(i, canvas.height / 2 + Math.sin(i * 0.04) * 100);
}

c.stroke();

// function init(){

// }
// function animate(){
//     requestAnimationFrame(animate);
//     c.clearRect(0, 0, innerWidth, innerHeight);

// }
// init();
// animate();