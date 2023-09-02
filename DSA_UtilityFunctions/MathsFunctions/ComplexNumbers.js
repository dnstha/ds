let temp;
function Complex(x, y) {
    // x + iy, where i^2 = -1
    this.x = x;
    this.y = y;
    this.r = Math.sqrt(this.x*this.x + this.y*this.y);
    this.arg = invCos(this.x/this.r, this.y);

    this.translate = function(a, b) { // translating vector Vx and Vy
        this.x += scalePoint(a);
        this.y -= scalePoint(b);
    }

    this.rotate = function(angle, a, b) { // Rotating angle, rotating point x, rotating point y
        // Making the point with reference to the rotating point
        this.x = toX(this.x) - a;
        this.y = b - toY(this.y);

        // New rotated point assuming that the rotating piont is origin
        temp = rotatePoint(this.x, this.y, -angle);

        // Translating the point to the final coordinate
        this.x = PlotX(a + temp.x);
        this.y = PlotY(b - temp.y);
        this.r = temp.r;
        this.arg = temp.arg;
    }

    this.scale = function(k, a, b) { // scaling factor, scaling point x and y
        a = PlotX(a);
        b = PlotY(b);
        this.x = (this.x - a) * k + a;
        this.y = (this.y - b) * k + b;
    }
}


// c1 + c2
cmplxAdd = (c1, c2) => {
    let x = c1.x + c2.x;
    let y = c1.y + c2.y;
    return new Complex(x, y);
}

// c1 - c2
cmplxDiff = (c1, c2) => {
    let x = c1.x - c2.x;
    let y = c1.y - c2.y;
    return new Complex(x, y);
}

// c1 * c2
cmplxMul = (c1, c2) => {
    let x = det2(c1.x, c1.y, c2.y, c2.x);
    let y = det2(c1.x, -c1.y, c2.x, c2.y);
    return new Complex(x, y);
}

// c1/c2
cmplxDiv = (c1, c2) => {
    let d = c2.x*c2.x + c2.y*c2.y;
    let x = det2(c1.x, -c1.y, c2.y, c2.x)/d;
    let y = det2(c1.y, c1.x, c2.y, c2.x)/d;
    return new Complex(x,y);
}

// rotate using one complex number as a function
rotatePoint = (x, y, angle) => {
    let C = new Complex(x, y);
    let D = new Complex(Math.cos(rad(angle)), Math.sin(rad(angle)));
    return cmplxMul(C, D);
}