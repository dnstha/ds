const canvas = document.getElementById('shape');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');
let initialPoints = [];
let finalPoints = [];
let points = []; // Moving point
let scale = graphScale;

let charV = 0;
let V;
let nPoints; // number of points

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
        if((Math.round(this.x*1000)/1000 == Math.round(this.final_X*1000)/1000) && Math.round(this.y*1000)/1000 != Math.round(this.final_Y*1000)/1000) {
            this.y += this.dy;
        }
    }

    this.draw = function() {
        
    }
}

getCoeff = () => {
    V = new Plot(Number(document.getElementById("Vx").value), Number(document.getElementById("Vy").value));
}

emptyCheck = () => {
    let result = 1;
    document.querySelectorAll(".translate").forEach(element => {
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
        trnslte();
    }else{
        alert('Enter both the translation vector values!');
    }
};

function trnslte(){
    points = [];
    finalPoints = [];
    for(let i = 0; i<initialPoints.length; i++) {
        finalPoints.push(new Complex(initialPoints[i].x, initialPoints[i].y));
        finalPoints[i].translate(V.x, V.y);
        points.push(new Vertex(initialPoints[i].x, initialPoints[i].y, finalPoints[i].x, finalPoints[i].y));
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
            trnslte();
        }else{
            charV++;
            init();

            initialPoints.push(new Plot(PlotX(Number(x)), PlotY(Number(y))));

            trnslte();

            document.querySelector("#lbl").innerText = String.fromCharCode(65 + charV);
            document.querySelector('#x').value = "";
            document.querySelector('#y').value = "";
            document.querySelector("#x").focus();
        }
    }else{
        alert('Polygon sides limit reached');
    }
}

function init(){
    Origin.x = canvas.width/2;
    Origin.y = canvas.height/2;
    graphColor = 'white';
    drawGraph();

    if(!emptyCheck()) {
        V = new Plot(randomInt(-10,10), randomInt(-10,10)); // Translation Vector
    }else{
        getCoeff();
    }
    if(charV == 0) {
        document.querySelector("#lbl").innerText = "A";
        initialPoints = [];
        finalPoints = [];
        points = [];
        nPoints = 3;

        for(let i = 0; i<nPoints; i++) {
            initialPoints.push(new Plot(PlotX(randomInt(-12,12)), PlotY(randomInt(-12,12))));
            if(i>0) {
                while(initialPoints[i-1].x == initialPoints[i].x && initialPoints[i-1].y == initialPoints[i].y) {
                    initialPoints[i] = new Plot(PlotX(randomInt(-12,12)), PlotY(randomInt(-12,12)));
                }
            }
            finalPoints.push(new Complex(initialPoints[i].x, initialPoints[i].y));
            finalPoints[i].translate(V.x, V.y);
            points.push(new Vertex(initialPoints[i].x, initialPoints[i].y, finalPoints[i].x, finalPoints[i].y));
        }
    }

    c.lineJoin = "bevel"; // makes the corners smoother
}

document.querySelectorAll(".P").forEach(element => element.addEventListener("keyup", (event) => {
    if(event.key === "Enter") {
        addPoint();
    }
}));

document.querySelectorAll(".translate").forEach(element => element.addEventListener("keyup", (event) => {
    if(event.key === "Enter") {
        solve();
    }
}));

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0,canvas.width, canvas.height);
    
    points.forEach((p,i) => {
        point(p.x, p.y, lightColors[i+1]);
        p.update();
    });

    c.lineWidth = 1.5;
    c.strokeStyle = 'lime'; // Colors of the sides of the polygon
    c.fillStyle = 'rgba(150,200,255, 0.4)'; // Shading color of the polygon

    c.beginPath();
    c.moveTo(initialPoints[0].x, initialPoints[0].y);
    for(let i = 0; i < initialPoints.length;i++){
        c.lineTo(initialPoints[i].x, initialPoints[i].y);
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

    // x translation
    for(let n = 0; n<points.length; n++) {
        connectColorFade(initialPoints[n].x, initialPoints[n].y, points[n].x, initialPoints[n].y, 0.4);
    }

    // y translation
    for(let n = 0; n<points.length; n++) {
        connectColorFade(points[n].x, initialPoints[n].y, points[n].x, points[n].y, 0.4);
    }

    // total translation
    for(let n = 0; n<points.length; n++) {
        connectColorFade(initialPoints[n].x, initialPoints[n].y, points[n].x, points[n].y, 0.7);
    }

    initialPoints.forEach((p,i) => {
        point(p.x, p.y, lightColors[i+1]);
    });

    let startP = new Plot(15, 25); // Starting location of text
    let gap = 25; // Gap between two lines
    c.font = 'normal 25px verdana';
    c.fillStyle = 'aqua';
    c.fillText(`\u2022 Translation Vector = V(${V.x}, ${V.y})`, startP.x, startP.y);

    c.font = 'normal 25px times';
    c.fillStyle = 'lime';
    c.fillText(`Initial Points`, startP.x, startP.y+gap);
    for(let i = 0; i<initialPoints.length; i++) {
        let Pname = String.fromCharCode(65+i);
        c.fillStyle = lightColors[i+1];
        c.fillText(`\u2022 ${Pname}(${Math.round(toX(initialPoints[i].x)*1000)/1000}, ${Math.round(toY(initialPoints[i].y)*1000)/1000})`, startP.x, startP.y + gap*(i+2));
        c.fillText(`${Pname}`, initialPoints[i].x + 2, initialPoints[i].y - 2); // labelling initial point
        c.fillText(`${Pname}\'`, points[i].x + 2, points[i].y - 2); // labelling moving point
    }

    c.fillStyle = 'yellow';
    c.fillText(`Translated Points`, startP.x, startP.y + gap*(initialPoints.length+2));
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

/*
The root cause of the bug is resize eventListener. Each time the input box is called, the resize event is fired and as a result the graph goes crazy

addEventListener('resize', function() {
    alert("Called!");
})


This can be used to solve it

let prevWidth = window.innerWidth;
let prevHeight = window.innerHeight;

// Add a resize event listener
window.addEventListener("resize", () => {
    // Check if the window size has significantly changed
    const widthChange = Math.abs(prevWidth - window.innerWidth);
    const heightChange = Math.abs(prevHeight - window.innerHeight);

    // Define a threshold for changes (you can adjust this)
    const threshold = 50; // Adjust as needed

    if (widthChange > threshold || heightChange > threshold) {
        // Update the previous dimensions
        prevWidth = window.innerWidth;
        prevHeight = window.innerHeight;

        // Call the init function here
        init();
    }
});

*/
