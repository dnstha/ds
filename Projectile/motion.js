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
let x, y, radius, color;
let particles = [];
let miniParticles = [];

function Particle(x, y, radius, color){
    this.x = x;
    this.y = y;
    this.dx = Math.random() * 15 + 20;
    this.dy = - Math.random() * 15 - 20;
    this.radius = radius;
    this.color = color;

    this.update = () => { //modern method of writing a function
        if(this.x + this.radius + this.dx > canvas.width || this.x + this.dx < this.radius) {
            this.dx *= -0.8;
            this.shatter();

        }
        if(this.y + this.radius + this.dy > canvas.height || this.y + this.dy< this.radius) {
            this.dy *= -0.8; // Multiplied by the restitution cofficient
            this.shatter();
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

    this.shatter = function () {
        this.radius *= 0.7;
        for (let i = 0; i < 10; i++) {
            miniParticles.push(new MiniParticle(this.x, this.y, 2, this.color));
        }
    }
}

function MiniParticle(x, y, radius, color) {
    Particle.call(this, x, y, radius, color);
    this.dx = (Math.random() - 0.5) * 2;
    this.dy = (Math.random() - 0.5) * 2;
    this.ttl = 200;
    this.update = () => { //modern method of writing a function
        if(this.x + this.radius + this.dx > canvas.width || this.x + this.dx < this.radius) {
            this.dx *= -0.8;
        }
        if(this.y + this.radius + this.dy > canvas.height || this.y + this.dy< this.radius) {
            this.dy *= -0.8; // Multiplied by the restitution cofficient
        }else{
            this.dy += gravity;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.ttl -= 1;
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


function init(){
    // miniParticles = [];
    radius = Math.random() * 20 + 10;
    x = randomInt(1, radius) + radius;
    y = canvas.height - radius - 1;
    particles.push(new Particle(x, y, radius, randomColor(colors)));
}
function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    particles.forEach((p, i) => {
        p.update();
        if(p.radius < 2) {
            particles.splice(i, 1);
        }
    });
    miniParticles.forEach((miniParticle, i) => {
        miniParticle.update();
        if(miniParticle.ttl == 0) {
            miniParticles.splice(i, 1);
        }
    });
}
init();
animate();