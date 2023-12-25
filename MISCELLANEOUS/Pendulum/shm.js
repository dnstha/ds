const canvas = document.querySelector("canvas");
const c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/*
Making the canvas more clear
let rect = canvas.getBoundingClientRect();
canvas.width = rect.width * devicePixelRatio;
canvas.height = rect.height * devicePixelRatio;
c.scale(devicePixelRatio, devicePixelRatio);
canvas.style.width = rect.width + "px";
canvas.style.height = rect.height + "px";
*/

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function Bob(x, y, length, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.length = length;
    this.amplitude = 100;
    this.angle = Math.PI * 0.5;
    this.velocity = Math.pow(-1, randomInt(1,2)) * (Math.random() + 0.001) * 0.01;

    this.update = function() {
        if(this.x > this.amplitude + p.x || this.x < p.x - this.amplitude) {
            this.velocity = -this.velocity;
        }
        this.angle += this.velocity;
        this.x = centre.x + Math.cos(this.angle) * this.length;
        this.y = centre.y + Math.sin(this.angle) * this.length;
        this.draw();
        console.log(this.length);
    }

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fill();
        c.closePath();
        drawLine(this.x, this.y, centre.x, centre.y);
    }

}

getDist = (x1, y1, x2, y2) => {
    let x = x2 - x1;
    let y = y2 - y1;
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

function Point(x, y) {
    this.x = x;
    this.y = y;
}

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

function avg() {
    let x = 0;
    for(let i = 0; i<arguments.length; i++) {
        x += arguments[i];
    }
    return x/arguments.length;
}

drawLine = (x1, y1, x2, y2) => {
    c.beginPath();
    c.moveTo(x1, y1);
    c.lineTo(x2, y2);
    c.strokeStyle = 'black';
    c.stroke();
}

let radius, angle, p1, p2, p, l, centre;
let b = [];
function init() {
    p1 = new Point(canvas.width * 0.25, canvas.height/10);
    p2 = new Point(canvas.width * 0.75, p1.y);
    b = [];
    p = new Point(canvas.width/2, canvas.height * 0.9);
    centre = new Point(avg(p1.x, p2.x), p1.y);
    l = getDist(centre.x, centre.y, p.x, p.y);
    b.push(new Bob(p.x, p.y, l, 20));
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    b[0].update();
    drawLine(p1.x, p1.y, p2.x, p2.y);
}
init();
animate();