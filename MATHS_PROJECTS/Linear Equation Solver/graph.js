let canvas = document.getElementById('line');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(canvas);

let c = canvas.getContext('2d');
let m1,m2, b1,b2; // Slopes and y-intercepts of the lines
let color1,color2;
// let p; // Intersection point
let scale = 25;


addEventListener('resize', function() {
    // Check if the window size has significantly changed
    const widthChange = Math.abs(canvas.width - window.innerWidth);
    const heightChange = Math.abs(canvas.height - window.innerHeight);

    // Define a threshold for changes (you can adjust this)
    const threshold = 0.01; // Adjust as needed

    if (widthChange > threshold || heightChange > threshold) {
        // Update the previous dimensions
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Call the init function here
        init();
        graph();
    }else{
        graph();
    }
});

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

function init(){
    c.clearRect(0,0,canvas.width, canvas.height);
    Origin.x = canvas.width/2;
    Origin.y = canvas.height/2;
}

init();

function graph() {
    init();
    color1 = '#df00bb';
    color2 = '#0004ff';
    if(y1 == 0){
        c.strokeStyle = color1;
        c.beginPath();
        for(let i=0; i<canvas.height;i++){
            c.lineTo(Origin.x + c1/x1 * scale, i);
        }
        c.stroke();
    }else{
        m1 = -x1/y1;
        b1 = c1/y1;
        line(m1, b1, color1);
    }
    if(y2 == 0) {
        c.strokeStyle = color2;
        c.beginPath();
        for(let j=0; j<canvas.height;j++){
            c.lineTo(Origin.x + c2/x2 * scale, j);
        }
        c.stroke();
    }else{
        m2 = -x2/y2;
        b2 = c2/y2;
        line(m2, b2, color2);
    }
    if(m1 != m2) {
        let X = det2(c1,y1,c2,y2)/det2(x1,y1,x2,y2);
        let Y = det2(x1,c1,x2,c2)/det2(x1,y1,x2,y2);
        let Px = Origin.x + X * scale;
        let Py = Origin.y - Y * scale;
        point(Px, Py, 'red');
        if(document.querySelector("#x").value == X && document.querySelector("#y").value == Y) {
            c.font = "bold 24px times"
            c.fillText(`(${roundUp(X, 1000)}, ${roundUp(Y, 1000)})`, Px, Py-5);
        }
    }
}

document.querySelectorAll(".coeff").forEach(element => element.addEventListener("keyup", function(){
    getCoeff();
    graph();
}));

document.getElementById("clear").onclick = function() {
    init();
    clearSpan();
};