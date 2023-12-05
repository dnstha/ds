const canvas = document.getElementById('shape');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');
let initialPoints = [];
let points = []; // Moving point
let scale = graphScale;
let charV = 0; // Changing char value

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
let rotAngle, angle, totAngle;
let rotPoint;
let nPoints; // number of points

getCoeff = () => {
    rotPoint = new Plot(Number(document.getElementById("Rx").value), Number(document.getElementById("Ry").value));
    rotAngle = Number(document.getElementById("rotAngle").value);
}

emptyCheck = () => {
    let result = 1;
    document.querySelectorAll(".rotation").forEach(element => {
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
    }else{
        alert('Enter Rotation Point and Angle properly!');
    }
};

function init(){
    Origin.x = canvas.width/2;
    Origin.y = canvas.height/2;
    graphColor = 'white';
    drawGraph();

    // Declaring the transformation points and values based on different conditions
    if(charV == 0) {
        document.querySelector("#lbl").innerText = "A";
        initialPoints = [];
        points = [];
        nPoints = 3;
        for(let i = 0; i<nPoints; i++) {
            points.push(new Complex(PlotX(randomInt(-12,12)), PlotY(randomInt(-12,12))));
            if(i>0) {
                while(points[i-1].x == points[i].x && points[i-1].y == points[i].y) {
                    points[i] = new Complex(PlotX(randomInt(-12,12)), PlotY(randomInt(-12,12)));
                }
            }
            initialPoints.push(new Plot(points[i].x, points[i].y));
        }
    }
    if(!emptyCheck()){
        rotPoint = new Plot(randomInt(-10,10), randomInt(-10,10));
        rotAngle = randomInt(-360,360);
    }else{
        getCoeff();
    }
    for(let i = 0; i<initialPoints.length; i++) {
        points[i].x = initialPoints[i].x;
        points[i].y = initialPoints[i].y;
    }
    totAngle = 0;
    angle = rotAngle/(Math.ceil(modulus(rotAngle)/100)*100);

    c.lineJoin = "bevel"; // makes the corners smoother
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0,canvas.width, canvas.height);
    
    c.lineWidth = 1.5;
    c.strokeStyle = 'lime'; // Colors of the sides of the stable polygon
    c.fillStyle = 'rgba(150,200,255, 0.4)'; // Shading color of the stable polygon

    c.beginPath();
    c.moveTo(initialPoints[0].x, initialPoints[0].y);
    for(let i = 0; i < initialPoints.length;i++){
        c.lineTo(initialPoints[i].x, initialPoints[i].y);
    }
    c.closePath();
    c.fill();
    c.stroke();

    c.strokeStyle = 'gold'; // Colors of the sides of the mobile polygon
    c.fillStyle = 'rgba(207,255,238, 0.4)'; // Shading color of the mobile polygon
    c.beginPath();
    c.moveTo(points[0].x, points[0].y);
    for(let i = 0; i < points.length;i++){
        c.lineTo(points[i].x, points[i].y);
    }
    c.closePath();
    c.fill();
    c.stroke();    

    
    for(let n = 0; n<points.length; n++) {
        connectColorFade(PlotX(rotPoint.x), PlotY(rotPoint.y), initialPoints[n].x, initialPoints[n].y, 0.4);
    }
    initialPoints.forEach((p,i) => {
        point(p.x, p.y, lightColors[i+1]);
    });

    for(let n = 0; n<points.length; n++) {
        connectColorFade(PlotX(rotPoint.x), PlotY(rotPoint.y), points[n].x, points[n].y, 0.4);
    }
    points.forEach((p,i) => {
        point(p.x, p.y, lightColors[i+1]);
        if(Math.round(totAngle*1000)/1000 != Math.round(rotAngle*1000)/1000) {
            p.rotate(angle, rotPoint.x, rotPoint.y);
        }else{
            angle = 0;
        }
    });

    // Increasing the total angle each time this function is called
    totAngle += angle;


    // Text Section
    let startP = new Plot(15, 25); // Starting location of text
    let gap = 25; // Gap between two lines
    c.font = 'normal 25px verdana';

    c.fillStyle = 'aqua';
    c.fillText(`Center of Rotation = R(${rotPoint.x}, ${rotPoint.y})`, startP.x, startP.y);
    c.fillText(`Rotation = ${Math.round(totAngle*1000)/1000}\xB0`, startP.x, startP.y + gap);

    c.font = 'normal 25px times';
    c.fillStyle = 'lime';
    c.fillText(`Initial Points`, startP.x, startP.y + gap*2);
    for(let i = 0; i<points.length; i++) {
        let Pname = String.fromCharCode(65+i);
        c.fillStyle = lightColors[i+1];
        c.fillText(`\u2022 ${Pname}(${Math.round(toX(initialPoints[i].x)*1000)/1000}, ${Math.round(toY(initialPoints[i].y)*1000)/1000})`, startP.x, startP.y + gap*(i+3));
        c.fillText(`${Pname}`, initialPoints[i].x + 2, initialPoints[i].y - 2); // labelling initial point
        c.fillText(`${Pname}\'`, points[i].x + 2, points[i].y - 2); // labelling moving point
    }
    

    c.fillStyle = 'yellow';
    c.fillText(`Rotated Points`, startP.x, startP.y + gap * (points.length + 3));
    for(let i = 0; i<points.length; i++) {
        let Pname = String.fromCharCode(65+i);
        c.fillStyle = lightColors[i+1];
        c.fillText(`\u2022 ${Pname}\'(${Math.round(toX(points[i].x)*1000)/1000}, ${Math.round(toY(points[i].y)*1000)/1000})`, startP.x, startP.y + gap*(i+(points.length+4)));
    }

    // Connects to the centroid of the triangle
    // connectColor(PlotX(rotPoint.x), PlotY(rotPoint.y), average(points[0].x, points[1].x, points[2].x), average(points[0].y, points[1].y, points[2].y), 'magenta');
    
    point(PlotX(rotPoint.x), PlotY(rotPoint.y), 'aqua');
    c.fillText('R', PlotX(rotPoint.x) + 5, PlotY(rotPoint.y) + 7); // labelling rotating Point
}

init();
animate();


document.querySelectorAll(".P").forEach(element => element.addEventListener("keyup", (event) => {
    if(event.key === "Enter") {
        addPoint();
    }
}));

document.querySelectorAll(".rotation").forEach(element => element.addEventListener("keyup", (event) => {
    if(event.key === "Enter") {
        solve();
    }
}));

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
        }else{
            charV++;
            document.querySelector("#lbl").innerText = String.fromCharCode(65 + charV);
            initialPoints.push(new Plot(PlotX(Number(x)), PlotY(Number(y))));
            points.push(new Complex(initialPoints[charV-1].x, initialPoints[charV-1].y));
            document.querySelector('#x').value = "";
            document.querySelector('#y').value = "";
            document.querySelector("#x").focus();
            init();
        }
    }else{
        alert('Polygon sides limit reached');
    }
}

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