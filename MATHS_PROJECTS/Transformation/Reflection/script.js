const canvas = document.getElementById('shape');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');
let initialPoints = [];
let finalPoints = [];
let points = []; // Moving point
let scale = graphScale;

let charV = 0;
let nPoints; // number of points
let ln = { // line ax+bx=c
    a:1,
    b:1,
    c:1
};

addEventListener("resize", () => {
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
    }else{
        graphColor = 'white';
        drawGraph();
    }
});

function Plot(x, y) {
    this.x = x;
    this.y = y;
}

function Vertex(x, y, final_X, final_Y) {
    this.x = x;
    this.y = y;
    this.final_X = final_X;
    this.final_Y = final_Y;
    this.dx = (this.final_X - this.x)/100;
    this.dy = (this.final_Y - this.y)/100;

    this.update = () => {
        if(Math.round(this.x*1000)/1000 != Math.round(this.final_X*1000)/1000) {
            this.x += this.dx;
        }
        if(Math.round(this.y*1000)/1000 != Math.round(this.final_Y*1000)/1000) {
            this.y += this.dy;
        }
    }

    this.draw = function() {
        
    }
}

getCoeff = () => {
    ln.a = Number(document.querySelector("#a1").value);
    ln.b = Number(document.querySelector("#b1").value);
    ln.c = Number(document.querySelector("#c1").value);
    if(ln.a == 0 && ln.b == 0){
        alert("Coefficients of both x and y cannot be zero at once! Re-enter the values:");
    }
}

emptyCheck = () => {
    let result = 1;
    document.querySelectorAll(".reflect").forEach(element => {
        if(element.value == '' || element.value == 'null') {
            result *= 0;
        }else{
            result *= 1;
        }
    });
    return result;
}

solve = () => {
    if(emptyCheck()){
        init();
        reflect();
    }else{
        alert('Enter all coefficients in the equation!');
    }
};

function reflect(){
    points = [];
    finalPoints = [];
    for(let i = 0; i<initialPoints.length; i++) {
        finalPoints.push(reflectPoint(initialPoints[i].x, initialPoints[i].y, ln.a, ln.b, ln.c));
        points.push(new Vertex(PlotX(initialPoints[i].x), PlotY(initialPoints[i].y), PlotX(finalPoints[i].x), PlotY(finalPoints[i].y)));
    }
}

function addPoint() {
    if(charV == 0) {
        initialPoints = [];
        points = [];
    }
    if(charV<=9) {
        let x = document.querySelector('#x').value;
        let y = document.querySelector('#y').value;
        if(x == '' || x == 'null' || y == '' || y == 'null') {
            alert("Enter both values!");
            init();
            // reflect();
        }else{
            charV++;
            initialPoints.push(new Plot(Number(x), Number(y)));
            init();


            // reflect();

            document.querySelector("#lbl").innerText = String.fromCharCode(65 + charV);
            document.querySelector('#x').value = "";
            document.querySelector('#y').value = "";
            document.querySelector("#x").focus();
        }
    }else{
        alert('Polygon sides limit reached');
    }
}

function refLine() {
    ln.a = randomInt(-15,15);
    ln.b = randomInt(-15,15);
    ln.c = randomInt(-15,15);
    while(ln.a == 0 && ln.b == 0 ) {
        ln.a = randomInt(-10,10);
        ln.b = randomInt(-10,10);
    }
}

function init(){
    Origin.x = canvas.width/2;
    Origin.y = canvas.height/2;
    graphColor = 'white';
    drawGraph();

    if(!emptyCheck()) {
        // Line of reflection
        refLine();
    }else{
        getCoeff();
        if(ln.a == 0 && ln.b == 0) {
            refLine();
        }
    }
    if(charV == 0) {
        document.querySelector("#lbl").innerText = "A";
        initialPoints = [];
        finalPoints = [];
        points = [];
        nPoints = 3;

        for(let i = 0; i<nPoints; i++) {
            initialPoints.push(new Plot(randomInt(-12,12), randomInt(-12,12)));
            if(i>0) {
                while(initialPoints[i-1].x == initialPoints[i].x && initialPoints[i-1].y == initialPoints[i].y) {
                    initialPoints[i] = new Plot(randomInt(-12,12), randomInt(-12,12));
                }
            }
            finalPoints.push(reflectPoint(initialPoints[i].x, initialPoints[i].y, ln.a, ln.b, ln.c));
            points.push(new Vertex(PlotX(initialPoints[i].x), PlotY(initialPoints[i].y), PlotX(finalPoints[i].x), PlotY(finalPoints[i].y)));
        }
    }else{
        reflect();
    }
    
    c.lineJoin = "bevel"; // makes the corners smoother
}

document.querySelectorAll(".P").forEach(element => element.addEventListener("keyup", (event) => {
    if(event.key === "Enter") {
        addPoint();
    }
}));

document.querySelectorAll(".reflect").forEach(element => element.addEventListener("keyup", (event) => {
    if(event.key === "Enter") {
        solve();
    }
}));

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0,canvas.width, canvas.height);

    if(ln.b!=0) {
        line(-ln.a/ln.b, ln.c/ln.b, 'aqua');
    }else{
        c.strokeStyle = 'aqua';
        c.beginPath();
        for(let i = 0; i<canvas.height; i++) {
            c.lineTo(PlotX(ln.c/ln.a), i);
        }
        c.stroke();
    }

    c.lineWidth = 1.5;
    c.strokeStyle = 'lime'; // Colors of the sides of the polygon
    c.fillStyle = 'rgba(150,200,255, 0.4)'; // Shading color of the polygon

    c.beginPath();
    c.moveTo(PlotX(initialPoints[0].x), PlotY(initialPoints[0].y));
    for(let i = 0; i < initialPoints.length;i++){
        c.lineTo(PlotX(initialPoints[i].x), PlotY(initialPoints[i].y));
    }
    c.closePath();
    c.fill();
    c.stroke();

    c.strokeStyle = 'gold'; // Colors of the sides of the polygon
    c.fillStyle = 'rgba(207,255,238, 0.4)'; // Shading color of the polygon
    c.beginPath();
    c.moveTo(points[0].x, points[0].y);
    for(let i = 0; i < points.length; i++){
        c.lineTo(points[i].x, points[i].y);
    }
    c.closePath();
    c.fill();
    c.stroke();

    // total translation
    for(let n = 0; n<points.length; n++) {
        connectColorFade(PlotX(initialPoints[n].x), PlotY(initialPoints[n].y), points[n].x, points[n].y, 0.7);
    }

    points.forEach((p,i) => {
        point(p.x, p.y, lightColors[i+1]);
        p.update();
    });

    initialPoints.forEach((p,i) => {
        point(PlotX(p.x), PlotY(p.y), lightColors[i+1]);
    });


    // Text portion
    let startP = new Plot(15, 25); // Starting location of text
    let gap = 25; // Gap between two lines
    c.font = 'normal 25px verdana';
    c.fillStyle = 'aqua';

    if(ln.a!=0 && ln.b!=0) {
        if(ln.b>=0){
            c.fillText(`\u2022 Line of reflection: ${ln.a}x + ${ln.b}y = ${ln.c}`, startP.x, startP.y);
        }else{
            c.fillText(`\u2022 Line of reflection: ${ln.a}x - ${modulus(ln.b)}y = ${ln.c}`, startP.x, startP.y);
        }
    }else if(ln.a == 0 && ln.b != 0){
        c.fillText(`\u2022 Line of reflection: y = ${roundUp(ln.c/ln.b, 10000)}`, startP.x, startP.y);
    }else if(ln.b == 0 && ln.a != 0){
        c.fillText(`\u2022 Line of reflection: x = ${roundUp(ln.c/ln.a, 10000)}`, startP.x, startP.y);
    }
    c.font = 'normal 25px times';
    c.fillStyle = 'lime';
    c.fillText(`Initial Points`, startP.x, startP.y+gap);
    for(let i = 0; i<initialPoints.length; i++) {
        let Pname = String.fromCharCode(65+i);
        c.fillStyle = lightColors[i+1];
        c.fillText(`\u2022 ${Pname}(${initialPoints[i].x}, ${initialPoints[i].y})`, startP.x, startP.y + gap*(i+2));
        c.fillText(`${Pname}`, PlotX(initialPoints[i].x) + 2, PlotY(initialPoints[i].y) - 2); // labelling initial point
        c.fillText(`${Pname}\'`, points[i].x + 2, points[i].y - 2); // labelling moving point
    }

    c.fillStyle = 'yellow';
    c.fillText(`Reflected Points`, startP.x, startP.y + gap*(initialPoints.length+2));
    for(let i = 0; i<initialPoints.length; i++) {
        let Pname = String.fromCharCode(65+i);
        c.fillStyle = lightColors[i+1];
        c.fillText(`\u2022 ${Pname}\'(${Math.round(toX(points[i].x)*1000)/1000}, ${Math.round(toY(points[i].y)*1000)/1000})`, startP.x, startP.y + gap*(i+initialPoints.length+3));
    }
}

init();
animate();

document.getElementById('MyBtn').onclick = function() {
    solve();
};

document.getElementById("clear").onclick = function() {
    charV = 0;
    init();
};

document.querySelector('#Add').onclick = function() {
    addPoint();
}