const canvas = document.getElementById('animate');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d');
let movingPoint;
let AP, BP;
let OP = new Plot(0,0);
let pp;
let increment;


document.getElementById("plps").addEventListener('click', function(){ // instead you can write window.eventListener
    pp = !(pp);
    if(pp == false) {
        document.getElementById("plps").style.color = lightColors[1];
    }else{
        document.getElementById("plps").style.color = '#cfffee';
    }
});

document.getElementById("reset").addEventListener('click', function(){ // instead you can write window.eventListener
    drawEllipse();
    init();
});

movePoints = () => {
    if(pp == true) {
        if(angle > 2*Math.PI) {
            angle = 0;
        }
        angle += increment;
    }
    movingPoint.x = Origin.x + ellipse.a * Math.cos(angle);
    movingPoint.y = Origin.y + ellipse.b * Math.sin(-angle);
    OP.x = Math.round((movingPoint.x - Origin.x)/graphScale * 100000)/100000;
    OP.y = Math.round((Origin.y - movingPoint.y)/graphScale * 100000)/100000;
    
    connectColor(f1.x, f1.y, movingPoint.x, movingPoint.y, 'skyblue'); // OP
    connectColor(f2.x, f2.y, movingPoint.x, movingPoint.y, 'magenta'); // OA

    point(f1.x, ellipse.y, lightColors[1]);
    point(f2.x, ellipse.y, lightColors[1]);
    point(movingPoint.x, movingPoint.y, lightColors[1]); // Moving Point
    c.fillStyle = 'lime';
    c.font = 'bold 20px times';
    c.fillText(`P(${OP.x}, ${OP.y})`, movingPoint.x, movingPoint.y - 7);
    c.fillText("A", f1.x - 7, Origin.y + 17);
    c.fillText("B", f2.x - 7, Origin.y + 17);

    c.font = 'bold 25px times';
    AP = (Math.round(getDist(f1.x,f1.y, movingPoint.x, movingPoint.y)/graphScale * 100000)/100000);
    BP = (Math.round(getDist(f2.x,f2.y, movingPoint.x, movingPoint.y)/graphScale * 100000)/100000);
    c.fillStyle = 'skyblue';
    c.fillText("\u2022 AP = " + AP, 15, 30);

    c.fillStyle = 'magenta';
    c.fillText("\u2022 BP = " + BP, 15, 55);

    c.fillStyle = 'lime';
    c.fillText("\u2022 AP + BP = " + (AP + BP), 15, 80);
    c.fillText(`\u2022 A = (${Math.round((f1.x - Origin.x)/graphScale *100000)/100000}, 0)` , 15, 105);
    c.fillText(`\u2022 B = (${Math.round((f2.x - Origin.x)/graphScale *100000)/100000}, 0)`, 15, 130);

    c.fillStyle = 'cyan';
    c.fillText(`\u2022 Major Axis = ${majorAxis/scale*2}`, 15, 155);
    c.fillStyle = 'yellow';
    c.fillText(`\u2022 Minor Axis = ${minorAxis/scale*2}`, 15, 180);
}

function init() {
    drawEllipse();
    movingPoint = new Plot(Origin.x + ellipse.a, Origin.y)
    angle = Math.random() * Math.PI;
    increment = randomSign() * Math.PI/720;
    pp = true;
    document.getElementById("plps").style.color = '#cfffee';
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    movePoints();
}

init();
animate();

document.getElementById("reverse").addEventListener('click', function(){
    increment *= -1;
});
