const canvas = document.getElementById('shape');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');
let initialPoints = [];
let finalPoints = [];
let points = []; // Moving point
let scale = graphScale;


let hidePnts = false;
let charV = 0;
let nPoints; // number of points
let invC = { // line ax+bx=c
    h:1,
    k:1,
    r:1
};

clor = (I) =>{
    if(typeof I === 'number'){
        return `hsl(${(20*I)%360}, 80%, 60%)`; // Color for the points
    }
}


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
    invC.h = Number(document.querySelector("#h").value);
    invC.k = Number(document.querySelector("#k").value);
    invC.r = Number(document.querySelector("#r").value);
    // if(ln.a == 0 && ln.b == 0){
    //     alert("Coefficients of both x and y cannot be zero at once! Re-enter the values:");
    // }
}

emptyCheck = () => {
    let result = 1;
    document.querySelectorAll(".invert").forEach(element => {
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
        invert();
    }else{
        alert('Enter all coefficients in the equation!');
    }
};

function invert(){
    points = [];
    finalPoints = [];
    for(let i = 0; i<initialPoints.length; i++) {
        finalPoints.push(invertCirclePoint(Math.round(toX(initialPoints[i].x)*1000)/1000, Math.round(toY(initialPoints[i].y)*1000)/1000, invC.h, invC.k, invC.r));
        points.push(new Vertex(initialPoints[i].x, initialPoints[i].y, PlotX(finalPoints[i].x), PlotY(finalPoints[i].y)));
    }
}

function addPoint() {
    if(charV == 0) {
        initialPoints = [];
        points = [];
    }
    let x = document.querySelector('#x').value;
    let y = document.querySelector('#y').value;
    if(x == '' || x == 'null' || y == '' || y == 'null') {
        alert("Enter both values!");
        init();
        invert();
    }else{
        charV++;
        init();

        initialPoints.push(new Plot(PlotX(Number(x)), PlotY(Number(y))));

        invert();

        document.querySelector("#lbl").innerText = `P${charV+1}`;
        document.querySelector('#x').value = "";
        document.querySelector('#y').value = "";
        document.querySelector("#x").focus();
    }
}

function invCir() {
    invC.h = randomInt(-15,15);
    invC.k = randomInt(-15,15);
    invC.r = randomInt(1,10);
}

function init(){
    Origin.x = canvas.width/2;
    Origin.y = canvas.height/2;
    graphColor = 'white';
    drawGraph();


    if(!emptyCheck()) {
        // Inversion Circle
        invCir();
    }else{
        getCoeff();
        if(invC.r < 0) {
            alert('Radius cannot be negative!')
            invC.r *= -1;
        }
    }
    if(charV == 0) {
        document.querySelector("#lbl").innerText = "P1";
        initialPoints = [];
        finalPoints = [];
        points = [];
        nPoints = 2;
        for(let i = 0; i<nPoints; i++) {
            initialPoints.push(new Plot(PlotX(randomInt(-12,12)), PlotY(randomInt(-12,12))));
            if(i>0) {
                while(initialPoints[i-1].x == initialPoints[i].x && initialPoints[i-1].y == initialPoints[i].y) {
                    initialPoints[i] = new Plot(PlotX(randomInt(-12,12)), PlotY(randomInt(-12,12)));
                }
            }
            finalPoints.push(invertCirclePoint(Math.round(toX(initialPoints[i].x)*1000)/1000, Math.round(toY(initialPoints[i].y)*1000)/1000, invC.h, invC.k, invC.r));
            points.push(new Vertex(initialPoints[i].x, initialPoints[i].y, PlotX(finalPoints[i].x), PlotY(finalPoints[i].y)));
        }
    }
    
    c.lineJoin = "bevel"; // makes the corners smoother
}

document.querySelectorAll(".P").forEach(element => element.addEventListener("keyup", (event) => {
    if(event.key === "Enter") {
        addPoint();
    }
}));


document.querySelectorAll(".invert").forEach(element => element.addEventListener("keyup", (event) => {
    if(event.key === "Enter") {
        solve();
    }
}));

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0,canvas.width, canvas.height);
    
    point(PlotX(invC.h), PlotY(invC.k), 'aqua');
    drawCircle(c, PlotX(invC.h), PlotY(invC.k), invC.r*scale, 'aqua');
    writeText(c, `C`, PlotX(invC.h)+1, PlotY(invC.k)-1, 'aqua');
    
    for(let n = 0; n<points.length; n++) {
        connectColorFade(initialPoints[n].x, initialPoints[n].y, points[n].x, points[n].y, 0.7);
    }

    points.forEach((p,i) => {
        point(p.x, p.y, clor(i));
        p.update();
    });

    initialPoints.forEach((p,i) => {
        point(p.x, p.y, clor(i));
    });


    // Text portion
    let startP = new Plot(15, 25); // Starting location of text
    let gap = 25; // Gap between two lines

    writeText(c, `Circle of Inversion`, startP.x, startP.y, 'aqua');
    startP.y += gap;
    writeText(c, `Center (h, k) = C(${invC.h}, ${invC.k})`, startP.x, startP.y, 'aqua');
    startP.y += gap;
    if(invC.r === 1){    
        writeText(c, `Radius (r) = ${invC.r} unit`, startP.x, startP.y, 'aqua');
    }else{
        writeText(c, `Radius (r) = ${invC.r} units`, startP.x, startP.y, 'aqua');
    }
    
    if(!hidePnts){
        c.font = 'normal 25px times';
        c.fillStyle = 'lime';
        c.fillText(`Initial Points`, startP.x, startP.y+gap);
        for(let i = 0; i<initialPoints.length; i++) {
            let Pname = `P${i+1}`;
            c.fillStyle = clor(i);
            c.fillText(`\u2022 ${Pname}(${Math.round(toX(initialPoints[i].x)*1000)/1000}, ${Math.round(toY(initialPoints[i].y)*1000)/1000})`, startP.x, startP.y + gap*(i+2));
            c.fillText(`${Pname}`, initialPoints[i].x + 2, initialPoints[i].y - 2); // labelling initial point
            c.fillText(`${Pname}\'`, points[i].x + 2, points[i].y - 2); // labelling moving point
        }

        c.fillStyle = 'yellow';
        c.fillText(`Inverted Points`, startP.x, startP.y + gap*(initialPoints.length+2));
        for(let i = 0; i<initialPoints.length; i++) {
            let Pname = `P${i+1}`;
            c.fillStyle = clor(i);
            c.fillText(`\u2022 ${Pname}\'(${Math.round(toX(points[i].x)*1000)/1000}, ${Math.round(toY(points[i].y)*1000)/1000})`, startP.x, startP.y + gap*(i+initialPoints.length+3));
        }
    }
}

init();
animate();


document.querySelector('#showPoints').addEventListener('click', function(){
    hidePnts = document.querySelector('#showPoints').checked ? true: false;
});

document.getElementById('MyBtn').onclick = function() {
    solve();
};

document.getElementById("clear").onclick = function() {
    charV = 0;
    hidePnts = false;
    init();
};

document.querySelector('#Add').onclick = function() {
    addPoint();
}