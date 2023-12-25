const canvas = document.querySelector('#lines');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');
let scale = graphScale;
graphColor = 'white';
drawGraph();

class Point{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

let play = true; // Play pause the animation
let m, yInt; // Slope and y-intersept of tangent line
const Pr = {A:0, B:0, C:0}; // Coefficients of x in quadratic equation Ax^2 + Bx + C
let V = new Point(0, 0); // Vertex of parabola
let temp;
let dx; // Change in x

addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

function P(x, y){
    this.x = x;
    this.y = y;

    this.update = function(){
        this.y = pY(this.x);
        temp = 2*Pr.A*this.x + Pr.B;
        m = temp;
        yInt = this.y - this.x*temp;
    }
}

let movingPoint = new P(0, 0); // Point of contact of line and curve
let Cv = new P(0, 0); // Converted values of moving point as PlotX, PlotY

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    Cv.x = PlotX(movingPoint.x);
    Cv.y = PlotY(movingPoint.y);

    connectColorDashed(c, Cv.x, 0, Cv.x, canvas.height, 0.4)
    parabola(c, Pr.A, V.x, V.y, 'magenta');
    line(c, m, yInt, 'aqua');
    if(Cv.x >= canvas.width || Cv.x <= 0){    
        dx *= -1;
    }
    if(play){
        movingPoint.x += dx;
        movingPoint.update();
    }

    point(Cv.x, Cv.y, 'red');
    c.fillStyle = lightColors[1];
    c.fillText(`Equation of tangent: y = ${roundUp(m, 1000)}x + ${roundUp(yInt, 1000)}`, 20, 50);
    c.fillText(`x = ${roundUp(movingPoint.x,1000)}`, 20, 75);

    // c.beginPath();
    // for(let i =0; i<canvas.width; i++){
    //     let x = toX(i);
    //     c.lineTo(PlotX(x), PlotY(Math.sin(x)));
    // }
    // c.stroke();

    // c.beginPath();
    // for(let i =0; i<canvas.width; i++){
    //     let x = toX(i);
    //     c.lineTo(PlotX(x), PlotY(Math.cos(x)));
    // }
    // c.stroke();

    // c.beginPath();
    // for(let i =0; i<canvas.width; i++){
    //     let x = toX(i);
    //     c.lineTo(PlotX(x), PlotY(Math.sin(x)));
    // }
    // c.stroke();

    // c.strokeStyle = 'red';
    // c.beginPath();
    // for(let i =0; i<window.innerWidth; i++){
    //     let x = toX(i);
    //     let y = Math.pow(Math.E, x);
    //     c.lineTo(PlotX(x), PlotY(y));
    // }
    // c.stroke();
}

addEventListener('click', function(){
    play = !play;
});

function pY(x){ // Y-coordinate of parabola at x
    let y = Pr.A*x*x + Pr.B*x + Pr.C;
    return y;
}

function init(){
    c.font = '24px normal times'
    play = true;

    Pr.A = 0.08;

    // Has some problem when value of Pr.B is other than 0
    Pr.B = -1;
    Pr.C = -2;
    dx = 0.008;
    V.x = -Pr.B/(2*Pr.A);
    V.y = pY(V.x);
    movingPoint.x = randomInt(-5, 5);
    movingPoint.y = pY(movingPoint.x);
    temp = 2*Pr.A*movingPoint.x + Pr.B;
    m = temp;
    yInt = movingPoint.y - movingPoint.x*temp;
}

init();
animate();