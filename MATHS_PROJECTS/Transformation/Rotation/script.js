const canvas = document.getElementById('shape');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');
let initialPoints = [];
let points = []; // Moving point
let scale = graphScale;

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
    // points[0].x = PlotX(Number(document.getElementById("x1").value));
    // points[0].y = PlotY(Number(document.getElementById("y1").value));
    // points[1].x = PlotX(Number(document.getElementById("x2").value));
    // points[1].y = PlotY(Number(document.getElementById("y2").value));
    // points[2].x = PlotX(Number(document.getElementById("x3").value));
    // points[2].y = PlotY(Number(document.getElementById("y3").value));
    // for(let i = 0; i<points.length; i++) {
    //     initialPoints[i].x = points[i].x;
    //     initialPoints[i].y = points[i].y;
    // }
    rotAngle = Number(document.getElementById("rotAngle").value);
    for(let i = 0; i< nPoints; i++) {
        initialPoints.push(new Plot(PlotX(Number(document.getElementById(`x${i+1}`).value)), PlotY(Number(document.getElementById(`y${i+1}`).value))));
        points.push(new Complex(initialPoints[i].x, initialPoints[i].y));
    }
}

emptyCheck = () => {
    let result = 1;
    document.querySelectorAll("input").forEach(element => {
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
        alert('Enter all the inputs!');
    }
};

function init(){
    Origin.x = canvas.width/2;
    Origin.y = canvas.height/2;
    graphColor = 'white';
    drawGraph();

    initialPoints = [];
    points = [];
    nPoints = 3;
    if(!emptyCheck()) {
        rotPoint = new Plot(randomInt(-10,10), randomInt(-10,10));
        rotAngle = randomInt(-360,360);
        for(let i = 0; i<nPoints; i++) {
            points.push(new Complex(PlotX(randomInt(-12,12)), PlotY(randomInt(-12,12))));
            if(i>0) {
                while(points[i-1].x == points[i].x && points[i-1].y == points[i].y) {
                    points[i] = new Complex(PlotX(randomInt(-12,12)), PlotY(randomInt(-12,12)));
                }
            }
            initialPoints.push(new Plot(points[i].x, points[i].y));
        }
    }else{
        getCoeff();
    }
    totAngle = 0;
    angle = rotAngle/(Math.ceil(modulus(rotAngle)/100)*100);

    c.lineJoin = "bevel"; // makes the corners smoother

    // points.forEach(p => {
    //     p.scale(2, 0, 0);
    //     p.translate(0,0);
    //     p.rotate(270, 0, 0);
    // });
    // c.beginPath();
    // c.lineWidth = 1.5;
    // c.strokeStyle = 'darkblue';
    // c.fillStyle = 'rgba(150,200,250, 0.6)';
    // c.moveTo(points[0].x, points[0].y);
    // for(let i = 0; i < points.length;i++){
    //     c.lineTo(points[i].x, points[i].y);
    // }
    // c.closePath();
    // c.fill();
    // c.stroke();
    
    // points.forEach((p,i) => {
    //     point(p.x, p.y, lightColors[i+1]);
    // });
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0,canvas.width, canvas.height);
    
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

    c.font = 'normal 25px times';
    c.fillStyle = 'lime';
    c.fillText(`Initial Points`, 15, 25);
    c.fillStyle = lightColors[1];
    c.fillText(`\u2022 A(${Math.round(toX(initialPoints[0].x)*1000)/1000}, ${Math.round(toY(initialPoints[0].y)*1000)/1000})`, 15, 50);
    c.fillText('A', initialPoints[0].x + 2, initialPoints[0].y - 2); // labelling initial A
    c.fillText('A', points[0].x + 2, points[0].y - 2); // labelling moving A

    c.fillStyle = lightColors[2];
    c.fillText(`\u2022 B(${Math.round(toX(initialPoints[1].x)*1000)/1000}, ${Math.round(toY(initialPoints[1].y)*1000)/1000})`, 15, 75);
    c.fillText('B', initialPoints[1].x + 2, initialPoints[1].y - 2); // labelling initial B
    c.fillText('B', points[1].x + 2, points[1].y - 2); // labelling moving B

    c.fillStyle = lightColors[3];
    c.fillText(`\u2022 C(${Math.round(toX(initialPoints[2].x)*1000)/1000}, ${Math.round(toY(initialPoints[2].y)*1000)/1000})`, 15, 100);
    c.fillText('C', initialPoints[2].x + 2, initialPoints[2].y - 2); // labelling initial C
    c.fillText('C', points[2].x + 2, points[2].y - 2); // labelling moving C

    c.fillStyle = 'aqua';
    c.fillText(`\u2022 Center of Rotation = R(${rotPoint.x}, ${rotPoint.y})`, 15, 125)
    c.fillText(`\u2022 Rotation = ${Math.round(totAngle*1000)/1000}\xB0`, 15, 150)


    c.fillStyle = 'yellow';
    c.fillText(`Rotated Points`, 15, 175);
    c.fillStyle = lightColors[1];
    c.fillText(`\u2022 A(${Math.round(toX(points[0].x)*1000)/1000}, ${Math.round(toY(points[0].y)*1000)/1000})`, 15, 200);
    c.fillStyle = lightColors[2];
    c.fillText(`\u2022 B(${Math.round(toX(points[1].x)*1000)/1000}, ${Math.round(toY(points[1].y)*1000)/1000})`, 15, 225);
    c.fillStyle = lightColors[3];
    c.fillText(`\u2022 C(${Math.round(toX(points[2].x)*1000)/1000}, ${Math.round(toY(points[2].y)*1000)/1000})`, 15, 250);
    
    // Connects to the centroid of the triangle
    // connectColor(PlotX(rotPoint.x), PlotY(rotPoint.y), average(points[0].x, points[1].x, points[2].x), average(points[0].y, points[1].y, points[2].y), 'magenta');
    
    point(PlotX(rotPoint.x), PlotY(rotPoint.y), 'aqua');
    c.fillText('R', PlotX(rotPoint.x) + 5, PlotY(rotPoint.y) + 7); // labelling rotating Point
}

init();
animate();


// document.querySelectorAll("input").forEach(element => element.addEventListener("keyup", (event) => {
//     if(event.key === "Enter") {
//         solve();
//     }
// }));
document.getElementById('MyBtn').onclick = solve;

document.getElementById("clear").onclick = init;