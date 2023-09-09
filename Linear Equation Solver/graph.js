let canvas = document.getElementById('line');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(canvas);

let c = canvas.getContext('2d');
let m1,m2, b1,b2; // Slopes and y-intercepts of the lines
let color1,color2;
let p; // Intersection point
let scale = 25;


addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

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
    clearSpan();
}

init();

graph = () => {
    init();
    getCoeff();
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
    if(m1 != m2) {
        let px = Origin.x + det2(c1,y1,c2,y2)/det2(x1,y1,x2,y2) * scale;
        let py = Origin.y - det2(x1,c1,x2,c2)/det2(x1,y1,x2,y2) * scale;
        point(px, py, 'red');
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