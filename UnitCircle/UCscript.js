const canvas = document.getElementById('animate');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d');
let movingPoint, velocity;
let OA, AP;
let pp;

movePoints = () => {
    if(pp == true) {
        if(velocity > 2*Math.PI) {
            velocity = 0;
        }
        velocity += Math.PI/360;
        movingPoint.x = Origin.x + UnitCircle.radius * Math.cos(velocity);
        movingPoint.y = Origin.y + UnitCircle.radius * Math.sin(-velocity);
    }
    connect(UnitCircle.x, UnitCircle.y, movingPoint.x, movingPoint.y); // OP
    connectColor(UnitCircle.x, UnitCircle.y, movingPoint.x, Origin.y, 'blue'); // OA
    if(getDist(movingPoint.x, movingPoint.y, movingPoint.x, Origin.y) > 3) {
        connectColor(movingPoint.x, movingPoint.y, movingPoint.x, Origin.y, 'yellow'); // AP
    }
    point(movingPoint.x, Origin.y, lightColors[1]);
    point(UnitCircle.x, UnitCircle.y, lightColors[1]);
    point(movingPoint.x, movingPoint.y, lightColors[1]);
    c.fillStyle = 'lime';
    c.font = 'bold 20px times';
    c.fillText("P", movingPoint.x, movingPoint.y - 7);
    c.fillText("A", movingPoint.x - 7, Origin.y + 17);

    OA = Math.round((movingPoint.x - Origin.x)/scale * 100000)/100000;
    AP = Math.round((Origin.y - movingPoint.y)/scale * 100000)/100000;
    c.fillStyle = 'skyblue';
    c.font = 'bold 25px times';
    c.fillText("OP = 1 Unit", 10, 30);

    c.fillText("OA = " + OA, 10, 55);

    c.fillText("AP = " + AP, 10, 80);
}

function init() {
    movingPoint = new Plot(PlotX(10), PlotY(0))
    velocity = 0;
    pp = true;
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    movePoints();
}

addEventListener("click", function() {
    pp = !(pp);
})

init();
animate();
