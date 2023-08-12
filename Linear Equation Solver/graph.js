
let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(canvas);

let c = canvas.getContext('2d');
let m1,m2, b1,b2; // Slopes and y-intercepts of the lines
let color1,color2;
let scale = 25;
const Origin = {
    x: canvas.width/2,
    y: canvas.height/2
};

xAxis = (color) => {
    c.lineWidth = 2;
    c.beginPath();
    for (let i = 0; i < canvas.width; i++) {
        c.lineTo(i, canvas.height/2);  
    }
    c.strokeStyle = color;
    c.stroke();
}

yAxis = (color) => {
    c.beginPath();
    for (let i = 0; i < canvas.height; i++) {
        c.lineTo(canvas.width/2, i);  
    }
    c.strokeStyle = color;
    c.stroke();
}

xGrids = () => {
    c.strokeStyle = 'rgba(0,0,0, 0.2)';
    for(let j = 1; j < Math.floor(canvas.height/scale); j++) {
        c.beginPath();
        for (let i = 0; i < canvas.width; i++) {
            c.lineTo(i, Origin.y - scale*j);
        }
        c.stroke();
    }
    for(let j = 1; j < Math.floor(canvas.height/scale); j++) {
        c.beginPath();
        for (let i = 0; i < canvas.width; i++) {
            c.lineTo(i, Origin.y + scale*j);
        }
        c.stroke();
    }
}

yGrids = () => {
    c.strokeStyle = 'rgba(0,0,0, 0.2)';
    for(let j = 1; j < Math.floor(canvas.width/scale); j++) {
        c.beginPath();
        for (let i = 0; i < canvas.height; i++) {
            c.lineTo(Origin.x - scale*j, i);
        }
        c.stroke();
    }
    for(let j = 1; j < Math.floor(canvas.width/scale); j++) {
        c.beginPath();
        for (let i = 0; i < canvas.height; i++) {
            c.lineTo(Origin.x + scale*j, i);
        }
        c.stroke();
    }
}

line = (slope, yIntercept, color) => {
    yIntercept *= scale;
    c.lineWidth = 2;
    c.strokeStyle = color;
    c.beginPath();
    for(let i=0; i<canvas.width/2;i++){
        c.lineTo(Origin.x+i, Origin.y-i*slope-yIntercept);
    }
    c.stroke();
    c.beginPath();
    for(let i=0; i<canvas.width/2;i++){
        c.lineTo(Origin.x-i, Origin.y+i*slope-yIntercept);        
    }
    c.stroke();
}

function init(){
    c.clearRect(0,0,canvas.width, canvas.height);
    Origin.x = canvas.width/2;
    Origin.y = canvas.height/2;
    c.fillStyle = "black";
    c.font = "bold 24px times";
    c.fillText("O", Origin.x - 22, Origin.y + 20);
    c.fillText("X", canvas.width - 24, Origin.y + 20);
    c.fillText("Y", Origin.x - 22, 20);

    xGrids();
    yGrids();
    xAxis('black');
    yAxis('black');
    clearSpan();
}

init();


document.querySelectorAll("input").forEach(element => element.addEventListener("keyup", () => {
    init();
    x1 = Number(document.getElementById("x1").value);
    y1 = Number(document.getElementById("y1").value);
    c1 = Number(document.getElementById("c1").value);
    x2 = Number(document.getElementById("x2").value);
    y2 = Number(document.getElementById("y2").value);
    c2 = Number(document.getElementById("c2").value);
    color1 = '#df00bb';
    color2 = '#0004ff';
    m1 = -x1/y1;
    m2 = -x2/y2;
    b1 = c1/y1;
    b2 = c2/y2;
    if(y1 == 0){
        c.strokeStyle = color1;
        c.beginPath();
        for(let i=0; i<canvas.height;i++){
            c.lineTo(Origin.x + c1/x1 * scale, i);
        }
        c.stroke();
    }
    if(y2 == 0) {
        c.strokeStyle = color2;
        c.beginPath();
        for(let j=0; j<canvas.height;j++){
            c.lineTo(Origin.x + c2/x2 * scale, j);
        }
        c.stroke();
    }
    line(m1, b1, color1);
    line(m2, b2, color2);
}));


document.getElementById("clear").onclick = init;