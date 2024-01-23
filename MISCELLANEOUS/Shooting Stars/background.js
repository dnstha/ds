const BG = document.getElementById('BG');
BG.width = window.innerWidth;
BG.height = window.innerHeight;

const ctx = BG.getContext('2d');

const gravity = 1;
const groundLevel = BG.height * 0.1;
const backgroundGradient = ctx.createLinearGradient(0,0, 0,BG.height);
backgroundGradient.addColorStop(0, '#10192d');
backgroundGradient.addColorStop(1, 'black');
let stars = [];
let miniStars = [];

function Star(x, y, radius, color, c){
    this.x = x;
    this.y = y;
    this.c = c;
    this.dx = Math.random() * 20;
    this.dy = Math.random() * 20;
    this.radius = radius;
    this.color = color;
    this.mass = Math.ceil(this.radius/2 + 4);

    this.update = () => { //modern method of writing a function
        if(this.x + this.radius + this.dx > BG.width || this.x + this.dx < this.radius) {
            this.dx *= -0.8;
            this.shatter();

        }
        if(this.y + this.radius + this.dy > BG.height - groundLevel) {
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
        this.c.save();
        this.c.beginPath();
        this.c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.c.fillStyle = this.color;
        this.c.shadowColor = this.color;
        this.c.shadowBlur = 5;
        this.c.globalAlpha = this.opacity;
        this.c.fill();
        this.c.closePath();
        this.c.restore();
    };

    this.shatter = function () {
        this.radius *= 0.8;

        for (let i = 0; i < this.mass; i++) {
            miniStars.push(new MiniStar(this.x, this.y, Math.random() * 3, this.color, c));
        }
    }
}

function MiniStar(x, y, radius, color, c) {
    Star.call(this, x, y, radius, color, c);
    this.dx = (Math.random() - 0.5) * 4;
    this.dy = (Math.random() - 0.5) * 4;
    this.ttl = 150;
    this.opacity = 1;
    this.update = () => { //modern method of writing a function
        if(this.x + this.radius + this.dx > BG.width || this.x + this.dx < this.radius) {
            this.dx *= -0.95;
        }
        if(this.y + this.radius + this.dy > BG.height - groundLevel) {
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
        this.c.save();
        this.c.beginPath();
        this.c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.c.fillStyle = this.color;
        // this.c.shadowColor = this.color;
        // this.c.shadowBlur = 5; // glow effect => Amazing but makes the animation slow
        this.c.globalAlpha = this.opacity;
        this.c.fill();
        this.c.closePath();
        this.c.restore();
    };
}

function createMountainRange(mtnAmount, height, color) {
    for(let i = 0; i < mtnAmount; i++) {
        const mtnWidth = BG.width/mtnAmount;
        ctx.beginPath();
        ctx.moveTo(i * mtnWidth, BG.height - groundLevel);
        ctx.lineTo(i * mtnWidth + mtnWidth + 700, BG.height - groundLevel);
        ctx.lineTo(i * mtnWidth + mtnWidth/2, BG.height - height - groundLevel);
        ctx.lineTo(i*mtnWidth - 700, BG.height - groundLevel);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }
}

let backgroundStars = [];

function setBG() {
    backgroundStars = [];
    ctx.fillStyle = backgroundGradient;
    for(let i = 0; i<50; i++) {
        const x = Math.random() * BG.width;
        const y = Math.random() * BG.height/3;
        const bstarRadius = Math.random() * 3 + 0.5;
        backgroundStars.push(new Star(x, y, bstarRadius, randomColor(lightColors),ctx));
    }
    ctx.fillRect(0, 0, innerWidth, innerHeight);
    backgroundStars.forEach(backgroundStar => {
        backgroundStar.draw();
    });
    createMountainRange(1, BG.height * 0.95 - groundLevel, '#121212');
    createMountainRange(2.5, BG.height * 0.8 - groundLevel, '#0b0b0b');
    createMountainRange(2, BG.height * 0.65 - groundLevel, '#11121a');
    createMountainRange(0.6, BG.height * 0.8 - groundLevel, '#000000');
    ctx.fillStyle = "#182028";
    ctx.fillRect(0, BG.height - groundLevel, BG.width, groundLevel);
}

setBG();

addEventListener('resize', function() {
    BG.width = window.innerWidth;
    BG.height = window.innerHeight;
    setBG();
})