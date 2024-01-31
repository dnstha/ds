const canvas = document.querySelector('#circlePage');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');

let scale = graphScale;

let hidePnts = false;
let Points = [];
let charV = 0;
let nPoints; // number of points
let coeffC = { // coefficients of the circle
    h:1,
    k:1,
    r:1
};
let repeated = false;
let convertedPoints = [];
const convertedC = {x:0, y:0};
let Rsq; // Square of radius, which is always a rational number

clor = (h, s=80, l=60) =>{
    if(typeof h === 'number'){
        return `hsl(${(20 + 30*h)%360}, ${s}%, ${l}%)`; // Color for the points
    }
}


addEventListener("resize", () => {
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
        getEqn();
        writeEqn();
        cPoints();
    }else{
        graphColor = 'white';
        drawGraph();
    }
});

function Plot(x, y) {
    this.x = x;
    this.y = y;
}

// Range of the graph in X-axis and Y-axis
const rangeX = (Scale = graphScale) => Math.floor(0.5 * canvas.width/Scale);
const rangeY = (Scale = graphScale) => Math.floor(0.5 * canvas.height/Scale);

function getEqn(){
    let n = Points.length;
    let invalidRadius = false;
    if(filled('#radius') && n === 2){
        invalidRadius = Number(document.querySelector('#radius').value) < getDist(Points[0].x, Points[0].y, Points[1].x, Points[1].y)/2;
    }
    if(n == 1){
        if(!filled('#radius') || invalidRadius){            
            coeffC.h = randomInt(-rangeX(), rangeX());
            coeffC.k = randomInt(-rangeY(), rangeY());
        }else{
            let radius = Number(document.querySelector('#radius').value);
            coeffC.h = randomNum(Points[0].x - radius, Points[0].x + radius);
            coeffC.k = (-1)**randomInt(1,2) * Math.sqrt(radius**2 - (Points[0].x - coeffC.h)**2) + Points[0].y;
        }
    }else if(n == 2){
        //  Difference and addition of points' individual x and y values
        let dx = Points[0].x - Points[1].x;
        let ax = Points[0].x + Points[1].x;
        let dy = Points[0].y - Points[1].y;
        let ay = Points[0].y + Points[1].y;

        if(!filled('#radius') || invalidRadius){
            if(dx === 0){
                coeffC.h = randomInt(-rangeX(), rangeX());
                coeffC.k = ay/2;
            }else if(dy === 0){
                coeffC.k = randomInt(-rangeY(), rangeY());
                coeffC.h = ax/2;
            }else{
                let e = randomInt(1,2);
                if(e===1){
                    coeffC.h = randomInt(-rangeX(), rangeX());
                    coeffC.k = (dx*ax+dy*ay-2*dx*coeffC.h)/(2*dy);
                }else{
                    coeffC.k = randomInt(-rangeY(), rangeY());
                    coeffC.h = (dx*ax+dy*ay-2*dy*coeffC.k)/(2*dx);
                }
            }
        }else{
            let radius = Number(document.querySelector('#radius').value);
            if(dy !== 0){
                let m, temp, a, b, c;
                m = -dx/dy;
                a = 1 + m**2;
                temp = -dy - m*ax;
                b = m*temp - 2*Points[0].x;
                c = Points[0].x**2 + (temp**2)/4 - radius**2;
                coeffC.h = (-b + (-1)**randomInt(1,2) * Math.sqrt(b**2 - 4*a*c))/(2*a);
                coeffC.k = (m*(2*coeffC.h - ax) + ay)/2;
            }else{
                coeffC.h = ax/2;
                coeffC.k = Points[0].y + (-1)**randomInt(1,10) * Math.sqrt(radius**2  - (dx/2)**2);
            }
        }
    }else if(n == 3){
        let dx12, dx13, ax12, ax13, dy12, dy13, ay12, ay13;
        // Differences of the points
        dx12 = Points[0].x - Points[1].x;
        dx13 = Points[0].x - Points[2].x;
        dy12 = Points[0].y - Points[1].y;
        dy13 = Points[0].y - Points[2].y;
        // Addition of the points
        ax12 = Points[0].x + Points[1].x;
        ax13 = Points[0].x + Points[2].x;
        ay12 = Points[0].y + Points[1].y;
        ay13 = Points[0].y + Points[2].y;
        if(dy12*dx13 !== dy13*dx12){
            let denominator = 2*det2(dx13, dx12, dy13, dy12);
            let C1 = dx13*ax13 + dy13*ay13;
            let C2 = dx12*ax12 + dy12*ay12;
            coeffC.h = det2(C1, dy13, C2, dy12) / denominator;
            coeffC.k = det2(dx13, C1, dx12, C2) / denominator;
        }else{
            alert('Three points should not be collinear to lie on a same circle! Please enter other values!')
            Points.pop();
        }
    }

    if(n === 3 || !filled('#radius') || invalidRadius){
        Rsq = (Points[0].x - coeffC.h)**2 + (Points[0].y - coeffC.k)**2;
        coeffC.r = Math.sqrt(Rsq);
    }else{
        coeffC.r = Number(document.querySelector('#radius').value);
        Rsq = coeffC.r**2;
    }
}

function addPoint() {
    if(charV == 0) {
        Points = [];
    }
    if(Points.length<3){
        let x = document.querySelector('#x').value;
        let y = document.querySelector('#y').value;
        if(x == '' || x == 'null' || y == '' || y == 'null') {
            alert("Enter both values!");
            init();
            getEqn();
            writeEqn();
            cPoints();
        }else{
            if(Points.length === 0){
                charV++;
            }
            else {
                charV = Points.length + 1;
            }
            init();

            if (charV !== 1){
                for (let j = 0; j < Points.length; j++){
                    if(Number(x) === Points[j].x && Number(y) === Points[j].y){
                        alert('Point repeated! Please enter a different coordinate!');
                        repeated = true;
                    }else{
                        repeated = false;
                    }
                }
                if(!repeated){
                    Points.push(new Plot(Number(x), Number(y)));
                }
            }else{
                Points.push(new Plot(Number(x), Number(y)));
            }
            

            if(Points.length<3){            
                document.querySelector("#lbl").innerText = `${String.fromCharCode(65+Points.length)}`;
            }

            document.querySelector('#x').value = "";
            document.querySelector('#y').value = "";
            document.querySelector("#x").focus();
            getEqn();
            writeEqn();
            cPoints();
        }
    }else{
        alert('Points limit reached!');
    }
}

function writeEqn(){
    let sign = {x:"-", y:"-"};
    if(coeffC.h < 0){
        sign.x = "+"
    }
    if(coeffC.k < 0){
        sign.y = "+"
    }
    document.querySelector('#eqn').innerHTML = `
        <u>Equation of Circle:</u><br/>
        Standard: &lpar;x ${sign.x} ${modulus(roundUp(coeffC.h, 1000))}&rpar;<sup>2</sup> + &lpar;y ${sign.y} ${modulus(roundUp(coeffC.k, 1000))}&rpar;<sup>2</sup> = ${roundUp(Rsq, 1000)}
        <br/>
        General: x<sup>2</sup> + y<sup>2</sup> ${sign.x} ${2 * modulus(roundUp(coeffC.h, 1000))}x ${sign.y} ${2 * modulus(roundUp(coeffC.k, 1000))}y + ${roundUp((coeffC.h**2 + coeffC.k**2), 1000)} = 0
    `;
}


function checkRadius(){
    if(Points.length !== 2){
        getEqn();
        writeEqn();
        // if(Points.length === 3 && filled('#radius')){
        //     alert('Radius can be set for less than 3 points only!')
        // }
    }else{
        if(filled('#radius')){
            let d = getDist(Points[0].x, Points[0].y, Points[1].x, Points[1].y)/2;
            let validRadius = d <= Number(document.querySelector('#radius').value);
            if(validRadius){
                getEqn();
                writeEqn();
            }else{
                alert(`Radius cannot be smaller than half the distance between the two points! Enter a value greater than or equal to ${roundUp(d, 1000)}`);
            }
        }else{
            getEqn();
            writeEqn();
        }
    }
    cPoints();

}

function cPoints(){
    // Converting the points
    convertedPoints = [];
    for(let i=0; i<Points.length; i++){
        convertedPoints.push(new Plot(PlotX(Points[i].x), PlotY(Points[i].y)));
    }
    convertedC.x = PlotX(coeffC.h);
    convertedC.y = PlotY(coeffC.k)
}


function init(){
    Origin.x = canvas.width/2;
    Origin.y = canvas.height/2;
    graphColor = 'white';
    drawGraph();
    document.querySelector('#eqn').innerHTML = '';

    
    c.font = 'normal 25px times';


    if(charV === 0) {
        document.querySelector("#lbl").innerText = "A";
        Points = [];
        nPoints = randomInt(1,3);
        let x, y; 
        for(let i = 0; i<nPoints; i++){
            x = randomInt(-rangeX(), rangeX());
            y = randomInt(-rangeY(), rangeY());
            if (i !== 0){
                for (let j = 0; j < Points.length; j++){
                    if(x === Points[j].x && y === Points[j].y){
                        x = randomInt(-rangeX(), rangeX());
                        y = randomInt(-rangeY(), rangeY());
                        j -= 1;
                    }
                }
                if(i === 2){
                    // Comparing slopes slope of lines connecting consecutive two points 
                    let collinear = ((Points[0].y - y) * (Points[0].x - Points[1].x)) === ((Points[0].y - Points[1].y) * (Points[0].x - x));
                    while(collinear){
                        x = randomInt(-rangeX(), rangeX());
                        y = randomInt(-rangeY(), rangeY());
                        collinear = ((Points[0].y - y) * (Points[0].x - Points[1].x)) === ((Points[0].y - Points[1].y) * (Points[0].x - x));
                    }
                }
            }

            Points.push(new Plot(x, y));
        }
        getEqn();
        writeEqn();
        cPoints();
    }

    c.lineJoin = "bevel"; // makes the corners smoother
    
}


function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0,canvas.width, canvas.height);

    for(let n = 0; n<convertedPoints.length; n++) {
        connectColorFade(convertedPoints[n].x, convertedPoints[n].y, convertedC.x, convertedC.y, 0.7);
    }
    
    point(PlotX(coeffC.h), PlotY(coeffC.k), 'aqua');
    drawCircle(c, PlotX(coeffC.h), PlotY(coeffC.k), coeffC.r*scale, 'aqua');
    writeText(c, `P`, PlotX(coeffC.h)+2, PlotY(coeffC.k)-2, 'aqua');

    Points.forEach((p,i) => {
        // Initial Points need to be converted in order to plot them in the graph
        point(PlotX(p.x), PlotY(p.y), clor(i));
    });


    // Text portion
    let startP = new Plot(15, 25); // Starting location of text
    let gap = 25; // Gap between two lines

    writeText(c, `Circle:`, startP.x, startP.y, 'aqua');
    startP.y += gap;
    writeText(c, `Center (h, k) = P(${roundUp(coeffC.h, 1000)}, ${roundUp(coeffC.k, 1000)})`, startP.x, startP.y, 'aqua');
    startP.y += gap;
    writeText(c, `Radius (r) = ${roundUp(coeffC.r, 1000)}`, startP.x, startP.y, 'aqua');

    
    for(let i = 0; i<Points.length; i++) {
        let Pname = `${String.fromCharCode(65+i)}`;
        c.fillStyle = clor(i);
        c.fillText(`\u2022 ${Pname}(${roundUp(Points[i].x, 1000)}, ${roundUp(Points[i].y, 1000)})`, startP.x, startP.y + gap*(i+1));
        c.fillText(`${Pname}`, PlotX(Points[i].x) + 2, PlotY(Points[i].y) - 2); // labelling initial point
    }
}

init();
animate();


document.querySelectorAll(".P").forEach(element => element.addEventListener("keyup", (event) => {
    if(event.key === "Enter") {
        addPoint();
    }
}));

document.getElementById("reset").onclick = function() {
    charV = 0;
    document.querySelector("#lbl").innerText = `A`;
    init();
};

document.querySelector('#Add').onclick = function() {
    addPoint();
}

document.querySelector('#radius').addEventListener('keyup', e => {
    if(e.key === "Enter"){
        checkRadius();
    }
});

document.querySelector('#get').addEventListener('click', ()=>{
    checkRadius();
});