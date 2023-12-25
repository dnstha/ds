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

connectColorCtx = (c, x1, y1, x2, y2, color) => {
    c.beginPath();
    c.moveTo(x1, y1);
    c.lineTo(x2, y2);
    c.strokeStyle = color;
    c.lineWidth = 2;
    c.stroke();
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

point = (x, y, color) => {
    c.beginPath();
    c.arc(x, y, 3, 0, Math.PI * 2, true);
    c.fillStyle = color;
    c.fill();
    c.closePath();
}

writeText = (c, text, x, y, color) => {
    c.fillStyle = color;
    c.fillText(text, x, y);
}