const canvas = document.querySelector("canvas");
const c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function Bob(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.angle = Math.random() * Math.PI * 2;
    this.velocity = (Math.random() - 0.5)/10;
    this.amplitude = 10;

    this.update = function() {
        if(this.x - p.x == this.amplitude || p.x - this.x < this.amplitude) {
            this.velocity = -this.velocity;
        }
        this.angle += this.velocity;
        this.x = p.x + Math.cos(this.angle) * 100;
        this.y = p.y + Math.sin(this.angle) * 100;
        this.draw();
    }

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.stroke();
        c.closePath();
    }
}

function Point(x, y) {
    this.x = x;
    this.y = y;
}

let radius, angle;
let b = [];
function init() {
    b = [];
    p = new Point(canvas.width/2, canvas.height * 0.7)
    b.push(new Bob(p.x, p.y, 10));
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    b[0].update();
}

init();
animate();