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

let previousx2, previousx3, previousy, factor;
// addEventListener('click', function(event){
//     pp = !(pp);
// });

document.getElementById("plps").addEventListener('click', function(){
    pp = !(pp);
    if(pp == false) {
        document.getElementById("plps").style.color = lightColors[1];
    }else{
        document.getElementById("plps").style.color = '#cfffee';
    }
});

document.getElementById("increase").addEventListener('click', function(){ // instead you can write window.eventListener
    if(canvas.height - t1.y2 > 100) {
        previousy = t1.y2;
        previousx2 = t1.x2;
        previousx3 = t1.x3; 
        t1.y2 += 10 * 19/15;
        t1.y3 = t1.y2;
        factor = getDist(previousx2,previousy, previousx3, previousy)/getDist(t1.x1,t1.y1, previousx2,previousy);
        // If statement checks if the new point goes out of the canvas
        if(factor * getDist(t1.x1,t1.y1, t1.x2,t1.y2) + previousx2 < canvas.width) {
            t1.x3 = factor * getDist(t1.x1,t1.y1, t1.x2,t1.y2) + previousx2;
        }
    }
});

document.getElementById("decrease").addEventListener('click', function(){ // instead you can write window.eventListener
    if(t1.y2 - t1.y1 > 60) {
        previousy = t1.y2;
        previousx2 = t1.x2;
        previousx3 = t1.x3; 
        t1.y2 -= 10 * 19/15;
        t1.y3 = t1.y2;
        factor = getDist(previousx2,previousy, previousx3, previousy)/getDist(t1.x1,t1.y1, previousx2,previousy);
        t1.x3 = factor * getDist(t1.x1,t1.y1, t1.x2,t1.y2) + previousx2;
    }
});

document.getElementById("reset").addEventListener('click', function(){ // instead you can write window.eventListener
    init();
});

getDist = (x1, y1, x2, y2) => {
    let x = x2 - x1;
    let y = y2 - y1;
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

deg = (x) =>{
    return x*180/Math.PI;
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
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
    this.dx = 4 * (Math.random() - 0.5);
    this.dy = (Math.random() - 5) * 4;
    this.update = function(){
        if (pp){
            if(this.x3 + this.dx > innerWidth || this.x3  + this.dx < this.x1){
                this.dx = -this.dx;
            }
            this.x3 += this.dx;
        }
        EAB = getDist(this.x1,this.y1, this.x2,this.y2);
        EBC = getDist(this.x2,this.y2, this.x3,this.y3);
        ECA = getDist(this.x1,this.y1, this.x3,this.y3);
        AB = Math.round(EAB * 15000/19)/1000;
        BC = Math.round(EBC * 15000 / 19) / 1000;
        CA = Math.round(ECA  * 15000 / 19) / 1000;

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
        
        if(this.x3 - this.x2 > 18) {
            c.beginPath();
            c.moveTo(this.x2, this.y2 - 16);
            c.lineTo(this.x2 + 16, this.y2 - 16);
            c.lineTo(this.x2 + 16, this.y2);
            c.lineWidth = 2;
            c.strokeStyle = 'aqua';
            c.lineJoin = "bevel"; // makes the corners smoother
            c.stroke();
        }
        
        c.font = 'bold 24px times'; // styling the text
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
        
        c.fillStyle = lightColors[1];
        c.fillText("sinC = AB/CA \u2248 " + AB +"/" + CA + " \u2248 " + Math.round(AB/CA * 1000)/1000, canvas.width - 450, 30);
        c.fillText("cosC = BC/CA \u2248 " + BC +"/" + CA + " \u2248 " + Math.round(BC/CA * 1000)/1000, canvas.width - 450, 55);
        c.fillText("tanC = AB/BC \u2248 " + AB +"/" + BC + " \u2248 " + Math.round(AB/BC * 1000)/1000, canvas.width - 450, 80);
    }
}
let t1,  AB, BC, CA, ABC, BCA, CAB;
let EAB, EBC, ECA; // Exact Values of side lengths
let x1,y1, x2,y2, x3,y3;
let pp;
init = () =>{
    x1 = 20;
    y1 = 70;
    x2 = x1;
    y2 = 450;
    x3 = randomInt(x2, canvas.width - x2);
    y3 = y2;    
    t1 = new Triangle(x1,y1, x2,y2, x3,y3);
    pp = true;
    document.getElementById("plps").style.color = "#cfffee";
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    t1.update();
}

init();
animate();

