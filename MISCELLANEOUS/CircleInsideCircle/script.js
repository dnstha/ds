const canvas = document.querySelector('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;

const c = canvas.getContext('2d');
c.translate(canvas.width/2, canvas.height/2);


const increment = 0.03;
let speed = increment;


addEventListener('resize', function(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    c.translate(canvas.width/2, canvas.height/2);
    init();
    drawPoint();
});

document.querySelector('#n').addEventListener('keyup', (e)=>{
    if(e.key === "Enter"){
        drawPoint();
    }
});

document.querySelector('#set').addEventListener('click', ()=>{
    drawPoint();
});

document.querySelector('#reset').addEventListener('click', ()=>{
    init();
});

document.querySelector('#PlayPause').addEventListener('click', function(){
    play = !play;
    changeBtn();
});

document.querySelector('#speed').addEventListener('change', ()=>{
    speed = Number(document.querySelector('#speed').value)/50 * increment;
});

function Circle(x, y, radius, phase, angle, color = 'red'){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.phase = phase; // Initial phase of particle
    this.angle = angle; // Changing angle for the motion
    this.color = color;

    this.drawLine = function(){
        c.save();
        c.rotate(this.phase);
        c.strokeStyle = this.color;
        c.globalAlpha = 0.5;
        c.lineWidth = 0.7;
        c.beginPath();
        c.lineTo(x-R, y);
        c.lineTo(x+R, y);
        c.stroke();
        c.restore();
    }

    this.draw = function(){
        c.fillStyle = this.color;
        c.beginPath();
        c.arc(this.x ,this.y, this.radius, 0, Math.PI * 2);
        c.fill();
    }

    this.update = function(){
        this.x = x + R * Math.sin(this.angle);
        // this.y = y + 200 * Math.cos(this.phase);
        if(play){
            this.angle += speed;
        }
        c.save();
        c.lineWidth = 1;
        c.rotate(this.phase);
        this.draw();
        c.restore();
    }
}

let cArr;
let x, y, radius, R, num;
let play = true;

function isInt(x){
    if(typeof x === 'number'){
        return x%1 === 0;
    }
}

function insertParticles(){
    cArr = [];
    for(let i = 0; i<num; i++){
        let phase = Math.PI/(num)*i;
        let color = `hsl(${(15*i)%360}, 90%, 50%)`;
        cArr.push(new Circle(x, y, radius, phase, phase, color));
    }
}

function changeBtn(){
    if(play){
        document.querySelector('#PlayPause').innerText = `| |`;
    }else{
        document.querySelector('#PlayPause').innerHTML = `<i class="fa-solid fa-play">`;
    }
}

function drawPoint(){
    if(document.querySelector('#n').value !== ''){
        num = Number(document.querySelector('#n').value); 
        if(isInt(num) && num > 0){
            if(num <= 180){
                insertParticles();
            }else{
                alert('Number is too big!');
            }
        }else{
            alert('Enter a positive integer!');
        }
    }
}

function init(){
    if(canvas.width >= canvas.height){
        R = 250;
    }else{
        R = canvas.width*0.4;
    }

    c.strokeStyle = 'skyblue';
    c.lineWidth = 1.5;
    x = 0;
    y = 0;
    radius = 4;
    num = 12; // Better if multiples of 18 as it is a factor of 180 with 10 as quotient
    insertParticles();
    speed = increment;
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
    
    c.beginPath();
    c.arc(x, y, R, 0, Math.PI*2);
    c.stroke();

    cArr.forEach(elem => {
        elem.drawLine();
    });
    cArr.forEach(elem => {
        elem.update();
    });
}

init();
animate();