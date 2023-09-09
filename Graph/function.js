let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(canvas);

let c = canvas.getContext('2d');

let scale = 30;
const Origin = {
    x: canvas.width/2,
    y: canvas.height/2
};

addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

xAxis = (color) => {
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
    c.strokeStyle = 'rgba(255,255,255, 0.2)';
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
    c.strokeStyle = 'rgba(255,255,255, 0.2)';
    for(let j = 1; j < Math.floor(canvas.width/scale); j++) {
        c.beginPath();
        for (let i = 0; i < canvas.height; i++) {
            c.lineTo(Origin.x - 30*j, i);
        }
        c.stroke();
    }
    for(let j = 1; j < Math.floor(canvas.width/scale); j++) {
        c.beginPath();
        for (let i = 0; i < canvas.height; i++) {
            c.lineTo(Origin.x + 30*j, i);
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
    Origin.x = canvas.width/2;
    Origin.y = canvas.height/2;

    
    c.fillStyle = "lavender";
    c.font = "bold 24px times";
    c.fillText("O", Origin.x - 22, Origin.y + 20);
    c.fillText("X", canvas.width - 24, Origin.y + 20);
    c.fillText("Y", Origin.x - 22, 20);

    xGrids();
    yGrids();
    xAxis('white');
    yAxis('white');  
    line(2, 3, 'cyan');
    line(1, 0, 'yellow');
    curve(1, 3, -4,'#ff00bb');
}

init();
