const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d');
console.log(canvas);

const mouse = {
    x: innerWidth/2,
    y: innerHeight/2
};

const colors = [
    '#00bdff',
    '#4d39ce',
    '#p88eff',
    '#FF81D0',
    '#B8F0FD',
    '#F2C9E0'
];

// Event listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
});


// Utility functions
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function Ball(x, y, radius, velocity, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.velocity = velocity;
    this.color = color;
    this.radian = Math.random() * Math.PI * 2;
    this.distFromCenter = randomInt(50,120);
    this.lastMouse = {
        x: x, y: y
    };
    this.update = function() {
        const lastPoint = {x: this.x, y: this.y};

        // move over time
        this.radian += this.velocity;

        // Drag effect
        this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

        // Circular motion
        this.x = this.lastMouse.x + Math.cos(this.radian) * this.distFromCenter;
        this.y = this.lastMouse.y + Math.sin(this.radian) * this.distFromCenter;

        this.draw(lastPoint);
    }

    this.draw = lastPoint => {
        c.beginPath();
        c.strokeStyle = this.color;
        c.lineWidth = this.radius;
        c.moveTo(lastPoint.x, lastPoint.y);
        c.lineTo(this.x, this.y);
        c.stroke();
        c.closePath();
    }

}

let balls;

function init() {
    balls = [];
    for (let i = 0; i<250; i++) {
        let x = innerWidth/2;
        let y = innerHeight/2;
        let radius = Math.random() * 2 + 2;
        let v = Math.random() / 13;
        balls.push(new Ball(x, y, radius, v, randomColor(colors)));
    }
}



function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = 'rgba(255,255,255, 0.05)';
    c.fillRect(0, 0, canvas.width, canvas.height);

    balls.forEach (ball=> {
        ball.update();
    });


}

init();
animate();