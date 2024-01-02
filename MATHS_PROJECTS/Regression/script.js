const canvas = document.querySelector('#points');
const Line = document.querySelector('#line');
canvas.width = Line.width = window.innerWidth;
canvas.height = Line.height = window.innerHeight;
const L = Line.getContext('2d');
const c = canvas.getContext('2d');

let plotPoints, M;
let x, y, avgX, avgY;
let X = [];
let Y = [];
let lineColor;

let dx, dy;
// dx = x-avgX and so on; xy = product of x-avgX and y - avgY
let numerator, denominator;
let Byx; // Regression coefficient of y on x

let corrCoeff = 0; // correlation coefficient

const table = document.querySelector('table');
const results = document.querySelector('#results');

plotPoints = true;
document.querySelector("#plot").style.textDecoration = "none";
document.querySelector("#plot").style.color = 'aqua';


function init() {
    X = [];
    Y = [];
    lineColor = randomColor(['magenta', 'skyblue', 'red', lightColors[1], 'lime', 'blue']);
    graphColor = 'white';
    drawGraph();
    c.clearRect(0,0, canvas.width, canvas.height);
    L.clearRect(0,0, canvas.width, canvas.height);
    // &#772; or &#x035E;= bar sign above the letter
    table.innerHTML = `
    <tr>
        <th>x</th>
        <th>y</th>
    </tr>
    `;
    results.innerHTML = "";
    M = 1;
}

init();
L.font = 'bold 17px arial'
writeText(L, 'Click on specific point on the graph to add those data to the table.', 10, 100, '#cfffee');
writeText(L, 'You can manually add the values by clicking on the Plot button on the bottom-right corner.', 10, 120, '#cfffee');


emptyCheck = () => {
    let result = 1;
    document.querySelectorAll("input").forEach(element => {
        if(element.value == '' || element.value == 'null') {
            result *= 0;
        }else{
            result *= 1;
        }
    });
    return result;
}

function output() {
    avgX = averageArr(X);
    avgY = averageArr(Y);
    const newListItem = document.createElement('tr');
    let numerator = 0;
    const denominator = {
        x: 0,
        y: 0
    };

    for (let i = 0; i < X.length; i++) {
        dx = X[i] - avgX;
        dy = Y[i] - avgY;
        numerator += dx * dy;
        denominator.x += dx * dx;
        denominator.y += dy * dy;
    }

    corrCoeff = numerator / Math.sqrt(denominator.x * denominator.y)
    Byx = corrCoeff * Math.sqrt(denominator.y / denominator.x);
    let yInt = avgY - Byx*avgX;

    if(plotPoints == true) {
        newListItem.innerHTML = `<td>${toX(x)}</td><td>${toY(y)}</td>`
    }else{
        newListItem.innerHTML = `<td>${x}</td><td>${y}</td>`
    }
    table.append(newListItem);
    if(modulus(corrCoeff) <= 1) {
        if(yInt < 0) {
            results.innerHTML = `&#x035E;x= ${Math.round(avgX*1000)/1000}<br>&#x035E;y= ${Math.round(avgY*1000)/1000}<br>r= ${Math.round(corrCoeff*10000)/10000}
        <br>y = ${roundUp(Byx, 1000)}x - ${modulus(roundUp(yInt, 1000))}
        `;
        }else{
            results.innerHTML = `&#x035E;x= ${Math.round(avgX*1000)/1000}<br>&#x035E;y= ${Math.round(avgY*1000)/1000}<br>r= ${Math.round(corrCoeff*10000)/10000}
        <br>y = ${roundUp(Byx, 1000)}x + ${roundUp(yInt, 1000)}
        `;
        }
    }else{
        results.innerHTML = `&#x035E;x= ${Math.round(avgX*1000)/1000}<br>&#x035E;y= ${Math.round(avgY*1000)/1000}<br>r= `;
    }
    if(typeof Byx == "number") {
        L.clearRect(0,0, canvas.width, canvas.height);
        line(L, Byx, yInt, lineColor);
    }
}

document.querySelector("#plot").addEventListener('click', function() {
    plotPoints = !(plotPoints);
    if(plotPoints == true) {
        document.querySelector("#plot").style.color = 'aqua';
        document.querySelector("#plot").style.textDecoration = "none";
        document.querySelector("#values").style.display = 'none';
    }else{
        document.querySelector("#plot").style.color = 'red';
        document.querySelector("#plot").style.textDecoration = "line-through";
        document.querySelector("#values").style.display = 'inline';
    }
    M = 0;
});

document.querySelector("#reset").addEventListener('click', function() {
    init();
    M = 0;
});

document.querySelector("#add").addEventListener('click', function() {
    M = 0;
    if(emptyCheck()){
        x = Number(document.querySelector("#x").value);
        y = Number(document.querySelector("#y").value);
        point(PlotX(x), PlotY(y), 'aqua');
        X.push(x);
        Y.push(y);
        output();
        document.querySelector("#x").focus();
    }
});

document.querySelectorAll("input").forEach(element => element.addEventListener("keyup", (event) => {
    if(event.key === "Enter" && emptyCheck()) {
        M = 0;
        x = Number(document.querySelector("#x").value);
        y = Number(document.querySelector("#y").value);
        point(PlotX(x), PlotY(y), 'aqua');
        X.push(x);
        Y.push(y);
        output();
        document.querySelector("#x").value = "";
        document.querySelector("#y").value = "";
        document.querySelector("#x").focus();
    }
}));

addEventListener('resize', function() {
    // Check if the window size has significantly changed
    const widthChange = Math.abs(canvas.width - window.innerWidth);
    const heightChange = Math.abs(canvas.height - window.innerHeight);

    // Define a threshold for changes (you can adjust this)
    const threshold = 0.01; // Adjust as needed

    if (widthChange > threshold || heightChange > threshold) {
        // Update the previous dimensions
        canvas.width = Line.width = window.innerWidth;
        canvas.height = Line.height = window.innerHeight;

        // Call the init function here
        init();
    }else{
        graphColor = 'white';
        drawGraph();
    }
});

addEventListener('click', event => {
    if(plotPoints) {
        x = event.clientX;
        y = event.clientY;
        if(M!=0){
            point(x, y, 'aqua');
            X.push(toX(x));
            Y.push(toY(y));
            output();
            // dx = X.map((value) => {
            //     return (value - avgX);
            // });
            // dy = Y.map((value) => {
            //     return (value - avgY);
            // });
            // dxsq = dx.map((value) => {
            //     return value*value;
            // });
            // dysq = dy.map((value) => {
            //     return value*value;
            // });
            // xy = [];
            // for(let i = 0; i<X.length; i++) {
            //     xy.push(dx[i]*dy[i]);
            // }
            // corrCoeff = summationArr(xy) / (Math.sqrt(summationArr(dxsq)) * Math.sqrt(summationArr(dysq)));
        }
        M++;
    }
});