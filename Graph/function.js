let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(canvas);

let c = canvas.getContext('2d');

function distance(x1, y1, x2, y2) {
    let xDist = x2 - x1;
    let yDist = y2 - y1;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

xAxis = () => {
    c.beginPath();
    for (let i = 0; i < canvas.width; i++) {
        c.lineTo(i, canvas.height/2);  
    }
    c.strokeStyle = 'lavender';
    c.stroke();
}

yAxis = () => {
    c.beginPath();
    for (let i = 0; i < canvas.height; i++) {
        c.lineTo(canvas.width/2, i);  
    }
    c.strokeStyle = 'lavender';
    c.stroke();
}

function Object(x, y, radius, color){
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

    this.update = () => { //modern method of writing a function
        this.draw();
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

const Origin = {
    x: canvas.width/2,
    y: canvas.height/2
};

function init(){
    xAxis();
    yAxis();    
}
// function animate(){
//     requestAnimationFrame(animate);
//     c.clearRect(0, 0, innerWidth, innerHeight);

// }
init();
// animate();