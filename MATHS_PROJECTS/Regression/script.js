const canvas = document.querySelector('#points');
const Line = document.querySelector('#line');
canvas.width = Line.width = window.innerWidth;
canvas.height = Line.height = window.innerHeight;
const L = Line.getContext('2d');
const c = canvas.getContext('2d');
// const btn = document.querySelector('#reset').getBoundingClientRect();

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
    plotPoints = true;
    document.querySelector("#plot").style.color = 'aqua';
    results.innerHTML = "";
    M = 1;
}

init();

document.querySelector("#plot").addEventListener('click', function() {
    plotPoints = !(plotPoints);
    if(plotPoints == true) {
        document.querySelector("#plot").style.color = 'aqua';
    }else{
        document.querySelector("#plot").style.color = '#cfffee';
    }
    M = 0;
});

document.querySelector("#reset").addEventListener('click', function() {
    init();
    M = 0;
});

addEventListener('resize', function() {
    canvas.width = Line.width = window.innerWidth;
    canvas.height = Line.height = window.innerHeight;
    init();
});

addEventListener('click', event => {
    if(plotPoints) {
        x = event.clientX;
        y = event.clientY;
        if(M!=0){
            point(x, y, 'aqua');
            const newListItem = document.createElement('tr');
            X.push(toX(x));
            Y.push(toY(y));
            avgX = averageArr(X);
            avgY = averageArr(Y);
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

            newListItem.innerHTML = `<td>${toX(x)}</td><td>${toY(y)}</td>`
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
        M++;
    }
});