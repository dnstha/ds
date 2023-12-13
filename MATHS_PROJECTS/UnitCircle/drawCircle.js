let circlePage = document.getElementById('circle');
circlePage.width = window.innerWidth;
circlePage.height = window.innerHeight;

let ctx = circlePage.getContext('2d');
let UnitCircle, p; // Moving point
let scale = 250;

function Plot(x, y) {
    this.x = x;
    this.y = y;
}


function Circle(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = lightColors[0];
    this.velocity = 0;

    this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1.5;
        ctx.stroke();
    }
}

function drawCircle(){
    graphColor = 'white';
    drawGraph();
    xUnitGrids(ctx, 'white');
    yUnitGrids(ctx, 'white');
    Origin.x = circlePage.width/2;
    Origin.y = circlePage.height/2;
    UnitCircle = new Circle(Origin.x, Origin.y, 250);
    UnitCircle.draw();
    ctx.font = 'bold 25px times';
    writeText(ctx, 'Scale: 10 boxes = 1 Unit', 15, circlePage.height - 50, '#cfffee');
}

addEventListener('resize', function() {
    circlePage.width = window.innerWidth;
    circlePage.height = window.innerHeight;
    drawCircle();
});
drawCircle();