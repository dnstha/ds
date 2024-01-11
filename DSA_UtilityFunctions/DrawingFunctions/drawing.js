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

/*
Removed from the drawing.js file to avoid bugs like in transformation files
addEventListener('resize', function() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init(); 
});
*/


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

connectColorCtx = (context, x1, y1, x2, y2, color) => {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.strokeStyle = color;
    context.lineWidth = 2;
    context.stroke();
}

connectColorFade = (x1,y1,x2,y2, alpha) => {
    c.save();
    c.beginPath();
    c.moveTo(x1, y1);
    c.lineTo(x2, y2);
    c.strokeStyle = `rgba(255, 250, 250, ${alpha})`;
    c.lineWidth = 2;
    c.setLineDash([5,5]); // Creates dashed lines [length_of_Dash, Spacing_between_dashes]
    c.stroke();
    c.restore();
}

drawCircle = (context, x, y, radius, color) => {
    context.beginPath();
    context.strokeStyle = color;
    context.arc(x, y, radius, 0, Math.PI*2);
    context.stroke();
}

connectColorDashed = (context,x1,y1,x2,y2, alpha) => {
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

point = (x, y, color, context=c) => {
    context.beginPath();
    context.arc(x, y, 3, 0, Math.PI * 2, true);
    context.fillStyle = color;
    context.fill();
    context.closePath();
}

writeText = (context, text, x, y, color) => {
    context.fillStyle = color;
    context.fillText(text, x, y);
}