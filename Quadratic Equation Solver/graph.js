let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(canvas);

let c = canvas.getContext('2d');
let color;
let p1, p2; // Intersection point on X_axis
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


curve = (a, vertex_X, Vertex_Y, color) => {
    vertex_X *= scale;
    Vertex_Y *= scale;
    a /= scale;
    c.beginPath();
    for(let i=0; i<canvas.width/2;i++){
        c.lineTo(Origin.x+i+vertex_X, Origin.y-i*i*a-Vertex_Y);
    }
    c.strokeStyle = color;
    c.stroke();
    c.beginPath();
    for(let i=0; i<canvas.width/2;i++){
        c.lineTo(Origin.x-i+vertex_X, Origin.y-i*i*a-Vertex_Y);
    }
    c.strokeStyle = color;
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

graph = () => {
    init();
    getCoeff();
    color = '#df00bb';
    a /= scale;
    curve(a, 0, 0, color);
}

document.querySelectorAll("input").forEach(element => element.addEventListener("keyup", graph));

document.getElementById("clear").onclick = init;