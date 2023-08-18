const ball = document.getElementById('ball');
const container = document.querySelector('.container');
let factor;

let positionY, velocityY;
const gravity = 1.2;
let g = gravity;

function init() {
    positionY = 0;
    velocityY = 0;
}

function animate() {
    velocityY += g;
    positionY += velocityY;
    
    if (positionY + ball.clientHeight > container.clientHeight) {
        positionY = container.clientHeight - ball.clientHeight;
        velocityY *= -0.8; // Multiplied by coefficient of restitution
    }
    ball.style.transform = `translateY(${positionY}px)`;
    requestAnimationFrame(animate);
}
init();
animate();

document.querySelector('select').onchange = () => {
    factor = Number(document.querySelector('select').value);
    if(factor == 1) { // Earth
        ball.style.background = '#0f12ad';
    }else if(factor == 0.1654) { // Moon
        ball.style.background = 'grey';
    }else if(factor == 0.383) { // Mercury
        ball.style.background = 'orange';
    }else if(factor == 0.904) { // Venus
        ball.style.background = 'red';
    }else if(factor == 0.38) { // Mars
        ball.style.background = 'brown';
    }else if(factor == 2.528) { // Jupiter
        ball.style.background = 'maroon';
    }else if(factor == 1.065) { // Saturn
        ball.style.background = 'salmon';
    }else if(factor == 0.886) { // Uranus
        ball.style.background = 'skyblue';
    }else if(factor == 1.14) { // Neptune
        ball.style.background = 'violet';
    }else if(factor == 0.08333) { // Pluto
        ball.style.background = 'limegreen';
    }else if(factor == 27.9) {  // Sun
        ball.style.background = 'yellow';
    }
    g = factor*gravity;
    init();
};

document.getElementById('reset').onclick = () => {
    init();
}