let canvas = document.getElementById('line');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(canvas);

let c = canvas.getContext('2d');
let color;
let p1, p2; // Intersection point on X_axis
let scale = 25;
vertex = new Point(Origin.x, Origin.y);

curve = (a, vertex_X, vertex_Y, color) => {
    a /= scale;
    c.strokeStyle = color;
    c.beginPath();
    for(let i=0; i<canvas.width/2;i++){
        c.lineTo(PlotX(vertex_X)+i, PlotY(vertex_Y)-i*i*a);
    }
    c.stroke();
    c.beginPath();
    for(let i=0; i<canvas.width/2;i++){
        c.lineTo(PlotX(vertex_X)-i, PlotY(vertex_Y)-i*i*a);
    }
    c.lineWidth = 2;
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
        point(PlotX(vertex.x), PlotY(vertex.y), 'black');
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