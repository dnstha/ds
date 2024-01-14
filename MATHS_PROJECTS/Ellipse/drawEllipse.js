const ellipsePage = document.getElementById('ellipse');
ellipsePage.width = window.innerWidth;
ellipsePage.height = window.innerHeight;

const ctx = ellipsePage.getContext('2d');
let ellipse; // Moving point
let scale = graphScale;
let majorAxis, minorAxis;
let f1, f2; // Focii of the Ellipse

graphColor = 'white';
drawGraph();

function Plot(x, y) {
    this.x = x;
    this.y = y;
}


function Ellipse(x, y, a, b) {
    this.x = x;
    this.y = y;
    this.a = a;
    this.b = b;
    this.focalLength = Math.sqrt(this.a*this.a - this.b*this.b)
    this.color = lightColors[0];

    this.draw = function() {
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.a, this.b, 0, 0, 2*Math.PI);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1.5;
        ctx.stroke();
    }
}

function drawEllipse(){
    ctx.clearRect(0, 0, ellipsePage.width, ellipsePage.height);
    Origin.x = ellipsePage.width/2;
    Origin.y = ellipsePage.height/2;
    majorAxis = scale * randomInt(5, 15);
    minorAxis = scale * randomInt(2, 9);
    while(minorAxis >= majorAxis) {
        minorAxis = scale * randomInt(2, 9);
    }
    ellipse = new Ellipse(Origin.x, Origin.y, majorAxis, minorAxis);
    f1 = new Plot(Origin.x - ellipse.focalLength, Origin.y);
    f2 = new Plot(Origin.x + ellipse.focalLength, Origin.y);
    connectColorCtx(ctx, Origin.x, Origin.y - minorAxis, Origin.x, Origin.y + minorAxis, 'yellow');
    connectColorCtx(ctx, Origin.x - majorAxis, Origin.y, Origin.x + majorAxis, Origin.y, 'cyan');
    ellipse.draw();

    ctx.font = 'bold 25px times';
    writeText(ctx, 'Scale: 1 box = 1 Unit', 15, ellipsePage.height - 50, '#cfffee');
}

addEventListener('resize', function() {
    ellipsePage.width = window.innerWidth;
    ellipsePage.height = window.innerHeight;
    drawEllipse();
});