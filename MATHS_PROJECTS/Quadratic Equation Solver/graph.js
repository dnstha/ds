let canvas = document.getElementById('line');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(canvas);

let c = canvas.getContext('2d');
let color;
let p1, p2; // Intersection point on X_axis
let scale = 25;
vertex = new Point(Origin.x, Origin.y);

curve = (a, vertex_X, vertex_Y, color) => {
    a /= scale;
    vertex_X = PlotX(vertex_X);
    vertex_Y = PlotY(vertex_Y);

    c.strokeStyle = color;
    c.lineWidth = 2;
    c.beginPath();

    if(vertex_X>=0 && vertex_X<=window.innerWidth){
        // vertex_X lies within the window in this case
        let lDist = vertex_X;
        let rDist = modulus(window.innerWidth - vertex_X);

        // drawing right side of the vertex
        for(let i=0; i<=rDist;i++){
            c.lineTo(vertex_X+i, vertex_Y-i*i*a);
        }
        c.stroke();

        // drawing left side of the vertex
        c.beginPath();
        for(let i=0; i<=lDist;i++){
            c.lineTo(vertex_X-i, vertex_Y-i*i*a);
        }
        c.stroke();
    }else if(vertex_X<0 || vertex_X>window.innerWidth){
        // vertex_X lies out of the window in this case
        let traceLocus = vertex_X;
        if(vertex_X<0){
            for(traceLocus=vertex_X; (traceLocus+vertex_X)<=window.innerWidth;traceLocus++){
                if(traceLocus>0){
                    c.lineTo(vertex_X+traceLocus, vertex_Y-traceLocus*traceLocus*a);
                }
            }
        }else if(vertex_X>window.innerWidth){
            for(traceLocus=vertex_X; (traceLocus+vertex_X)>=0; traceLocus--){
                if(traceLocus<window.innerWidth){
                    c.lineTo(vertex_X-traceLocus, vertex_Y-traceLocus*traceLocus*a);
                }
            }
        }
        c.stroke();
    }
}

function init(){
    c.clearRect(0,0,canvas.width, canvas.height);
    Origin.x = canvas.width/2;
    Origin.y = canvas.height/2;
}

init();

graph = () => {
    init();
    color = '#df00bb';
    vertex.x = -B/(2*A);
    vertex.y = ((A*vertex.x + B )*vertex.x) + C;
    if(A != 0) {
        curve(A, vertex.x, vertex.y, color);
        // Vertex
        point(PlotX(vertex.x), PlotY(vertex.y), 'black');
    }
}

addEventListener("resize", function(){
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

document.querySelectorAll(".coeff").forEach(element => element.addEventListener("keyup", function(){
    getCoeff();
    graph();
}));

document.getElementById("clear").onclick = function() {
    init();
    clearSpan();
};