const canvas = document.getElementById('shape');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');
let initialPoints = [];
let finalPoints = [];
let points = []; // Moving point
let scale = graphScale;

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

let factor;
let V;
let nPoints; // number of points

getCoeff = () => {
    V = new Plot(Number(document.getElementById("Vx").value), Number(document.getElementById("Vy").value));
    for(let i = 0; i< nPoints; i++) {
        initialPoints.push(new Plot(PlotX(Number(document.getElementById(`x${i+1}`).value)), PlotY(Number(document.getElementById(`y${i+1}`).value))));
        finalPoints.push(new Complex(initialPoints[i].x, initialPoints[i].y));
        finalPoints[i].translate(V.x, V.y);
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
    if(!emptyCheck()) {
        V = new Plot(randomInt(-10,10), randomInt(-10,10)); // Translation Vector
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
    }else{
        getCoeff();
    }
    c.lineJoin = "bevel"; // makes the corners smoother
}

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
    c.fillText(`\u2022 Translation Vector = V(${V.x}, ${V.y})`, 15, 125)

    c.fillStyle = 'yellow';
    c.fillText(`Translated Points`, 15, 155);
    c.fillStyle = lightColors[1];
    c.fillText(`\u2022 A(${Math.round(toX(points[0].x)*1000)/1000}, ${Math.round(toY(points[0].y)*1000)/1000})`, 15, 180);
    c.fillStyle = lightColors[2];
    c.fillText(`\u2022 B(${Math.round(toX(points[1].x)*1000)/1000}, ${Math.round(toY(points[1].y)*1000)/1000})`, 15, 205);
    c.fillStyle = lightColors[3];
    c.fillText(`\u2022 C(${Math.round(toX(points[2].x)*1000)/1000}, ${Math.round(toY(points[2].y)*1000)/1000})`, 15, 230);
}

init();
animate();

document.getElementById('MyBtn').onclick = solve;

document.getElementById("clear").onclick = init;