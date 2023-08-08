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