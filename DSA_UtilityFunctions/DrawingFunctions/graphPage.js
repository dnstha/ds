let GRAPH = document.getElementById('GraphPage');
GRAPH.width = window.innerWidth;
GRAPH.height = window.innerHeight;
console.log(GRAPH);

let G = GRAPH.getContext('2d');

let graphScale = 25;
const Origin = {
    x: GRAPH.width/2,
    y: GRAPH.height/2
};

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

xGrids = () => {
    G.strokeStyle = 'rgba(0,0,0, 0.2)';
    for(let j = 1; j < Math.floor(GRAPH.height/graphScale); j++) {
        G.beginPath();
        for (let i = 0; i < GRAPH.width; i++) {
            G.lineTo(i, Origin.y - graphScale*j);
        }
        G.stroke();
    }
    for(let j = 1; j < Math.floor(GRAPH.height/graphScale); j++) {
        G.beginPath();
        for (let i = 0; i < GRAPH.width; i++) {
            G.lineTo(i, Origin.y + graphScale*j);
        }
        G.stroke();
    }
}

yGrids = () => {
    G.strokeStyle = 'rgba(0,0,0, 0.2)';
    for(let j = 1; j < Math.floor(GRAPH.width/graphScale); j++) {
        G.beginPath();
        for (let i = 0; i < GRAPH.height; i++) {
            G.lineTo(Origin.x - graphScale*j, i);
        }
        G.stroke();
    }
    for(let j = 1; j < Math.floor(GRAPH.width/graphScale); j++) {
        G.beginPath();
        for (let i = 0; i < GRAPH.height; i++) {
            G.lineTo(Origin.x + graphScale*j, i);
        }
        G.stroke();
    }
}

line = (slope, yIntercept, color) => {
    yIntercept *= graphScale;
    G.lineWidth = 2;
    G.strokeStyle = color;
    G.beginPath();
    for(let i=0; i<GRAPH.width/2;i++){
        G.lineTo(Origin.x+i, Origin.y-i*slope-yIntercept);
    }
    G.stroke();
    G.beginPath();
    for(let i=0; i<GRAPH.width/2;i++){
        G.lineTo(Origin.x-i, Origin.y+i*slope-yIntercept);        
    }
    G.stroke();
}

drawGraph = () => {
    G.clearRect(0,0,GRAPH.width, GRAPH.height);
    Origin.x = GRAPH.width/2;
    Origin.y = GRAPH.height/2;
    G.fillStyle = "black";
    G.font = "bold 24px times";
    G.fillText("O", Origin.x - 22, Origin.y + 20);
    G.fillText("X", GRAPH.width - 24, Origin.y + 20);
    G.fillText("Y", Origin.x - 22, 20);

    xGrids();
    yGrids();
    xAxis('black');
    yAxis('black');
}

drawGraph();

addEventListener("resize", function(){
    GRAPH.width = window.innerWidth;
    GRAPH.height = window.innerHeight;
    drawGraph();
});