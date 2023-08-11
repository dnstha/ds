const canvas = document.querySelector("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
let c = canvas.getContext("2d");
console.log(canvas);

let rect = canvas.getBoundingClientRect();
canvas.width = rect.width * devicePixelRatio;
canvas.height = rect.height * devicePixelRatio;
c.scale(devicePixelRatio, devicePixelRatio);
canvas.style.width = rect.width + "px";
canvas.style.height = rect.height + "px";


addEventListener('resize', function() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * devicePixelRatio;
    canvas.height = rect.height * devicePixelRatio;
    c.scale(devicePixelRatio, devicePixelRatio);
    canvas.style.width = rect.width + "px";
    canvas.style.height = rect.height + "px";
});

document.getElementById("plps").addEventListener('click', function(){ // instead you can write window.eventListener
    pp = !(pp);
    if(pp == false) {
        document.getElementById("plps").style.color = lightColors[1];
    }else{
        document.getElementById("plps").style.color = '#cfffee';
    }
});

document.getElementById("reset").addEventListener('click', function(){ // instead you can write window.eventListener
    init();
});

function Circle (centre, radius){
    this.centre = centre;
    this.radius = radius;
    this.radian = Math.PI/2;
    this.angleR = this.inscribedAngleR;
    this.velocity = Math.pow(-1, randomInt(2,3)) * 0.05;

    this.update = () =>{
        if(pp) {
            this.radian += this.velocity;
            particleArray[0].x = this.centre.x + this.radius * Math.cos(this.radian);
        }
        this.draw();
    }

    this.draw = function() {
        c.beginPath();
        c.arc(this.centre.x, this.centre.y, this.radius, 0, Math.PI * 2, true);
        c.strokeStyle = lightColors[1];
        c.stroke();
        c.closePath();
    }

}

function Particle (x, y, angle){
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.velocity = 0.05;

    this.updateSin = () =>{
        if(pp) {
            this.angle += this.velocity;
            this.y = circleArray[0].centre.y + circleArray[0].radius * Math.sin(this.angle);
        }
        this.draw();
    }
    this.updateCos = () =>{
        if(pp) {
            this.angle += this.velocity;
            this.x = circleArray[0].centre.x + circleArray[0].radius * Math.cos(this.angle);
        }
        this.draw();
    }

    this.draw = function() {
        point(this.x, this.y, lightColors[0]);
    }

}

function P(x, y) {
    this.x = x;
    this.y = y;
}

let particleArray = [];
let circleArray = [];
let centre, radius;
let fixed = [];
let varAngle;

init = () =>{
    particleArray = [];
    circleArray = [];
    fixed = [];
    centre = {
        x: canvas.width/2,
        y: canvas.height/2
    };
    radius = 200;
    circleArray.push(new Circle(centre, radius));
    for(let i = 0; i<2; i++) {
        particleArray.push(new Particle(centre.x, centre.y, i*Math.PI));
    }
    pp = true;
    document.getElementById("plps").style.color = "#cfffee";
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    circleArray[0].update();
    particleArray.forEach((p, i) => {
        if(i%2 == 0) {
            p.updateCos();
        }else{
            p.updateSin();
        }
    });
    if(modulus(particleArray[0].x - particleArray[1].x) < 1) {
        console.log("yeah");
    }
}

init();
animate();