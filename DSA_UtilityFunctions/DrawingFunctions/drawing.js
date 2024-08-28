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

const colorGenerator = (h, s=80, l=60, gap=20, initialValue = 0) =>{
    // Generates color for given hsl value
    if(typeof h === 'number'){
        return `hsl(${(gap*h + initialValue)%360}, ${s}%, ${l}%)`; // Color for the points
    }
}

/*
Removed from the drawing.js file to avoid bugs like in transformation files
addEventListener('resize', function() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init(); 
});
*/


function randomColor(colors) {
    // Returns random color from given array of colors
    return colors[Math.floor(Math.random() * colors.length)];
}


const connectColor = (x1, y1, x2, y2, color = "lavender") => {
    // Connect given pionts with the given color
    c.beginPath();
    c.moveTo(x1, y1);
    c.lineTo(x2, y2);
    c.strokeStyle = color;
    c.lineWidth = 2;
    c.stroke();
}

const connectColorCtx = (x1, y1, x2, y2, context = c, color = 'cyan') => {
    // Connects given two points within the given context
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.strokeStyle = color;
    context.lineWidth = 2;
    context.stroke();
}

const connectColorFade = (x1,y1,x2,y2, alpha, context = c) => {
    // Connects given points (x1, y1) and (x2, y2) with dashed line and with given alpha value
    context.save();
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.strokeStyle = `rgba(255, 250, 250, ${alpha})`;
    context.lineWidth = 2;
    context.setLineDash([5,5]); // Creates dashed lines [length_of_Dash, Spacing_between_dashes]
    context.stroke();
    context.restore();
}

const drawCircle = (context, x, y, radius, color) => {
    // Draws a circle in given context canvas and color with center (x, y) and given radius
    context.beginPath();
    context.strokeStyle = color;
    context.arc(x, y, radius, 0, Math.PI*2);
    context.stroke();
}

const connectColorDashed = (context,x1,y1,x2,y2, alpha) => {
    // Connects two points with dashed line and given transparency
    context.save();
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.strokeStyle = `rgba(255, 250, 250, ${alpha})`;
    context.lineWidth = 2;
    context.setLineDash([5,5]); // Creates dashed lines [length_of_Dash, Spacing_between_dashes]
    context.stroke();
    context.restore();
}

const point = (x, y, color, context=c) => {
    // Draws a point in given context
    context.beginPath();
    context.arc(x, y, 3, 0, Math.PI * 2, true);
    context.fillStyle = color;
    context.fill();
    context.closePath();
}

const writeText = (context, text, x, y, color) => {
    context.fillStyle = color;
    context.fillText(text, x, y);
}