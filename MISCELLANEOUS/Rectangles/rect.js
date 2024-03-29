let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let c = canvas.getContext('2d');
console.log(canvas);

let colorArr = [
    'red',
    '#ddffe7',
    'pink',
    'white',
    '#fff9c4',
    '#00eef2',
    'lavender'
];

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

function Rectangle(x, y, l, b, dx, dy){
    this.l = l;
    this.b = b;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.color = colorArr[Math.floor(Math.random()*colorArr.length)];

    this.draw = function(){
        c.beginPath();
        c.fillRect(this.x, this.y, this.l, this.b, this.dx, this.dy);
        c.fillStyle = this.color; //color
        c.fill();
    }

    this.update = function(){
        if(this.x + this.l > innerWidth || this.x < 0){
            this.dx = -this.dx;
        }
        if(this.y+this.b > innerHeight || this.y < 0){
            this.dy = -this.dy;
        }
        if (this.x == 1 && this.y == 1 || this.x == 1 && this.y == innerHeight-this.b-1 || this.y == 1 && this.x == innerWidth - this.l-1 || this.y == innerHeight - this.b-1 && this.x == innerWidth - this.l-1){
            this.dx = this.dy = 0;
        }
        this.x += this.dx;
        this.y += this.dy;   
        
        this.draw();
    }
}



var rectArray = [];
function init() {
    rectArray = [];
    for(let i = 0; i<250; i++) {
        let l = (Math.random()+1) * 10;
        let b = (Math.random()+1) * 10;
        let x = Math.random() * (innerWidth-l);
        let y = Math.random() * (innerHeight-b);
        let dx = (Math.random() - 0.5) * 5;
        let dy = (Math.random() - 0.5) * 5;
        rectArray.push(new Rectangle(x, y, l, b, dx, dy));
    }
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    
    for(let i = 0; i < rectArray.length; i++){
        rectArray[i].update();
    }

}
init();
animate();