const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(canvas);

const c = canvas.getContext('2d');

const colors = [
    '#a28089',
    '#ff1d58',
    '#400036',
    '#015958',
    '#7A577A',
    '#F2C6C2'
];


let particles = [];
const numberOfParticles = 30;

addEventListener('resize', function() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

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

function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
}

function resolveCollision(particle, otherParticle) {
    const xVelDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelDiff = particle.velocity.y - otherParticle.velocity.y;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    // Prevent accidental overlap of particles
    if (xVelDiff * xDist + yVelDiff + yDist >= 0) {

        // Grab angle between the two colliding particles
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        // Store mass in var for better readability in collision equation
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        // Velocity before equation
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);

        // Velocity after 1d collision equation
        const v1 = { 
            x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2),
            y: u1.y
        };
        const v2 = {
            x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2),
            y: u2.y
        };

        // Final velocity after rotating axis back to original location
        const V1 = rotate(v1, -angle);
        const V2 = rotate(v2, -angle);

        // Swap particle velocities for relisitic bounce effect
        particle.velocity.x = V1.x;
        particle.velocity.y = V1.y;

        otherParticle.velocity.x = V2.x;
        otherParticle.velocity.y = V2.y;
    }
}

function Particle(x, y, radius, color){
    this.x = x;
    this.y = y;
    this.velocity = {
        x: (Math.random() - 0.5) * 8,
        y: (Math.random() - 0.5) * 8
    };
    this.radius = radius;
    this.color = color;
    this.opacity = 0;
    this.mass = 1;

    this.update = (particles) => { //modern method of writing a function
        this.draw();
        for ( let i = 0; i<particles.length; i++) {
            if(this === particles[i]) continue;
            if (distance(this.x, this.y, particles[i].x, particles[i].y) - this.radius * 2 < 0){
                resolveCollision(this, particles[i]);
                this.opacity = 0.8
            }
        }
        if(this.x - this.radius <= 0 || this.x + this.radius >= innerWidth){
            this.velocity.x = -this.velocity.x;
            this.opacity = 0.8
        }

        if(this.y - this.radius <= 0 || this.y + this.radius >= innerHeight){
            this.velocity.y = -this.velocity.y;
            this.opacity = 0.8
        }
        
        if (this.opacity > 0) {
            this.opacity -= 0.2;

            // If the opacity goes below 0, setting it to 0
            this.opacity = Math.max(0, this.opacity);
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;

    };

    this.draw = () => {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.save();
        c.globalAlpha = this.opacity; // opacity 
        c.fillStyle = this.color;
        c.fill();
        c.restore();
        c.strokeStyle = 'black';
        c.stroke();
        c.closePath();
    };
}

function init(){
    particles = [];
    for (let i = 0; i < numberOfParticles; i++){
        const radius = 15;
        let x = randomInt(radius, canvas.width - radius);
        let y = randomInt(radius, canvas.height - radius);        
        const color = randomColor(colors);

        if (i !== 0){
            for (let j = 0; j < particles.length; j++){
                if (distance(x, y, particles[j].x, particles[j].y) - radius * 2 < 0){
                    x = randomInt(radius, canvas.width-radius);
                    y = randomInt(radius, canvas.height-radius);

                    j = -1;
                }
            }
        }
        particles.push(new Particle(x, y, radius, color));
    }
}

function animate(){
    requestAnimationFrame(animate);

    c.clearRect(0, 0, innerWidth, innerHeight);

    particles.forEach(p => {
        p.update(particles);
    });
}
init();
animate();