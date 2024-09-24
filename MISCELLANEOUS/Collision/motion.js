const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(canvas);

const c = canvas.getContext('2d');

// Light colors for dark background
const colors = [
    '#ff1d58',
    '#cfffee',
    'white',
    'lavender',
    'cyan',
    'skyblue',
    'lightgreen'
];


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

// Function to rotate the velocities for collision calculation
function rotate(dx, dy, angle) {
    return {
        x: dx * Math.cos(angle) - dy * Math.sin(angle),
        y: dx * Math.sin(angle) + dy * Math.cos(angle)
    };
}

function resolveCollision(p1, p2) {
    const xVelocityDiff = p1.dx - p2.dx;
    const yVelocityDiff = p1.dy - p2.dy;

    const xDist = p2.x - p1.x;
    const yDist = p2.y - p1.y;

    // Prevent accidental overlap
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
        const angle = -Math.atan2(p2.y - p1.y, p2.x - p1.x);

        const u1 = rotate(p1.dx, p1.dy, angle);
        const u2 = rotate(p2.dx, p2.dy, angle);

        // Apply 1D elastic collision equations
        const v1 = {
            x: u1.x * (p1.mass - p2.mass) / (p1.mass + p2.mass) + u2.x * 2 * p2.mass / (p1.mass + p2.mass),
            y: u1.y
        };
        const v2 = {
            x: u2.x * (p2.mass - p1.mass) / (p1.mass + p2.mass) + u1.x * 2 * p1.mass / (p1.mass + p2.mass),
            y: u2.y
        };

        // Rotate velocities back to the original coordinate system
        const vFinal1 = rotate(v1.x, v1.y, -angle);
        const vFinal2 = rotate(v2.x, v2.y, -angle);

        // Assign new velocities
        p1.dx = vFinal1.x;
        p1.dy = vFinal1.y;

        p2.dx = vFinal2.x;
        p2.dy = vFinal2.y;
    }
}


function showParticles(){
    for(let i = 0; i<numOfParticles; i++){
        console.log(particles[i]);
    }
}

function showKE(){
    let KE = 0;
    for(let i = 0; i<numOfParticles; i++){
        KE += 1/2 * particles[i].mass * Math.hypot(particles[i].dx, particles[i].dy) ** 2;
    }
    // Total Kinetic Energy of the system should be conserved after each collision
    console.log(`Total Kinetic Energy: ${Math.round(KE * 10000) / 10000}`);
}

function Particle(x, y, radius, color){
    this.x = x;
    this.y = y;
    this.dx = (Math.random() - 0.5) * 8;
    this.dy = (Math.random() - 0.5) * 8;
    this.radius = radius;
    this.color = color;
    this.opacity = 0;
    this.area = Math.PI * this.radius**2;
    this.mass = Standard.density * this.area;

    this.update = (particles) => { //modern method of writing a function
        for ( let i = 0; i<numOfParticles; i++) {
            if(this === particles[i]) continue;
            if (distance(this.x, this.y, particles[i].x, particles[i].y) - this.radius - particles[i].radius < 0){
                resolveCollision(this, particles[i]);
                this.opacity = maxOpacity;
                particles[i].opacity = maxOpacity;
            }
        }
        if(this.x - this.radius <= 0 || this.x + this.radius >= innerWidth){
            this.dx = -this.dx;
            this.opacity = maxOpacity;
        }

        if(this.y - this.radius <= 0 || this.y + this.radius >= innerHeight){
            this.dy = -this.dy;
            this.opacity = maxOpacity;
        }
        
        if (this.opacity > 0) {
            this.opacity -= 0.025;

            // If the opacity goes below 0, setting it to 0
            this.opacity = Math.max(0, this.opacity);
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw();

    };

    this.draw = () => {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.save();
        c.globalAlpha = this.opacity; // opacity 
        c.fillStyle = this.color;
        c.shadowColor = 'white';
        c.shadowBlur = this.radius;
        c.fill();
        c.restore();
        c.strokeStyle = '#CFFFEE';
        c.lineWidth = 3;
        c.stroke();
        c.closePath();
    };
}


let particles = [];
const numOfParticles = randomInt(2,10);
const Standard = {
    radius: 15,
    mass: 1
};
Standard.density = Standard.mass / (Math.PI * Standard.radius**2)
const maxOpacity = 1;

function init(){
    particles = [];
    for (let i = 0; i < numOfParticles; i++){
        const radius = Standard.radius * randomInt(1, 6);
        let x = randomInt(radius, canvas.width - radius);
        let y = randomInt(radius, canvas.height - radius);        
        const color = randomColor(colors);

        if (i !== 0){
            for (let j = 0; j < particles.length; j++){
                if (distance(x, y, particles[j].x, particles[j].y) - radius - particles[j].radius < 0){
                    x = randomInt(radius, canvas.width-radius);
                    y = randomInt(radius, canvas.height-radius);

                    j = -1;
                }
            }
        }
        particles.push(new Particle(x, y, radius, color));
    }
    showParticles();
    showKE();
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