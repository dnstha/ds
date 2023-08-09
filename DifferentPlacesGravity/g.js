let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(canvas);

let c = canvas.getContext('2d');

addEventListener('click', () => {
    init();
});


let gravity = 1/6;
const groundLevel = canvas.height * 0.1;
let x, y, radius, color;
let particles = [];
let miniParticles = [];

function Particle(x, y, radius, color){
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
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
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.globalAlpha = this.opacity;
        c.fill();
        c.closePath();
    };

    this.shatter = function () {
        this.radius *= 0.8;

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
            this.dx *= -0.95;
        }
        if(this.y + this.radius + this.dy > canvas.height - groundLevel || this.y + this.dy< this.radius) {
            this.dy *= -0.95; // Multiplied by the restitution cofficient
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
        c.globalAlpha = this.opacity;
        c.fill();
        c.closePath();
        c.restore();
    };
}

function init(){
    // miniParticles = [];
    radius = Math.random() * 30 + 10;
    x = canvas.width * 0.5;
    y = canvas.height * 0.1;
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