const canvas = document.getElementById('shape');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');
let points = []; // Moving point
let scale = graphScale;

function Plot(x, y) {
    this.x = x;
    this.y = y;
}

function init(){
    points = [];
    Origin.x = canvas.width/2;
    Origin.y = canvas.height/2;
    points[0] = new Complex(PlotX(0), PlotY(0));
    points[1] = new Complex(PlotX(3), PlotY(0));
    points[2] = new Complex(PlotX(3), PlotY(4));
    
    points.forEach(p => {
        p.scale(2, 0, 0);
        p.translate(0,0);
        p.rotate(270, 0, 0);
    });
    c.beginPath();
    c.lineWidth = 1.5;
    c.strokeStyle = 'darkblue';
    c.fillStyle = 'rgba(150,200,250, 0.6)';
    c.moveTo(points[0].x, points[0].y);
    for(let i = 0; i < points.length;i++){
        c.lineTo(points[i].x, points[i].y);
    }
    c.closePath();
    c.fill();
    c.stroke();
    
    points.forEach((p,i) => {
        point(p.x, p.y, lightColors[i+1]);
    });
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0,canvas.width, canvas.height);
    
    c.beginPath();
    c.lineWidth = 1.5;
    c.strokeStyle = 'blue';
    c.fillStyle = 'rgba(200,100,150, 0.6)';
    c.moveTo(points[0].x, points[0].y);
    for(let i = 0; i < points.length;i++){
        c.lineTo(points[i].x, points[i].y);
    }
    c.closePath();
    c.fill();
    c.stroke();
    
    points.forEach(p => {
        point(p.x, p.y, lightColors[1]);
    });
    points.forEach(p => {
        // p.translate(scalePoint(1), scalePoint(-4));
        p.enlarge(1, PlotX(1), PlotY(1));
    });
}

init();
// animate();

// addEventListener('click', function(event) {
//     x = event.clientX;
//     y = event.clientY;
//     console.log(toX(x), toY(y));
// });