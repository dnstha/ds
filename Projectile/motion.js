let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(canvas);

let c = canvas.getContext('2d');

const lightColors = [
    '#cfffee',
    '#ff1d58',
    '#F2C6C2',
    '#FF81D0',
    '#DAFDBA',
    '#9AEBA3',
    '#45C4B0',
    '#FACFCE',
    '#F1FACF'
];

const darkColors = [
    '#a28089',
    '#015958',
    '#7A577A',
    '#400036'
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
const groundLevel = 80;
let x, y, radius, color;
let particles = [];
let miniParticles = [];

function Particle(x, y, radius, color){
    this.x = x;
    this.y = y;
    this.dx = Math.random() * 20 + 20;
    this.dy = - Math.random() * 20 - 20;
    this.radius = radius;
    this.color = color;
    this.mass = Math.ceil(this.radius/2 + 4);

    this.update = () => { //modern method of writing a function
        if(this.x + this.radius + this.dx > canvas.width || this.x + this.dx < this.radius) {
            this.dx *= -0.8;
            this.shatter();

        }
        if(this.y + this.radius + this.dy > canvas.height - groundLevel || this.y + this.dy< this.radius) {
            this.dy *= -0.8; // Multiplied by the restitution cofficient
            this.shatter();
        }else{
            this.dy += gravity;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.mass = Math.ceil(this.radius/2 + 4);
        this.draw();
    };

    this.draw = () => {
        // c.save();
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        // c.shadowColor = this.color;
        // c.shadowBlur = 5;
        c.globalAlpha = this.opacity;
        c.fill();
        c.closePath();
        // c.restore();
    };

    this.shatter = function () {
        this.radius *= 0.75;

        for (let i = 0; i < this.mass; i++) {
            miniParticles.push(new MiniParticle(this.x, this.y, Math.random() * 3, this.color));
        }
    }
}

function MiniParticle(x, y, radius, color) {
    Particle.call(this, x, y, radius, color);
    this.dx = (Math.random() - 0.5) * 4;
    this.dy = (Math.random() - 0.5) * 4;
    this.ttl = 150;
    this.opacity = 1;
    this.update = () => { //modern method of writing a function
        if(this.x + this.radius + this.dx > canvas.width || this.x + this.dx < this.radius) {
            this.dx *= -0.9;
        }
        if(this.y + this.radius + this.dy > canvas.height - groundLevel || this.y + this.dy< this.radius) {
            this.dy *= -0.9; // Multiplied by the restitution cofficient
        }else{
            this.dy += gravity;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.ttl -= 1; // time to live
        this.opacity -= 1/this.ttl;
        this.draw();
    };

    this.draw = () => {
        c.save();
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        // c.shadowColor = this.color;
        // c.shadowBlur = 5; // glow effect => Amazing but makes the animation slow
        c.globalAlpha = this.opacity;
        c.fill();
        c.closePath();
        c.restore();
    };
}

function init(){
    // miniParticles = [];
    radius = Math.random() * 30 + 10;
    x = randomInt(1, radius) + radius;
    y = canvas.height - radius - groundLevel;
    particles.push(new Particle(x, y, radius, randomColor(lightColors)));
}
function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    c.fillStyle = "#182028";
    c.fillRect(0, canvas.height - groundLevel, canvas.width, groundLevel);
    c.fillStyle = lightColors[0];
    c.font = 'normal 24px Georgia';
    c.fillText("Click on the screen to spawn the particle!",  canvas.width * 0.2, canvas.height - 30);
    particles.forEach((p, i) => {
        p.update();
        if(p.radius < 3) {
            particles.splice(i, 1);
        }
    });
    miniParticles.forEach((miniParticle, i) => {
        miniParticle.update();
        if(miniParticle.opacity < 0.05) {
            miniParticles.splice(i, 1);
        }
    });
}
init();
animate();