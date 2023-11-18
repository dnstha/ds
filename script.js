window.onload = function() {
    const canvas = document.querySelector('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const c = canvas.getContext('2d');

    let rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * devicePixelRatio;
    canvas.height = rect.height * devicePixelRatio;
    c.scale(devicePixelRatio, devicePixelRatio);
    canvas.style.width = rect.width + "px";
    canvas.style.height = rect.height + "px";

    let mouse = {
        x: undefined,
        y: undefined
    }

    const maxRadius = 50;
    let minRadius = 3;

    let colorArray = [
        'maroon',
        'black',
        'skyblue',
        'lavender',
        'pink',
        'limegreen',
        'white'
    ];

    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * devicePixelRatio;
        canvas.height = rect.height * devicePixelRatio;
        c.scale(devicePixelRatio, devicePixelRatio);
        canvas.style.width = rect.width + "px";
        canvas.style.height = rect.height + "px";
        init();
    });

    window.addEventListener('mousemove', 
        function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    function Circle(x, y, dx, dy, radius) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.minRadius = radius;
        this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

        this.draw = function () {
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
            c.fillStyle = this.color; // color that is filled
            c.fill(); //fills the inner circle
        }

        this.update = function() {
            if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
                this.dx = -this.dx; // To make the canvas bounce off when it gets to the end
            }

            if (this.y + this.radius > innerHeight || this.y - this.radius < 0){
                this.dy = -this.dy;
            }

            this.y += this.dy;
            this.x += this.dx;

            //interactivity
            if (mouse.x - this.x < 40 && mouse.x - this.x > -40 && mouse.y - this.y < 40 && mouse.y - this.y > -40) {
                if(this.radius < maxRadius){
                    this.radius += 1;
            }
            } else if (this.radius > this.minRadius) {
                this.radius -= 1;
            }
            
            this.draw();
        }
    }

    let circleArray = []; //creating an array to store the circles

    function init() {
        circleArray = [];

        for(let i = 0; i < 800; i++) {
            let radius = Math.random() * 3 + 1;
            let x = Math.random() * (innerWidth - 2*radius) + radius;
            let y = Math.random() * (innerHeight - 2*radius) + radius;
            let dx = (Math.random() - 0.5);
            let dy = (Math.random() - 0.5);
            circleArray.push(new Circle(x, y, dx, dy, radius));
        }
    }

    function animation() {
        requestAnimationFrame(animation);
        c.clearRect(0, 0, innerWidth, innerHeight); // Clearing the canvas so the circles don't overlap

        for (let i = 0; i < circleArray.length; i++) {
            circleArray[i].update();
        }
    }

    init();
    animation();
}