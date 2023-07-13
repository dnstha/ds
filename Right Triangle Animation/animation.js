const canvas = document.querySelector("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
let c = canvas.getContext("2d");
console.log(canvas);

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});


addEventListener('click', function(){
    pp = !(pp);
});

getDist = (x1, y1, x2, y2) => {
    let x = x2 - x1;
    let y = y2 - y1;
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

deg = (x) =>{
    return x*180/Math.PI;
}

/*
dotProduct = (a1,b1, a2,b2) => {
    return a1*a2 + b1*b2;
}

vector = (x1, y1, x2, y2) => {

}
*/

function average() {
    let avg = 0;
    let n = arguments.length;
    for(let i = 0; i<n; i++) {
        avg += arguments[i];
    }
    return avg/n;
}

function Triangle(x1, y1, x2, y2, x3, y3){
    this.x1 = x1;
    this.x2 = x2;
    this.x3 = x3;
    this.y1 = y1;
    this.y2 = y2;
    this.y3 = y3;
    this.dx = 0.998;

    this.update = function(){
        if (pp){
            if(this.x3 + this.dx > innerWidth || this.x3  + this.dx < this.x1){
                this.dx = -this.dx;
            }
            this.x3 += this.dx;
        }
        

        AB = Math.round(getDist(this.x1,this.y1, this.x2,this.y2));
        BC = Math.round(getDist(this.x2,this.y2, this.x3,this.y3) * 1000) / 1000;
        CA = Math.round(getDist(this.x1,this.y1, this.x3,this.y3)  * 1000) / 1000;

        ABC = 90;
        BCA = Math.round(deg(Math.atan(AB/BC)) * 100) / 100;
        CAB = Math.round(deg(Math.atan(BC/AB)) * 100) / 100;
        /*
        console.log(getDist(this.x1, this.y1, this.x2, this.y2));
        console.log(getDist(this.x2, this.y2, this.x3, this.y3));
        console.log(getDist(this.x1, this.y1, this.x3, this.y3));
        */
        this.draw();
    }

    this.draw = () => {
        c.beginPath();
        c.moveTo(this.x1, this.y1);
        c.lineTo(this.x2, this.y2);
        c.lineTo(this.x3, this.y3);
        c.lineTo(this.x1, this.y1);
        c.closePath();
        c.fillStyle = 'black';
        c.lineWidth = 1.9;
        c.strokeStyle = 'aqua';
        c.fill();
        c.lineJoin = "bevel"; // makes the corners smoother
        c.stroke();

        c.fillStyle = 'gold'; // Resetting fillStyle for the text

        // c.fillText("The text", x coordinate, y coordinate) for inserting text to the canvas
        c.fillText("A", this.x1 - 4, this.y1 - 5);
        c.fillText("B", this.x2 - 4, this.y2 + 20);
        c.fillText("C", this.x3 - 4, this.y3 + 20);

        
        c.fillStyle = 'limegreen';
        c.fillText("AB = " + AB + ",  BC = " + BC, this.x1 - 4, this.y2 + 50);
        c.fillText("CA = " + CA, average(this.x1, this.x3) + 2, average(this.y1, this.y3));
        
        c.fillStyle = 'aqua';
        c.fillText("\u2220B = " + ABC + "\xB0", this.x1, this.y2 + 80);
        // "\xB0" is the degree symbol in JS
        c.fillText("\u2220A = "+ CAB + "\xB0", this.x1 + 110, this.y2 + 80);
        c.fillText("\u2220C = " + BCA + "\xB0", this.x1 + 250, this.y2 + 80);
        
        c.font = 'bold 20px monospace';
        c.fillStyle = 'red';
        c.fillText("Click anywhere on the screen to play/pause the animation.", this.x1 + 20, this.y2 + 120);
        c.font = 'bold 24px times'; // styling the text
    }
}
let t1,  AB, BC, CA, ABC, BCA, CAB;
let x1,y1, x2,y2, x3,y3;
let pp;
init = () =>{
    x1 = 20;
    y1 = 70;
    x2 = x1;
    y2 = 450;
    x3 = (1 + Math.random()) * 100;
    y3 = y2;    
    t1 = new Triangle(x1,y1, x2,y2, x3,y3);
    pp = true;
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    t1.update();
}

init();
animate();

