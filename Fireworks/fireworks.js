let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');

var mouse = {
    x: innerWidth/2,
    y: innerHeight/2
};


addEventListener('resize', function() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init(); 
});

const gravity = 0.006;
const friction = 0.99;

function Particle(x, y, radius, color, velocity){
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.radius = radius;
    this.color = color;
    this.alpha = 1;

    this.update = () => { //modern method of writing a function
        this.draw();
        this.velocity.x *= friction;
        this.velocity.y *= friction;
        this.velocity.y += gravity;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.005;

    };

    this.draw = () => {
        c.save();
        c.globalAlpha = this.alpha;
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
        c.restore();
    };
}

let particles;

function init(){
    particles = [];
}
function animate(){
    requestAnimationFrame(animate);
    c.fillStyle = 'rgba(0, 0, 0, 0.05)';
    c.fillRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i<particles.length; i++) {
        if(particles[i].alpha > 0) {
            particles[i].update()
        }else{
            particles.splice(i, 1);
        }
    }

    // particles.forEach((p, i) => {
    //     if(p.alpha > 0) {
    //         p.update();
    //     } else {
    //         particles.splice(i, 1);
    //     }
    // });
    c.fillStyle = 'orange';
    c.font = 'bold 20px monospace';
    c.fillText("Click anywhere on the screen for fireworks!", canvas.width * 0.25, 20);   
}
init();
animate();

addEventListener('click', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    const particeCount = Math.ceil(Math.random()*400+30);
    const power = Math.ceil(Math.random()*30+5);
    let angleIncrement = (Math.PI * 2) / particeCount;

    for(let i = 0; i<particeCount; i++) {
        particles.push(new Particle(mouse.x, mouse.y, 3, `hsl(${Math.random() * 360}, 50%, 50%)`, {
            x: Math.cos(angleIncrement * i) * Math.random() * power, 
            y: Math.sin(angleIncrement * i) * Math.random() * power
        }));
    }
});