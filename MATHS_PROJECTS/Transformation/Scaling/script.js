const canvas = document.getElementById('shape');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');
let initialPoints = [];
let finalPoints = [];
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
}

let factor;
let P;
let nPoints; // number of points

getCoeff = () => {
    initialPoints[0].x = PlotX(Number(document.getElementById("x1").value));
    initialPoints[0].y = PlotY(Number(document.getElementById("y1").value));
    initialPoints[1].x = PlotX(Number(document.getElementById("x2").value));
    initialPoints[1].y = PlotY(Number(document.getElementById("y2").value));
    initialPoints[2].x = PlotX(Number(document.getElementById("x3").value));
    initialPoints[2].y = PlotY(Number(document.getElementById("y3").value));
    P.x = Number(document.getElementById("Px").value);
    P.y = Number(document.getElementById("Py").value);
    factor = Number(document.getElementById("k").value);
    finalPoints = [];
    points = [];
    for(let i = 0; i< initialPoints.length; i++) {
        finalPoints.push(new Complex(initialPoints[i].x, initialPoints[i].y));
        finalPoints[i].scale(factor, P.x, P.y);
        points.push(new Vertex(initialPoints[i].x, initialPoints[i].y, finalPoints[i].x, finalPoints[i].y));
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
        getCoeff();
        //c.clearRect(0,0,canvas.width, canvas.height);
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
    finalPoints = [];
    points = [];
    nPoints = 3;
    // if(!emptyCheck()) {
    P = new Plot(randomInt(-10,10), randomInt(-10,10)); // Center of scaling
    factor = Math.round((Math.random()-0.5) * 200)/20//randomInt(1,3);
    // angle = rotAngle/(Math.ceil(modulus(rotAngle)/100)*100);
    for(let i = 0; i<nPoints; i++) {
        initialPoints.push(new Plot(PlotX(randomInt(-12,12)), PlotY(randomInt(-12,12))));
        if(i>0) {
            while(initialPoints[i-1].x == initialPoints[i].x && initialPoints[i-1].y == initialPoints[i].y) {
                initialPoints[i] = new Plot(PlotX(randomInt(-12,12)), PlotY(randomInt(-12,12)));
            }
        }
        finalPoints.push(new Complex(initialPoints[i].x, initialPoints[i].y));
        finalPoints[i].scale(factor, P.x, P.y);
        points.push(new Vertex(initialPoints[i].x, initialPoints[i].y, finalPoints[i].x, finalPoints[i].y));
    }
    c.lineJoin = "bevel"; // makes the corners smoother
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

    for(let n = 0; n<initialPoints.length; n++) {
        connectColorFade(PlotX(P.x), PlotY(P.y), initialPoints[n].x, initialPoints[n].y, 0.4);
    }
    initialPoints.forEach((p,i) => {
        point(p.x, p.y, lightColors[i+1]);
    });

    for(let n = 0; n<points.length; n++) {
        connectColorFade(PlotX(P.x), PlotY(P.y), points[n].x, points[n].y, 0.4);
    }
    points.forEach((p,i) => {
        point(p.x, p.y, lightColors[i+1]);
        p.update();
        // if(Math.round(totAngle*1000)/1000 != Math.round(rotAngle*1000)/1000) {
        //     p.rotate(angle, P.x, P.y);
        // }else{
        //     angle = 0;
        // }
    });

    let startP = new Plot(15, 25); // Starting location of text
    let gap = 25; // Gap between two lines
    c.font = 'normal 25px verdana';
    c.fillStyle = 'aqua';
    c.fillText(`\u2022 Center = P(${P.x}, ${P.y})`, startP.x, startP.y);
    c.fillText(`\u2022 Scale factor = ${factor}`, startP.x, startP.y + gap);

    c.font = 'normal 25px times';
    c.fillStyle = 'lime';
    c.fillText(`Initial Points`, startP.x, startP.y + gap*2);
    for(let i = 0; i<3; i++) {
        let Pname = String.fromCharCode(65+i);
        c.fillStyle = lightColors[i+1];
        c.fillText(`\u2022 ${Pname}(${Math.round(toX(initialPoints[i].x)*1000)/1000}, ${Math.round(toY(initialPoints[i].y)*1000)/1000})`, startP.x, startP.y + gap*(i+3));
        c.fillText(`${Pname}`, initialPoints[i].x + 2, initialPoints[i].y - 2); // labelling initial point
        c.fillText(`${Pname}\'`, points[i].x + 2, points[i].y - 2); // labelling moving point
    }
    // c.fillStyle = lightColors[1];
    // c.fillText(`\u2022 A(${Math.round(toX(initialPoints[0].x)*1000)/1000}, ${Math.round(toY(initialPoints[0].y)*1000)/1000})`, 15, 50);
    // c.fillText('A', initialPoints[0].x + 2, initialPoints[0].y - 2); // labelling initial A
    // c.fillText('A', points[0].x + 2, points[0].y - 2); // labelling moving A

    // c.fillStyle = lightColors[2];
    // c.fillText(`\u2022 B(${Math.round(toX(initialPoints[1].x)*1000)/1000}, ${Math.round(toY(initialPoints[1].y)*1000)/1000})`, 15, 75);
    // c.fillText('B', initialPoints[1].x + 2, initialPoints[1].y - 2); // labelling initial B
    // c.fillText('B', points[1].x + 2, points[1].y - 2); // labelling moving B

    // c.fillStyle = lightColors[3];
    // c.fillText(`\u2022 C(${Math.round(toX(initialPoints[2].x)*1000)/1000}, ${Math.round(toY(initialPoints[2].y)*1000)/1000})`, 15, 100);
    // c.fillText('C', initialPoints[2].x + 2, initialPoints[2].y - 2); // labelling initial C
    // c.fillText('C', points[2].x + 2, points[2].y - 2); // labelling moving C

    c.fillStyle = 'yellow';
    c.fillText(`Scaled Points`, startP.x, startP.y + gap*6);
    for(let i = 0; i<3; i++) {
        let Pname = String.fromCharCode(65+i);
        c.fillStyle = lightColors[i+1];
        c.fillText(`\u2022 ${Pname}\'(${Math.round(toX(points[i].x)*1000)/1000}, ${Math.round(toY(points[i].y)*1000)/1000})`, startP.x, startP.y + gap*(i+7));
    }
    // c.fillStyle = lightColors[1];
    // c.fillText(`\u2022 A(${Math.round(toX(points[0].x)*1000)/1000}, ${Math.round(toY(points[0].y)*1000)/1000})`, 15, 200);
    // c.fillStyle = lightColors[2];
    // c.fillText(`\u2022 B(${Math.round(toX(points[1].x)*1000)/1000}, ${Math.round(toY(points[1].y)*1000)/1000})`, 15, 225);
    // c.fillStyle = lightColors[3];
    // c.fillText(`\u2022 C(${Math.round(toX(points[2].x)*1000)/1000}, ${Math.round(toY(points[2].y)*1000)/1000})`, 15, 250);
    
    
    point(PlotX(P.x), PlotY(P.y), 'aqua');
    c.fillText('P', PlotX(P.x) + 5, PlotY(P.y) + 7); // labelling rotating Point
}

init();
animate();

document.getElementById('MyBtn').onclick = solve;

document.getElementById("clear").onclick = init;