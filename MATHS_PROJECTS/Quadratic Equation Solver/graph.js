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

                c.lineTo(vertex_X+drawPoint, vertex_Y-drawPoint*drawPoint*a);
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
                c.lineTo(vertex_X-drawPoint, vertex_Y-drawPoint*drawPoint*a);
                // Since, vertex_X lies on right side of the window, we only need to draw to the left side of the vertex, starting from the leftmost position of canvas
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