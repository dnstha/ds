let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(canvas);

let c = canvas.getContext('2d');

const gravity = 1;
const groundLevel = canvas.height * 0.1;
const backgroundGradient = c.createLinearGradient(0,0, 0,canvas.height);
backgroundGradient.addColorStop(0, '#10192d');
backgroundGradient.addColorStop(1, 'black');
let stars = [];
let miniStars = [];


function Star(x, y, radius, color){
    this.x = x;
    this.y = y;
    this.dx = Math.random() * 20;
    this.dy = Math.random() * 20;
    this.radius = radius;
    this.color = color;
    this.mass = Math.ceil(this.radius/2 + 4);

    this.update = () => { //modern method of writing a function
        if(this.x + this.radius + this.dx > canvas.width || this.x + this.dx < this.radius) {
            this.dx *= -0.8;
            this.shatter();

        }
        if(this.y + this.radius + this.dy > canvas.height - groundLevel) {
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
        c.save();
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.shadowColor = this.color;
        c.shadowBlur = 5;
        c.globalAlpha = this.opacity;
        c.fill();
        c.closePath();
        c.restore();
    };

    this.shatter = function () {
        this.radius *= 0.8;

        for (let i = 0; i < this.mass; i++) {
            miniStars.push(new MiniStar(this.x, this.y, Math.random() * 3, this.color));
        }
    }
}

function MiniStar(x, y, radius, color) {
    Star.call(this, x, y, radius, color);
    this.dx = (Math.random() - 0.5) * 4;
    this.dy = (Math.random() - 0.5) * 4;
    this.ttl = 150;
    this.opacity = 1;
    this.update = () => { //modern method of writing a function
        if(this.x + this.radius + this.dx > canvas.width || this.x + this.dx < this.radius) {
            this.dx *= -0.95;
        }
        if(this.y + this.radius + this.dy > canvas.height - groundLevel) {
            this.dy *= -0.95; // Multiplied by the restitution cofficient
        }else{
            this.dy += gravity * 0.2;
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

function createMountainRange(mtnAmount, height, color) {
    for(let i = 0; i < mtnAmount; i++) {
        const mtnWidth = canvas.width/mtnAmount;
        c.beginPath();
        c.moveTo(i * mtnWidth, canvas.height - groundLevel);
        c.lineTo(i * mtnWidth + mtnWidth + 700, canvas.height - groundLevel);
        c.lineTo(i * mtnWidth + mtnWidth/2, canvas.height - height - groundLevel);
        c.lineTo(i*mtnWidth - 700, canvas.height - groundLevel);
        c.fillStyle = color;
        c.fill();
        c.closePath();
    }
}

let backgroundStars = [];
let timer;
let spawnRate = 80;
function init(){
    timer = 0;
    backgroundStars = [];
    stars = [];
    miniStars = [];

    for(let i = 0; i<50; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height/3;
        const bstarRadius = Math.random() * 3 + 0.5;
        backgroundStars.push(new Star(x, y, bstarRadius, randomColor(lightColors)));
    }

    radius = Math.random() * 10 + 5;
    x = randomInt(radius, canvas.width-radius);
    y = randomInt(-10, -200);
    stars.push(new Star(x, y, radius, randomColor(lightColors)));
}
function animate(){
    requestAnimationFrame(animate);
    c.fillStyle = backgroundGradient;
    c.fillRect(0, 0, innerWidth, innerHeight);
    backgroundStars.forEach(backgroundStar => {
        backgroundStar.draw();
    });
    createMountainRange(1, canvas.height * 0.95 - groundLevel, '#121212');
    createMountainRange(2.5, canvas.height * 0.8 - groundLevel, '#0b0b0b');
    createMountainRange(2, canvas.height * 0.65 - groundLevel, '#11121a');
    createMountainRange(0.6, canvas.height * 0.8 - groundLevel, '#000000');
    

    c.fillStyle = "#182028";
    c.fillRect(0, canvas.height - groundLevel, canvas.width, groundLevel);
    stars.forEach((p, i) => {
        p.update();
        if(p.radius < 3) {
            stars.splice(i, 1);
        }
    });
    miniStars.forEach((miniStar, i) => {
        miniStar.update();
        if(miniStar.opacity < 0.05) {
            miniStars.splice(i, 1);
        }
    });
    timer++;
    if(timer % spawnRate == 0) {
        const radius = Math.random() * 10 + 5;
        const x = randomInt(radius, canvas.width-radius);
        stars.push(new Star(x, randomInt(-10, -200), radius, randomColor(lightColors)));
        spawnRate = randomInt(60,250);
        timer = 1;
    }
}
init();
animate();