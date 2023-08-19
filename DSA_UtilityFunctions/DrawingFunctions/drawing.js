const lightColors = [
    '#cfffee',
    '#ff1d58',
    '#F2C6C2',
    '#FF81D0',
    '#DAFDBA',
    '#9AEBA3',
    '#45C4B0',
    '#FACFCE',
    '#F1FACF'
];

const darkColors = [
    '#a28089',
    '#015958',
    '#7A577A',
    '#182028',
    '#400036'
];


addEventListener('resize', function() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init(); 
});

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

connect = (x1, y1, x2, y2) => {
    c.beginPath();
    c.moveTo(x1, y1);
    c.lineTo(x2, y2);
    c.strokeStyle = 'lavender';
    c.lineWidth = 2;
    c.stroke();
}

// Connect given pionts with the given color
connectColor = (x1, y1, x2, y2, color) => {
    c.beginPath();
    c.moveTo(x1, y1);
    c.lineTo(x2, y2);
    c.strokeStyle = color;
    c.lineWidth = 2;
    c.stroke();
}

point = (x, y, color) => {
    c.beginPath();
    c.arc(x, y, 3, 0, Math.PI * 2, true);
    c.fillStyle = color;
    c.fill();
    c.closePath();
}