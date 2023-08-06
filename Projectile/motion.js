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
    '#F2C6C2',
    '#FF81D0',
    '#DAFDBA',
    '#9AEBA3',
    '#45C4B0'
];

addEventListener('resize', function() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init(); 
});

addEventListener('click', () => {
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

const gravity = 1;

function Particle(x, y, radius, dx, dy){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = randomColor(colors);

    this.update = () => { //modern method of writing a function
        if(this.x + this.radius + this.dx > canvas.width || this.x + this.dx < this.radius) {
            this.dx *= -0.1;
            if(this.radius > 0.001) {
                this.radius *= 0.2;
            }
        }
        if(this.y + this.radius + this.dy > canvas.height || this.y + this.dy< this.radius) {
            this.dy *= -0.8;
        }else{
            this.dy += gravity;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    };

    this.draw = () => {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.strokeStyle = 'black';
        c.stroke();
        c.closePath();
    };
}

let x, y, radius, color, dx, dy;
let particles = [];

function init(){
    radius = Math.random() * 20 + 10;
    x = randomInt(1, radius) + radius;
    y = canvas.height - radius - 1;
    dx = Math.random() * 15 + 20;
    dy = - Math.random() * 15 - 20;
    particles.push(new Particle(x, y, radius, dx, dy));
}
function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    particles.forEach((p, i) => {
        if(p.radius > 1) {
            p.update();
        }else{
            particles.splice(i, 1);
        }
        // if(p.radius < 1) {
        //     //remove it from array
        // }
    });
}
init();
animate();