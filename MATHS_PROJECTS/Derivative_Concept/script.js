const canvas = document.querySelector('#lines');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');
let scale = graphScale;
graphColor = 'white';
drawGraph();


let play = true; // Play-pause the animation
let dx; // Change in x
const DX = 0.008; // Amount of change in x
let cofs = []; // array to store the coefficients of the polynomial
let polyColor, tangentColor, pointColor; // colors
let nTerms; // Number of terms in the polynomial

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

// polyn[String.fromCharCode(65)] = 2; // equivalent to polyn.A
let polyn; // object that stores coefficients and powers of x in polynomial

function createPoly(...cof){ // highest power of the polynomial
    // arguments must be given in the form a, b, c, d, e to create polynomial ax^4 + bx^3 + cx^2 + dx + e
    let expn = [];
    let degree = cof.length-1;
    for(let i = 0; i<=degree; i++){
        expn[i] = new Term(cof[i], degree-i);
    }
    return expn;
}


addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

addEventListener('keydown', (event) => {
    if(event.key == "ArrowLeft" && dx >= 0 || event.key == "ArrowRight" && dx <= 0){
        dx = dx < 0 ? -DX: DX;
        dx *= -1;
    }else if(event.key == " "){
        play = !play
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
    if(play && (PlotX(movingPoint.x) < 0 || PlotX(movingPoint.x) > window.innerWidth)){
        // if(event.key=='ArrowLeft' || event.key=='ArrowRight' || event.key==' '){ 
            if(PlotX(movingPoint.x) < 0) movingPoint.x = toX(1);
            else if(PlotX(movingPoint.x) > window.innerWidth) movingPoint.x = toX(window.innerWidth-1); 
        // }
    }
});

function P(x, y){
    this.x = x;
    this.y = y;

    this.update = function(){
        this.y = calculateTangent(this.x)
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

let movingPoint = new P(0, 0); // Point of contact of line and curve
let Cv = new P(0, 0); // Converted values of moving point as PlotX, PlotY
let tangent = {slope:0, yInt:0}; // Object to store slope and y-intercept of the tangent line

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
  

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    Cv.x = PlotX(movingPoint.x);
    Cv.y = PlotY(movingPoint.y);

    connectColorDashed(c, Cv.x, 0, Cv.x, canvas.height, 0.4);
    // drawFunction(c, `${cofs[0]}*x*x*x + ${cofs[1]}*x*x + ${cofs[2]}*x + ${cofs[3]}`, 'magenta');
    drawFunction(c, generatePolynomial(...cofs), polyColor);
    // drawFunction(c, `${Pr.A}*x*x+${Pr.B}*x+${Pr.C}`, 'magenta');
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
    writeText(c, `Equation of tangent: y = ${roundUp(tangent.slope, 1000)}x + ${roundUp(tangent.yInt, 1000)}`, 20, 50, tangentColor);
    writeText(c, `x = ${roundUp(movingPoint.x,1000)}`, 20, 75, lightColors[1]);
   
    let Pexpn = (generatePolynomial(...cofs).replaceAll('**', '^')).replaceAll('1*', '').replace('^1', '');
    writeText(c, `y = ${Pexpn}`, 20, 100, polyColor);
    // c.beginPath();
    // for(let i =0; i<canvas.width; i++){
    //     let x = toX(i);
    //     c.lineTo(PlotX(x), PlotY(Math.sin(x)));
    // }
    // c.stroke();

    // c.beginPath();
    // for(let i =0; i<canvas.width; i++){
    //     let x = toX(i);
    //     c.lineTo(PlotX(x), PlotY(Math.cos(x)));
    // }
    // c.stroke();

    // c.beginPath();
    // for(let i =0; i<canvas.width; i++){
    //     let x = toX(i);
    //     c.lineTo(PlotX(x), PlotY(Math.sin(x)));
    // }
    // c.stroke();

    // c.strokeStyle = 'red';
    // c.beginPath();
    // for(let i =0; i<window.innerWidth; i++){
    //     let x = toX(i);
    //     let y = x*x*x;
    //     c.lineTo(PlotX(x), PlotY(y));
    // }
    // c.stroke();

    // drawFunction(c, '3*(x**2) + x + 1', 'red');
}

addEventListener('click', function(event){
    play = false;
    movingPoint.x = toX(event.clientX);
    movingPoint.update();
});

// function pY(x){ // Y-coordinate of parabola at x
//     let y = Pr.A*x*x + Pr.B*x + Pr.C;
//     return y;
// }

function yfx(x, ...P){ // for regular polygons only
    let y = 0;
    const n = P.length-1;
    for(let i = n; i>=0; i--){
        y += P[n-i] * x**i;
    }
    return y;
}

// function cY(x){
//     let y = Cu.a*x*x*x + Cu.b*x*x + Cu.c*x + Cu.d;
//     return y;
// }

function init(){
    c.font = '24px normal verdana'
    play = true;

    nTerms = randomInt(3, 6);
    let polyCoeff = [];
    for(let i = 0; i<nTerms; i++){
        polyCoeff.push(randomInt(-5, 5));
    }
    
    polyColor = 'magenta';
    tangentColor = 'aqua';
    pointColor = 'red';
    
    polyn = createPoly(...polyCoeff);
    // polyn = createPoly(5, -2, 2, 1, -5, 3, 2);

    dx = DX;
    cofs = polyn.map(item => item.coeff);
    // console.log(generatePolynomial(...cofs));
    movingPoint.x = randomInt(-5, 5);
    movingPoint.y = calculateTangent(movingPoint.x);
}

init();
animate();


// Example of a dynamic function
// function operate(input) {
//     let x = 2;

//     let dynamicF = new Function('x', 'return ' + input);

//     let result = dynamicF(x);

//     return result;
// }

// console.log(operate('x*Math.PI'))

