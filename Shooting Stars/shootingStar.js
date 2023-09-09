const canvas = document.getElementById('stars');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d');

let timer;
let spawnRate = 80;
function init(){
    timer = 0;
    stars = [];
    miniStars = [];
    radius = Math.random() * 10 + 5;
    x = randomInt(radius, canvas.width-radius);
    y = randomInt(-10, -200);
    stars.push(new Star(x, y, radius, randomColor(lightColors), c));
}
function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach((p, i) => {
        p.update();
        if(p.radius < 3) {
            stars.splice(i, 1);
        }
    });
    miniStars.forEach((miniStar, i) => {
        miniStar.update();
        if(miniStar.opacity < 0.05) {
            miniStars.splice(i, 1);
        }
    });
    timer++;
    if(timer % spawnRate == 0) {
        const radius = Math.random() * 10 + 5;
        const x = randomInt(radius, canvas.width-radius);
        stars.push(new Star(x, randomInt(-10, -200), radius, randomColor(lightColors), c));
        spawnRate = randomInt(60,250);
        timer = 1;
    }
}
init();
animate();

addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});