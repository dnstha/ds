let a1, b1, c1, a2, b2, c2; // Coefficients from input
let A, B, C, discriminant, denominator; // Variables for solving the system of eqns
let P1, P2; // Solutions of the equation
let m; // Slope of the line
let yInt; // y-intercept of the line

const canvas = document.getElementById('line');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d');

let color1,color2;
let scale = 25;

let s = document.getElementById("ambiguous");

function Point(x, y) {
    this.x = x;
    this.y = y;
}

P1 = new Point(undefined, undefined);
P2 = new Point(undefined, undefined);

clearSpan = () => {
    s.innerText = "";
}

getCoeff = () => {
    a1 = Number(document.getElementById("a1").value);
    b1 = Number(document.getElementById("b1").value);
    c1 = Number(document.getElementById("c1").value);
    a2 = Number(document.getElementById("a2").value);
    if(!filled("#b2")){
        b2 = 0;
    }else{
        b2 = Number(document.getElementById("b2").value);
    }
    c2 = Number(document.getElementById("c2").value);
    getValues();
}

getValues = () => {
    A = a1;
    if(b2 != 0) {
        m = -a2/b2;
        B = b1 - m;
        C = c1 - c2/b2;
        discriminant = B*B - 4*A*C;
    }
    denominator = 2*A;
    if (a1 != 0 && (filled("#a2") || filled("#b2"))) {
        if((discriminant>0 && b2!=0) || b2==0){
            if(b2 == 0) { // If the line is parallel to Y-axis
                P1.x = c2/a2;
                P2.x = P1.x;
            }else{
                P1.x = (-B + Math.sqrt(discriminant)) / denominator;
                P2.x = (-B - Math.sqrt(discriminant)) / denominator;
            }

            if(P1.x > P2.x) {
                let swap = P1.x;
                P1.x = P2.x;
                P2.x = swap;
            }

            P1.y = (a1*P1.x + b1)*P1.x + c1;
            P2.y = (a1*P2.x + b1)*P2.x + c1;
        }else if(discriminant == 0) {
            P1.x = (-B)/denominator;
            P2.x = P1.x;
            P1.y = (a1*P1.x + b1)*P1.x + c1;
            P2.y = P1.y;
        }
    }
}

solve = () => {
    getCoeff();
    clearSpan();

    if(discriminant>=0 || b2==0) {
        document.getElementById("P1").value = `(${roundUp(P1.x, 1000)}, ${roundUp(P1.y, 1000)})`;
        document.getElementById("P2").value = `(${roundUp(P2.x, 1000)}, ${roundUp(P2.y, 1000)})`;
        if(discriminant == 0) {
            s.innerText = `The line is tangent to the curve at point (${roundUp(P1.x, 1000)}, ${roundUp(P1.y, 1000)})`;
        }else if(b2 == 0){
            s.innerText = `The line intersects the curve at point (${roundUp(P1.x, 1000)}, ${roundUp(P1.y, 1000)})`
        }
    }else if(discriminant<0){
        document.getElementById("P1").value = "";
        document.getElementById("P2").value = "";
        s.innerText = `The line and the curve do not intersect, and the system has no real solution!`
    }

    graph();
};

function final(){
    if(!filled(".qcomp")){
        alert("Enter the coefficient of x^2!");
    }else if(a2==0 && b2==0){
        alert("Enter coefficient of either x or y!")
    }else{    
        solve();
    }
}

document.querySelector('#MyBtn').onclick = function() {
    final();
};
document.querySelectorAll(".coeff").forEach(element => element.addEventListener("keyup", function(event) {
    if(event.key === "Enter") {
        final();
    }
}));

addEventListener('resize', function() {
    // Check if the window size has significantly changed
    const widthChange = Math.abs(canvas.width - window.innerWidth);
    const heightChange = Math.abs(canvas.height - window.innerHeight);

    // Define a threshold for changes (you can adjust this)
    const threshold = 0.01; // Adjust as needed

    if (widthChange > threshold || heightChange > threshold) {
        // Update the previous dimensions
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Call the init function here
        init();
        graph();
    }else{
        graph();
    }
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

curve = (a, vertex_X, vertex_Y, color) => {
    a /= scale;
    vertex_X = PlotX(vertex_X);
    vertex_Y = PlotY(vertex_Y);

    c.strokeStyle = color;
    c.lineWidth = 2;
    c.beginPath();

    if(vertex_X>=0 && vertex_X<=window.innerWidth){
        // vertex_X lies within the window in this case
        let lDist = vertex_X;
        let rDist = modulus(window.innerWidth - vertex_X);

        // drawing right side of the vertex
        for(let i=0; i<=rDist;i++){
            c.lineTo(vertex_X+i, vertex_Y-i*i*a);
        }
        c.stroke();

        // drawing left side of the vertex
        c.beginPath();
        for(let i=0; i<=lDist;i++){
            c.lineTo(vertex_X-i, vertex_Y-i*i*a);
        }
        c.stroke();
    }else if(vertex_X<0 || vertex_X>window.innerWidth){
        // vertex_X lies out of the window in this case
        let traceLocus = vertex_X;
        if(vertex_X<0){
            for(traceLocus=vertex_X; (traceLocus+vertex_X)<=window.innerWidth;traceLocus++){
                if(traceLocus+vertex_X>0){
                    c.lineTo(vertex_X+traceLocus, vertex_Y-traceLocus*traceLocus*a);
                }
            }
        }else if(vertex_X>window.innerWidth){
            for(traceLocus=vertex_X; (traceLocus+vertex_X)>=0; traceLocus--){
                if((traceLocus-vertex_X)<window.innerWidth){
                    c.lineTo(vertex_X-traceLocus, vertex_Y-traceLocus*traceLocus*a);
                }
            }
        }
        c.stroke();
    }
}

// curve = (a, vertex_X, Vertex_Y, color) => {
//     vertex_X *= scale;
//     Vertex_Y *= scale;
//     a /= scale;
//     let rangeOfLocus = Math.round(modulus(canvas.width-vertex_X));

//     c.strokeStyle = color;
//     c.beginPath();
//     for(let i=0; i<rangeOfLocus;i++){
//         c.lineTo(Origin.x+i+vertex_X, Origin.y-i*i*a-Vertex_Y);
//     }
//     c.stroke();
//     c.beginPath();
//     for(let i=0; i<rangeOfLocus;i++){
//         c.lineTo(Origin.x-i+vertex_X, Origin.y-i*i*a-Vertex_Y);
//     }
//     c.stroke();
// }

function init(){
    c.clearRect(0,0,canvas.width, canvas.height);
    Origin.x = canvas.width/2;
    Origin.y = canvas.height/2;
}

init();

function graph() {
    init();
    color1 = '#df00bb';
    color2 = '#0004ff';
    if(a1 != 0){
        let vX = -b1/(2*a1); // x-coordinate of vertex of parabola
        let vY = (a1*vX + b1)*vX + c1; // y-coordinate of vertex of parabola
        c.lineWidth = 2;
        curve(a1, vX, vY, color1)
        // point(PlotX(vX), PlotY(vY), 'black');
    }
    
    if(b2 == 0) {
        c.strokeStyle = color2;
        c.beginPath();
        for(let j=0; j<canvas.height;j++){
            c.lineTo(Origin.x + c2/a2 * scale, j);
        }
        c.stroke();
        point(PlotX(P1.x), PlotY(P1.y), "black");
    }else{
        m = -a2/b2;
        yInt = c2/b2;
        line(m, yInt, color2);
    }
    if(discriminant > 0 && a1 != 0){
        point(PlotX(P1.x), PlotY(P1.y), "black");
        point(PlotX(P2.x), PlotY(P2.y), "black");
    }else if(discriminant == 0 && a1 != 0) {
        point(PlotX(P1.x), PlotY(P1.y), "black");
    }
}

document.querySelectorAll(".coeff").forEach(element => element.addEventListener("keyup", function(){
    getCoeff();
    graph();
}));

document.getElementById("clear").onclick = function() {
    init();
    clearSpan();

    // Clearing all the values of coefficients to avoid bugs while resizing or doing later tasks
    P1.x = P1.y = P2.x = P2.y = undefined;
    a1 = a2 = b1 = b2 = c1 = c2 = undefined;
};