const canvas = document.querySelector("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
let c = canvas.getContext("2d");
console.log(canvas);

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});


addEventListener('click', function(event){ // instead you can write window.eventListener
    pp = !(pp);
});

getDist = (x1, y1, x2, y2) => {
    let x = x2 - x1;
    let y = y2 - y1;
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

deg = (x) =>{
    return x*180/Math.PI;
}

rad = (x) => {
    return x*Math.PI/180;
}

dotProduct = (a1,b1, a2,b2) => {
    return a1*a2 + b1*b2;
}

vctr = (x1, x2) => {
    return x2-x1;
}


function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function average() {
    let avg = 0;
    let n = arguments.length;
    for(let i = 0; i<n; i++) {
        avg += arguments[i];
    }
    return avg/n;
}

connect = (x1, y1, x2, y2) => {
    c.beginPath();
    c.moveTo(x1, y1);
    c.lineTo(x2, y2);
    c.strokeStyle = 'lavender';
    c.lineWidth = 2;
    c.stroke();
}

const colors = [
    '#a28089',
    '#e5eaf5',
    '#ff1d58',
    '#400036',
    '#015958',
    '#7A577A',
    '#F2C6C2'
];

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

point = (x, y, col) => {
    c.beginPath();
    c.arc(x, y, 3, 0, Math.PI * 2, true);
    c.fillStyle = col;
    c.fill();
    c.closePath();
}

slope = (V1) => {
    let A = Math.acos(dotProduct(V1.x, V1.y, 1, 0)/getDist(p.x, p.y, fixed[1].x, fixed[1].y));
    if(V1.y <= 0) {
        A = Math.PI * 2 - A;
    }
    return A;
}

function Circle (centre, radius){
    this.centre = centre;
    this.radius = radius;
    this.radian = p.angle;
    this.centralAngleR = 50;
    this.inscribedAngleR = 40;
    this.angleR = this.inscribedAngleR;
    this.velocity = Math.pow(-1, randomInt(2,3)) * (Math.random() + 0.006) * 0.02;

    this.update = () =>{
        if(pp) {
            this.radian += this.velocity;
            p.x = this.centre.x + this.radius * Math.cos(this.radian);
            p.y = this.centre.y + this.radius * Math.sin(this.radian);

            if(getDist(p.x, p.y, fixed[0].x, fixed[0].y) < 5 || getDist(p.x, p.y, fixed[1].x, fixed[1].y) < 5) {
                this.velocity = -this.velocity;
            }

            if(getDist(p.x, p.y, fixed[0].x, fixed[0].y) <= this.inscribedAngleR + 1 || getDist(p.x, p.y, fixed[1].x, fixed[1].y) <= this.inscribedAngleR + 1){
                this.angleR = 2;
            }else{
                this.angleR = this.inscribedAngleR;
            }
        }
        VPA.x = vctr(p.x, fixed[0].x);
        VPA.y = vctr(p.y, fixed[0].y);
        VPB.x = vctr(p.x, fixed[1].x);
        VPB.y = vctr(p.y, fixed[1].y);
        APB = deg(Math.acos(dotProduct(VPA.x, VPA.y, VPB.x, VPB.y)/(getDist(p.x, p.y, fixed[0].x, fixed[0].y)*getDist(p.x, p.y, fixed[1].x, fixed[1].y))));
        APB = Math.round(APB * 10000)/10000;
        this.draw();
        this.drawPoint();
    }

    this.draw = function() {
        c.beginPath();
        c.arc(this.centre.x, this.centre.y, this.radius, 0, Math.PI * 2, true);
        c.strokeStyle = 'blue';
        c.stroke();
        c.closePath();

        point(this.centre.x, this.centre.y, 'blue');

        c.fillStyle = 'limegreen';
        c.font = 'bold 20px times';
        c.fillText("O", this.centre.x - 8, this.centre.y - 7);
        c.fillText("P", p.x - 7, p.y - 7);
        c.fillText("A", fixed[0].x - 8, fixed[0].y + 20);
        c.fillText("B", fixed[1].x - 8, fixed[1].y + 20);
        c.fillText("\u2220AOB = " + AOB + "\xB0", centre.x - 80, centre.y + this.radius + 45);
        c.fillText("\u2220APB = " + APB + "\xB0", centre.x - 80, centre.y + this.radius + 75); 
        c.fillText("2 \xD7 \u2220APB = \u2220AOB", centre.x - 80, centre.y + this.radius + 105);
        c.fillStyle = 'yellow';
        c.font = 'normal 25px Georgia';
        c.fillText("Click on the screen to Play/Pause the animation", centre.x - this.radius - 80, centre.y - this.radius - 50);


        c.strokeStyle = 'yellow';
        c.beginPath();
        c.arc(centre.x, centre.y, this.centralAngleR, fixed[1].angle, fixed[0].angle);
        c.stroke();
        
        c.beginPath();
        c.arc(p.x, p.y, this.angleR, slope(VPB), slope(VPB) + rad(APB));
        c.stroke();
    }

    this.drawPoint = () =>{
        point(fixed[0].x, fixed[0].y, colors[2]);
        point(fixed[1].x, fixed[1].y, colors[2]);
        point(p.x, p.y, 'yellow');

        connect(fixed[0].x, fixed[0].y, this.centre.x, this.centre.y);
        connect(fixed[1].x, fixed[1].y, this.centre.x, this.centre.y);
        connect(p.x, p.y, fixed[0].x, fixed[0].y);
        connect(p.x, p.y, fixed[1].x, fixed[1].y);
    }
}

function P(x, y) {
    this.x = x;
    this.y = y;
}

function locus(angle){
    this.angle = angle;
    this.x = radius * Math.cos(this.angle) + centre.x;
    this.y = radius * Math.sin(this.angle) + centre.y;
}

let circleArray = [];
let centre, radius, p;
let fixed = [];
let VOA, VOB, VPA, VPB; // Vectors
let AOB, APB; // Central angle and inscribed angle

init = () =>{
    circleArray = [];
    fixed = [];
    centre = {
        x: canvas.width/2,
        y: canvas.height/2
    };
    radius = 200;
    for(let i = 0; i<2; i++) {
        fixed.push(new locus(Math.PI * (Math.random() + Math.PI/1800)));
        /*
        The bug was due to x position of first point on extreme right side which 
        didn't allow the point B to spawn. This problem is solved by restricting
        the position of point A which is done by the following while loop.
        */
        while(fixed[0].x - centre.x - radius > -3) {
            fixed[0] = new locus(Math.PI * (Math.random() + Math.PI/1800));
        }
        if(i !== 0) {
            for(let j = 0; j<1; j++){
                if(fixed[0].x > fixed[1].x || getDist(fixed[0].x, fixed[0].y, fixed[1].x, fixed[1].y) < 5){ // The reload problem was solved when the OR operator was replaced with AND
                    fixed[1] = new locus(Math.PI * (Math.random() + Math.PI/1800));
                    j = -1;
                }
            }
        }
    }
    p = new locus(2 * Math.PI * (Math.random()));
    if(((p.x > fixed[0].x && p.x < fixed[1].x) && (p.y > fixed[0].y || p.y > fixed[1].y)) || (getDist(p.x, p.y, fixed[0].x, fixed[0].y) < 5 || getDist(p.x, p.y, fixed[1].x, fixed[1].y) < 5)) {
        for(let i = 0; i<1; i++) {
            p = new locus(2 * Math.PI * (Math.random() + Math.PI/1800));
            if(((p.x > fixed[0].x && p.x < fixed[1].x) && (p.y > fixed[0].y || p.y > fixed[1].y)) || (getDist(p.x, p.y, fixed[0].x, fixed[0].y) < 5 || getDist(p.x, p.y, fixed[1].x, fixed[1].y) < 5)){
                i = -1;
            }
        }
    }
    circleArray.push(new Circle(centre, radius));
    VPA = new P(vctr(p.x, fixed[0].x), vctr(p.y, fixed[0].y));
    VPB = new P(vctr(p.x, fixed[1].x), vctr(p.y, fixed[1].y));;
    VOA = new P(vctr(centre.x, fixed[0].x), vctr(centre.y, fixed[0].y));
    VOB = new P(vctr(centre.x, fixed[1].x), vctr(centre.y, fixed[1].y));
    AOB = deg(Math.acos(dotProduct(VOA.x, VOA.y, VOB.x, VOB.y)/(radius*radius)));
    AOB = Math.round(AOB * 10000)/10000;
    pp = true;
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    circleArray[0].update();
}

init();
animate();