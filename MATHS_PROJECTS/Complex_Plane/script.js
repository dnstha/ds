const canvas = document.getElementById('animate');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d');
let movingPoint, angle, optAngle;
let OA, AP;
let pp;
let increment;


addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

document.getElementById("plps").addEventListener('click', function(){ // instead you can write window.eventListener
    pp = !(pp);
    if(pp == false) {
        document.getElementById("plps").style.color = lightColors[1];
    }else{
        document.getElementById("plps").style.color = '#cfffee';
    }
});

document.getElementById("reset").addEventListener('click', function(){ // instead you can write window.eventListener
    init();
});

movePoints = () => {
    if(pp == true) {
        angle += increment;
    }
    movingPoint.x = Origin.x + UnitCircle.radius * Math.cos(angle);
    movingPoint.y = Origin.y + UnitCircle.radius * Math.sin(-angle);
    // if(Math.round(deg(angle)*10000)/10000 == 360 || Math.round(deg(angle)*10000)/10000 == 0) {
    //     increment *= -1;
    // }
    OA = Math.round((movingPoint.x - Origin.x)/scale * 100000)/100000;
    AP = Math.round((Origin.y - movingPoint.y)/scale * 100000)/100000;
    
    // Angle Drawing
    c.strokeStyle = lightColors[1];
    c.beginPath();
    if(angle > 0) {
        c.arc(Origin.x, Origin.y, 40, 0, -angle, true);  
    }else{
        c.arc(Origin.x, Origin.y, 40, 0, -angle, false);
    }
    c.stroke();

    connectColor(UnitCircle.x, UnitCircle.y, movingPoint.x, movingPoint.y, 'skyblue'); // OP
    connectColor(UnitCircle.x, UnitCircle.y, movingPoint.x, Origin.y, 'magenta'); // OA
    if(getDist(movingPoint.x, movingPoint.y, movingPoint.x, Origin.y) > 1) {
        connectColor(movingPoint.x, movingPoint.y, movingPoint.x, Origin.y, 'yellow'); // AP
    }
    point(PlotX(10), Origin.y, lightColors[1]);
    point(movingPoint.x, Origin.y, lightColors[1]);
    point(UnitCircle.x, UnitCircle.y, lightColors[1]);
    point(movingPoint.x, movingPoint.y, lightColors[1]);
    c.fillStyle = 'lime';

    c.font = 'bold 25px times';

    c.fillStyle = lightColors[1];
    c.fillText("\u2022 \u2220POZ" + " = " + Math.round(angle*10000000000)/10000000000 + " rad", 15, 30);

    c.fillStyle = 'skyblue';
    c.fillText("\u2022 OZ = 1 Unit", 15, 55);

    c.fillStyle = 'magenta';
    c.fillText("\u2022 Real = " + OA, 15, 80);

    c.fillStyle = 'yellow';
    c.fillText("\u2022 Imaginary = " + AP, 15, 105);

    c.fillStyle = lightColors[0];

    if(AP>=0){
        c.fillText(`\u2022 Z = ${OA} + ${AP}i`, 15, 130);
    }else{
        c.fillText(`\u2022 Z = ${OA} - ${modulus(AP)}i`, 15, 130);
    }

    c.font = 'bold 35px times';
    c.fillText(`e`, movingPoint.x + 35, movingPoint.y - 7);
    c.font = 'bold 25px times';
    c.fillText("Z = ", movingPoint.x - 7, movingPoint.y - 7);
    c.font = 'bold 20px times';
    c.fillText(`i(${Math.round(angle*10000000)/10000000})`, movingPoint.x + 50, movingPoint.y - 20);
}

optAngle = 0;
function init() {
    movingPoint = new Plot(PlotX(10), PlotY(0))
    angle = optAngle;
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

document.querySelector('select').addEventListener('change', () => {
    if(document.getElementById("Angles").value == 'choose') {
        optAngle = 0;
    }else{
        optAngle = rad(Number(document.getElementById("Angles").value));
    }
    init();
    pp = false;
    document.getElementById("plps").style.color = lightColors[1];
});
