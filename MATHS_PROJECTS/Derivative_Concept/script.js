const canvas = document.querySelector('#lines');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');
let scale = graphScale;
graphColor = 'white';
drawGraph();

addEventListener("resize", () => {
    // Checking if the window size has significantly changed
    const widthChange = Math.abs(canvas.width - window.innerWidth);
    const heightChange = Math.abs(canvas.height - window.innerHeight);

    // a threshold for changes
    const threshold = 0.01;

    if (widthChange > threshold || heightChange > threshold) {
        // Update the previous dimensions
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Calling the init function here
        init();
    }else{
        graphColor = 'white';
        drawGraph();
    }
});


let play = true; // Play-pause the animation
let dx; // Change in x
const DX = 0.008; // Amount of change in x

let cofs = []; // array to store the coefficients of the polynomial
// redundacy in cofs and polyCoeff will be solved later as soon as possible
let polyCoeff = [];

let polyColor, tangentColor, pointColor; // colors
let nTerms; // Number of terms in the polynomial

// polyn[String.fromCharCode(65)] = 2; // equivalent to polyn.A
let polyn; // object that stores coefficients and powers of x in polynomial

// Different objects and classes
class Point{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

function Term(coeff, power) { // algebraic term in terms of x, viz. coeff*x^power
    this.coeff = coeff;
    this.power = power;
}

function P(x, y){
    this.x = x;
    this.y = y;

    this.update = function(){
        this.y = calculateTangent(this.x)
    }
}

let movingPoint = new P(0, 0); // Point of contact of line and curve
let Cv = new P(0, 0); // Converted values of moving point as PlotX, PlotY
let tangent = {slope:0, yInt:0}; // Object to store slope and y-intercept of the tangent line


// Utility functions
function createPoly(...cof){ // highest power of the polynomial
    // arguments must be given in the form a, b, c, d, e to create polynomial ax^4 + bx^3 + cx^2 + dx + e
    let expn = [];
    let degree = cof.length-1;
    for(let i = 0; i<=degree; i++){
        expn[i] = new Term(cof[i], degree-i);
    }
    return expn;
}


function derivaivePow(x, coeff, power=0){ // derivative of a term coefficient * x^power, using power rule
    let d;
    if(typeof x == 'number' && typeof coeff == 'number' && typeof power == 'number'){
        if(power === 0){ // derivative of constant for any value of x is 0
            d = 0;
        }else if(power == 1){
            d = coeff;
        }else if(x == 0){
            if(power<1){
                d = undefined;
            }else{
                d = 0;
            }
        }else if((x<0 && roundUp(power%1, 1000) == 0) || x>0){    
            d = power * coeff * (x**(power-1));
        }else{
            d = undefined;
        }
        return d;
    }
}

function changeBtn(){
    if(play === true){
        document.querySelector('#plps').innerText = '| |';
    }else if(play === false){
        document.querySelector('#plps').innerHTML = `<i class="fa-solid fa-play">`;
    }
}

// function polynomial(...x){
//     let n = x.length-1;
//     let expn = ''; // expression of polynomial
//     for(let i=n; i>=0; i--){
//         if(i=n) {
//             expn = `${x[i]}*(x**${i}) + `;
//         }
//         // else if(i!=0){
//         //     expn += `${x[i]}*(x**${i}) + `;
//         // }else if(i == 0){
//         //     expn += `${x[i]}*(x**${i})`;
//         // }
//     }
//     return expn;
// }


// calculates derivative for a polynomial function in terms of a0*x^n + a1*x^(n-1) + ... + an*x^(n-n)
// It doesn't calculate derivative if the power is less than zero or polynomial has fractional power
/* I will create derivative calculator function for any power of x, by taking arrays with
two elements, first being the coefficient and the second being the power.
It will be general for calculating any polynomial's derivative. For simplicity, I will
use the following function for derivatives of polynomials
*/
function derivaivePol(x, ...A){
    const len = A.length-1;
    let d = 0;
    for(let i = len; i>0; i--){
        if(i != 1){ // to avoid 0 to the power 0
            d += i*A[len-i]*(x**(i-1));
        }else if(i == 1){
            d += A[len - 1];
        }
    }
    return d;
}

function calculateTangent(X){
    let Y = yfx(X, ...cofs);
    tangent.slope = derivaivePol(X, ...cofs);
    tangent.yInt = Y - X*tangent.slope;
    return Y; // returning Y value to keep track of y coordinate of the moving point
}

// A function that takes an array of coefficients and returns a string
function generatePolynomial(...coefficientArray) {
    // Initialize an empty string to store the result
    let result = "";
    let n = coefficientArray.length - 1;

    for (let i = n; i >= 0; i--) {
        // Get the current coefficient and the corresponding power of x
        let coef = coefficientArray[n-i];
        let power = i;
        // If the coefficient is zero, skipping it
        if (coef === 0) continue;
        // If the coefficient is negative, adding a minus sign
        if (coef < 0) result += " - ";
        // If the coefficient is positive and not the first term, add a plus sign
        if (coef > 0 && result !== "") result += " + ";
        // If the coefficient is not zero, add it to the result.
        //  We are using absolute value of coefficient because, we have already assigned sign to it
        if (Math.abs(coef) !== 0) result += Math.abs(coef);
        // If the power is not zero, add x and the power to the result
        if (power !== 0) result += `*x**${power}`;
    }
    
    return result;
}

function yfx(x, ...P){ // for regular polygons only
    let y = 0;
    const n = P.length-1;
    for(let i = n; i>=0; i--){
        y += P[n-i] * x**i;
    }
    return y;
}

function adjustX(){
    if(play && (PlotX(movingPoint.x) < 0 || PlotX(movingPoint.x) > window.innerWidth)){
        // if(event.key=='ArrowLeft' || event.key=='ArrowRight' || event.key==' '){ 
            if(PlotX(movingPoint.x) < 0) movingPoint.x = toX(1);
            else if(PlotX(movingPoint.x) > window.innerWidth) movingPoint.x = toX(window.innerWidth-1); 
        // }
    }
}

function Draw(){
    polyCoeff = [];
    if(!filled('#a')){
        nTerms = randomInt(1, 6);
        for(let i = 0; i<nTerms; i++){
            polyCoeff.push(randomInt(-5, 5));
        }
        polyn = createPoly(...polyCoeff);
        cofs = polyn.map(item => item.coeff);
    }else{
        cofs = [];
        nTerms = Number(document.querySelector('#equation').value);
        for(let i = 0; i<=nTerms; i++){
            cofs[i] = Number(document.querySelector(`#${String.fromCharCode(97+i)}`).value);
        }
        // cofs = polyCoeff.map(item => Number(item.value));
    }
}

function insertX(){
    play = false;
    movingPoint.x = Number(document.querySelector('#x').value);
    movingPoint.update();
}

function init(){
    c.font = 'bold 24px cambria'
    play = true;
    polyColor = 'magenta';
    tangentColor = 'aqua';
    pointColor = 'red';
    dx = ((-1)**randomInt(1, 2))*DX;

    Draw();

    movingPoint.x = randomInt(-5, 5);
    movingPoint.y = calculateTangent(movingPoint.x);
    document.querySelector('#plps').innerHTML = '| |';
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    Cv.x = PlotX(movingPoint.x);
    Cv.y = PlotY(movingPoint.y);

    connectColorDashed(c, Cv.x, 0, Cv.x, canvas.height, 0.4); // Trace the position of x in the graph
    drawFunction(c, generatePolynomial(...cofs), polyColor);
    line(c, tangent.slope, tangent.yInt, tangentColor);
    // drawFunction(c, `(x-2)*(x-3)*(x-6)*(x-4)*(x-1)*(x+1)`, 'yellow')
    if(Cv.x >= canvas.width || Cv.x <= 0){    
        dx *= -1;
    }
    if(play){
        movingPoint.x += dx;
        movingPoint.update();
    }

    point(Cv.x, Cv.y, pointColor);
    let position = {x:20, y:canvas.height, gap: 25}; // positions of the equations
    if(tangent.yInt >= 0) {
        writeText(c, `Equation of tangent: y = ${roundUp(tangent.slope, 1000)}x + ${roundUp(tangent.yInt, 1000)}`, position.x, position.y - position.gap, tangentColor);
    }else{
        writeText(c, `Equation of tangent: y = ${roundUp(tangent.slope, 1000)}x - ${roundUp(modulus(tangent.yInt), 1000)}`, position.x, position.y - position.gap, tangentColor);
    }
    writeText(c, `x = ${roundUp(movingPoint.x,1000)}`, position.x, position.y - position.gap*2, lightColors[1]);
   
    let Pexpn = (generatePolynomial(...cofs).replaceAll('**', '^')).replaceAll('1*', '').replace('^1', '');
    if(Pexpn == ''){
        writeText(c, `y = 0`, position.x, position.y - position.gap*3, polyColor);
    }else{
        writeText(c, `y = ${Pexpn}`, position.x, position.y - position.gap*3, polyColor);
    }
}



// Event Listeners
addEventListener('keydown', (event) => {
    if(event.key == "ArrowLeft" && dx >= 0 || event.key == "ArrowRight" && dx <= 0){
        dx = dx < 0 ? -DX: DX;
        dx *= -1;
    }else if(event.key == " "){
        play = !play
        changeBtn();
    }
    if((event.key == 'ArrowLeft' || event.key == 'ArrowRight')){
        let change = 0.1;
        if(event.key == "ArrowLeft"){
            change = -change;
        }
        movingPoint.x += change;
        movingPoint.update();
    }
});

addEventListener('keyup', () => {
    adjustX();
});

// Removed this feature as it seemed redundant and caused complexities
// addEventListener('click', function(event){
//     if(changeX){
//         play = false;
//         movingPoint.x = toX(event.clientX);
//         movingPoint.update();
//     }
// });

document.querySelector('#plps').addEventListener('click', function(){
    play = !play;
    changeBtn();
    adjustX();
});

document.querySelector('#equation').addEventListener('change', function(){
    let elem = [];
    let degree = document.querySelector('#equation').value;

    for(let i = degree;  i>=0; i--){
        if(i == 0){
            elem[degree - i] =`
            <input id=${String.fromCharCode(97+(degree-i))} class='polyTerm' type = "number" inputmode = "numeric" placeholder=${String.fromCharCode(97+(degree-i))} required>
            `;
        }else if(i == 1){
            elem[degree - i] =`
            <input id=${String.fromCharCode(97+(degree-i))} class='polyTerm' type = "number" inputmode = "numeric" placeholder=${String.fromCharCode(97+(degree-i))} required>
            x + 
            `;
        }else{
            elem[degree - i] =`
            <input id=${String.fromCharCode(97+(degree-i))} class='polyTerm' type = "number" inputmode = "numeric" placeholder=${String.fromCharCode(97+(degree-i))} required>
            x<sup>${i}</sup> + 
            `;
        }
    }
    document.querySelector('#polynomial').innerHTML = '';
    for(let i = 0; i<=degree; i++){
        document.querySelector('#polynomial').innerHTML += elem[i];
    }
});

document.querySelector('#drawCurve').addEventListener('click', function(){
    if(filled('#a')){
        init();
    }
});

document.querySelectorAll('#polynomial').forEach(element => element.addEventListener('keyup', function(event){
    if(event.key === "Enter"){
        init();
    }
}));

document.querySelector('#set').addEventListener('click', function(){
    if(filled('#x')){
        insertX();
        changeBtn();
    }
});

document.querySelector('#x').addEventListener('keyup', function(event){
    if(event.key == 'Enter' && filled('#x')){
        insertX();
        changeBtn();
    }
});

// document.querySelector('form').addEventListener('click', function(event){
//     // if(check){
//     //     M = false;
//     // }
//     console.log(event)
// });

document.querySelector('#reset').addEventListener('click', function(){
    document.querySelector('#polynomial').innerHTML = `
    <input id = 'a' class = 'polyTerm' type = "number" inputmode = "numeric" placeholder="a" required>
    `;
    init();
});

document.querySelector('#reverse').addEventListener('click', function(){
    dx *= -1;
});

// Calling two main functions
init();
animate();