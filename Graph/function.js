// Only test program to check the graph related files


let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(canvas);

let c = canvas.getContext('2d');

let scale = 30;
const Origin = {
    x: canvas.width/2,
    y: canvas.height/2
};

scalePoint = (x) => {
    return x*scale;
}

// These two functions plot the given coordinates with reference to the scale and position of the graph
PlotX = (x) => {
    return Origin.x + scalePoint(x);
}
PlotY = (y) => {
    return Origin.y - scalePoint(y);
}

addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

xAxis = (color) => {
    c.beginPath();
    for (let i = 0; i < canvas.width; i++) {
        c.lineTo(i, canvas.height/2);  
    }
    c.strokeStyle = color;
    c.stroke();
}

yAxis = (color) => {
    c.beginPath();
    for (let i = 0; i < canvas.height; i++) {
        c.lineTo(canvas.width/2, i);  
    }
    c.strokeStyle = color;
    c.stroke();
}

xGrids = () => {
    c.strokeStyle = 'rgba(255,255,255, 0.2)';
    for(let j = 1; j < Math.floor(canvas.height/scale); j++) {
        c.beginPath();
        for (let i = 0; i < canvas.width; i++) {
            c.lineTo(i, Origin.y - scale*j);
        }
        c.stroke();
    }
    for(let j = 1; j < Math.floor(canvas.height/scale); j++) {
        c.beginPath();
        for (let i = 0; i < canvas.width; i++) {
            c.lineTo(i, Origin.y + scale*j);
        }
        c.stroke();
    }
}

yGrids = () => {
    c.strokeStyle = 'rgba(255,255,255, 0.2)';
    for(let j = 1; j < Math.floor(canvas.width/scale); j++) {
        c.beginPath();
        for (let i = 0; i < canvas.height; i++) {
            c.lineTo(Origin.x - 30*j, i);
        }
        c.stroke();
    }
    for(let j = 1; j < Math.floor(canvas.width/scale); j++) {
        c.beginPath();
        for (let i = 0; i < canvas.height; i++) {
            c.lineTo(Origin.x + 30*j, i);
        }
        c.stroke();
    }
}

line = (slope, yIntercept, color) => {
    yIntercept *= scale;
    c.lineWidth = 2;
    c.strokeStyle = color;
    c.beginPath();
    for(let i=0; i<canvas.width/2;i++){
        c.lineTo(Origin.x+i, Origin.y-i*slope-yIntercept);
    }
    c.stroke();
    c.beginPath();
    for(let i=0; i<canvas.width/2;i++){
        c.lineTo(Origin.x-i, Origin.y+i*slope-yIntercept);        
    }
    c.stroke();
}


curve = (a, vertex_X, Vertex_Y, color) => {
    vertex_X *= scale;
    Vertex_Y *= scale;
    a /= scale;
    c.beginPath();
    for(let i=0; i<canvas.width/2;i++){
        c.lineTo(Origin.x+i+vertex_X, Origin.y-i*i*a-Vertex_Y);
    }
    c.strokeStyle = color;
    c.stroke();
    c.beginPath();
    for(let i=0; i<canvas.width/2;i++){
        c.lineTo(Origin.x-i+vertex_X, Origin.y-i*i*a-Vertex_Y);
    }
    c.strokeStyle = color;
    c.stroke();
}

parabola = (context, a, vertex_X, vertex_Y, color) => {
    a /= scale;
    vertex_X = PlotX(vertex_X);
    vertex_Y = PlotY(vertex_Y);

    context.strokeStyle = color;
    context.lineWidth = 2;
    context.beginPath();

    if(vertex_X>=0 && vertex_X<=window.innerWidth){
        // vertex_X lies within the window in this case
        let lDist = vertex_X;
        let rDist = modulus(window.innerWidth - vertex_X);

        // drawing right side of the vertex
        for(let i=0; i<=rDist;i++){
            context.lineTo(vertex_X+i, vertex_Y-i*i*a);
        }
        context.stroke();

        // drawing left side of the vertex
        context.beginPath();
        for(let i=0; i<=lDist;i++){
            c.lineTo(vertex_X-i, vertex_Y-i*i*a);
        }
        context.stroke();
    }else if(vertex_X<0 || vertex_X>window.innerWidth){
        // vertex_X lies out of the window in this case
        const traceLocus = modulus(vertex_X);
        /* traceLocus is the absolute value of vertex_X of the parabola. It is used to determine the distance of the
        vertex of the parabola to make it easier to draw the parabola from the start or end of the canvas depending on
        the position of vertex_X, either at right or left, from the canvas.
        */
        let drawPoint = 0; // initializing drawPoint value to draw the parabola
        if(vertex_X<0){
            for(let i=0; i<=window.innerWidth; i++){
                // Here vertex lies at the left side of the window, so we start from 0, i.e. leftmost position of the window so i=0
                drawPoint = traceLocus+i;
                /* Instead of starting from the vertex such as in the first case above where vertex lies within the window,
                we skip all the part which are right to the vertex and lie outside the window because doing so will be computationally more expensive
                I have used drawPoint variable to keep the track of required point to draw the parabola
                */

                context.lineTo(vertex_X+drawPoint, vertex_Y-drawPoint*drawPoint*a);
                // Since, vertex_X lies on left side of the window, we only need to draw to the right side of the vertex, starting from the leftmost position of canvas
            }
        }else if(vertex_X>window.innerWidth){
            for(let i = window.innerWidth; i>=0; i--){
                /* Here vertex lies at the right side of the window, so we start from window.innerWidth, i.e. rightmost position of the window 
                so i=window.innerWidth */
                drawPoint = traceLocus-i;
                /* Just like in the above if statement, we skip all the part which are left to the vertex and lie outside the window.
                I have used drawPoint variable to keep the track of required point to draw the parabola
                */
                context.lineTo(vertex_X-drawPoint, vertex_Y-drawPoint*drawPoint*a);
                // Since, vertex_X lies on right side of the window, we only need to draw to the left side of the vertex, starting from the leftmost position of canvas
            }
        }
        context.stroke();
    }
}

function init(){
    Origin.x = canvas.width/2;
    Origin.y = canvas.height/2;

    
    c.fillStyle = "lavender";
    c.font = "bold 24px times";
    c.fillText("O", Origin.x - 22, Origin.y + 20);
    c.fillText("X", canvas.width - 24, Origin.y + 20);
    c.fillText("Y", Origin.x - 22, 20);

    xGrids();
    yGrids();
    xAxis('white');
    yAxis('white');  
    line(2, 3, 'cyan');
    line(1, 0, 'yellow');
    curve(1, 3, -4,'#ff00bb');
    parabola(c, -1, 2, 4, 'red');
}

init();
