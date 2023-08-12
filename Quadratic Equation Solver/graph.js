let canvas = document.getElementById('line');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(canvas);

let c = canvas.getContext('2d');
let color;
let p1, p2; // Intersection point on X_axis
let scale = 25;
vertex = new Point(Origin.x, Origin.y);

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
    c.lineWidth = 2;
    c.strokeStyle = color;
    c.stroke();
}

function init(){
    c.clearRect(0,0,canvas.width, canvas.height);
    clearSpan();
}

init();

graph = () => {
    init();
    getCoeff();
    color = '#df00bb';
    vertex.x = -B/(2*A);
    vertex.y = ((A*vertex.x + B )*vertex.x) + C;
    if(A != 0) {
        curve(A, vertex.x, vertex.y, color);
        // Vertex
        point(Origin.x + scale*vertex.x, Origin.y - scale*vertex.y, 'black');
    }
}

addEventListener("resize", function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
    graph();
});

document.querySelectorAll("input").forEach(element => element.addEventListener("keyup", graph));

document.getElementById("clear").onclick = init;