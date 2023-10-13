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

// labels = () => {
    
// }

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