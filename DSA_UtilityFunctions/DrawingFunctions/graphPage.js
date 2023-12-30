const GRAPH = document.getElementById('GraphPage');
GRAPH.width = window.innerWidth;
GRAPH.height = window.innerHeight;
console.log(GRAPH);

const G = GRAPH.getContext('2d');

let graphScale = 25;
const Origin = {
    x: GRAPH.width/2,
    y: GRAPH.height/2
};
let graphColor ='black';
let xAxisName = "X";
let yAxisName = "Y";

scalePoint = (x) => {
    return x*graphScale;
}

// These two functions plot the given coordinates with reference to the scale and position of the graph
PlotX = (x) => {
    return Origin.x + scalePoint(x);
}
PlotY = (y) => {
    return Origin.y - scalePoint(y);
}

// These two functions change the given point of the page in terms of x-y plane coordinate
toX = (x) => {
    return (x - Origin.x)/graphScale;
}

toY = (y) => {
    return (Origin.y - y)/graphScale;
}

axesNames = (X, Y) => {
    G.fillText(X, GRAPH.width - 20 - 10*X.length, Origin.y + 20);
    G.fillText(Y, Origin.x + 5, 20);
}

xAxis = (color) => {
    G.lineWidth = 2;
    G.beginPath();
    for (let i = 0; i < GRAPH.width; i++) {
        G.lineTo(i, GRAPH.height/2);  
    }
    G.strokeStyle = color;
    G.stroke();
}

yAxis = (color) => {
    G.beginPath();
    for (let i = 0; i < GRAPH.height; i++) {
        G.lineTo(GRAPH.width/2, i);  
    }
    G.strokeStyle = color;
    G.stroke();
}

drawGrids = (O, range, j) => {
    G.beginPath();
    for (let i = 0; i < range; i++) {
        if(O == Origin.x) {
            G.lineTo(O + graphScale*j, i);
        }else if(O == Origin.y){
            G.lineTo(i, O + graphScale*j);
        }
    }
    G.stroke();
}

xGrids = (color) => {
    if(color == 'black') {
        G.strokeStyle = 'rgba(0,0,0, 0.2)';
    }else{
        G.strokeStyle = 'rgba(200,200,200, 0.2)';
    }
    for(let j = 1; j < Math.floor(GRAPH.height/graphScale); j++) {
        drawGrids(Origin.y, GRAPH.width, -j);
        drawGrids(Origin.y, GRAPH.width, j);
    }
}

yGrids = (color) => {
    if(color == 'black') {
        G.strokeStyle = 'rgba(0,0,0, 0.2)';
    }else{
        G.strokeStyle = 'rgba(200,200,200, 0.2)';
    }
    for(let j = 1; j < Math.floor(GRAPH.width/graphScale); j++) {
        drawGrids(Origin.x, GRAPH.height, -j);
        drawGrids(Origin.x, GRAPH.height, j);
    }
}

xUnitGrids = (color) => {
    if(color == 'black') {
        G.strokeStyle = 'rgba(0,0,0, 0.5)';
    }else{
        G.strokeStyle = 'rgba(255,255,255, 0.5)';
    }
    for(let j = 1; j < Math.floor(GRAPH.height/250); j++) {
        G.beginPath();
        for (let i = 0; i < GRAPH.width; i++) {
            G.lineTo(i, Origin.y - 250*j);
        }
        G.stroke();
    }
    for(let j = 1; j < Math.floor(GRAPH.height/250); j++) {
        G.beginPath();
        for (let i = 0; i < GRAPH.width; i++) {
            G.lineTo(i, Origin.y + 250*j);
        }
        G.stroke();
    }
}

yUnitGrids = (color) => {
    if(color == 'black') {
        G.strokeStyle = 'rgba(0,0,0, 0.5)';
    }else{
        G.strokeStyle = 'rgba(255,255,255, 0.5)';
    }
    for(let j = 1; j < Math.floor(GRAPH.width/250); j++) {
        G.beginPath();
        for (let i = 0; i < GRAPH.height; i++) {
            G.lineTo(Origin.x - 250*j, i);
        }
        G.stroke();
    }
    for(let j = 1; j < Math.floor(GRAPH.width/250); j++) {
        G.beginPath();
        for (let i = 0; i < GRAPH.height; i++) {
            G.lineTo(Origin.x + 250*j, i);
        }
        G.stroke();
    }
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

line = (context, slope, yIntercept, color) => {
    yIntercept = scalePoint(yIntercept);
    context.lineWidth = 2;
    context.strokeStyle = color;
    context.beginPath();
    for(let i=0; i<GRAPH.width/2;i++){
        context.lineTo(Origin.x + i, Origin.y-i*slope-yIntercept);
    }
    context.stroke();
    context.beginPath();
    for(let i=0; i<GRAPH.width/2;i++){
        context.lineTo(Origin.x - i, Origin.y+i*slope-yIntercept);
    }
    context.stroke();
}

drawFunction = (context, fx, color) => {
    let x;
    let dynamicFunction = new Function('x', 'return ' + fx);
    // Dynamic Function to convert given type of expression of x in terms of
    // the above declared variable 'x';

    context.strokeStyle = color;
    context.lineWidth = 2;
    context.beginPath();
    for(let i = 0; i<window.innerWidth; i++){
        x = toX(i);
        let y = dynamicFunction(x);
        x = PlotX(x);
        y = PlotY(y);
        context.lineTo(x, y);
    }
    context.stroke();
}

/* 
Another version of drawFunction which tries to skip drawing the parts of curve that are less than or greater than
the height of the window to skip unnecessary calculations of those points

drawFunction2 = (context, fx, color) => {
    let x;
    let dynamicFunction = new Function('x', 'return ' + fx);
    // Dynamic Function to convert given type of expression of x in terms of
    // the above declared variable 'x';

    context.strokeStyle = color;
    context.lineWidth = 2;
    context.beginPath();
    for(let i = 0; i<window.innerWidth; i++){
        x = toX(i);
        let y = dynamicFunction(x);
        x = PlotX(x);
        y = PlotY(y);
        if(y >= -100 && y<=window.innerHeight){
            context.lineTo(x, y);
        }
    }
    context.stroke();
}


*/



// Example of a dynamic function that takes any expression of x and operates accordingly
// function operate(input) {
//     let x = 2;

//     let dynamicF = new Function('x', 'return ' + input);

//     let result = dynamicF(x);

//     return result;
// }

// console.log(operate('x*Math.PI'))



drawGraph = () => {
    G.clearRect(0,0,GRAPH.width, GRAPH.height);
    Origin.x = GRAPH.width/2;
    Origin.y = GRAPH.height/2;
    G.fillStyle = graphColor;
    G.font = "bold 24px times";
    G.fillText("O", Origin.x - 22, Origin.y + 20);
    axesNames(xAxisName, yAxisName);

    xGrids(graphColor);
    yGrids(graphColor);
    xAxis(graphColor);
    yAxis(graphColor);
}

drawGraph();

addEventListener("resize", function(){
    GRAPH.width = window.innerWidth;
    GRAPH.height = window.innerHeight;
    drawGraph();
});