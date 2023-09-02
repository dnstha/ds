function Complex(x, y) {
    // x + iy, where i^2 = -1
    this.x = x;
    this.y = y;
    this.r = Math.sqrt(this.x*this.x + this.y*this.y);
    this.arg = invCos(this.x/this.r, this.y);

    this.translate = function(a, b) {
        this.x += a;
        this.y -= b;
    }

    // this.rotate = function(angle) {
    //     cmplxMul(this, );
    // }

    this.enlarge = function(k, a, b) {
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
    let y = det2(c1.x,-c1.y,c2.x,c2.y);
    return new Complex(x, y);
}

// c1/c2
cmplxDiv = (c1, c2) => {
    let d = c2.x*c2.x + c2.y*c2.y;
    let x = det2(c1.x, c1.y, c2.y, c2.x)/d;
    let y = det2(c1.x, -c1.y, c2.x, c2.y)/d;
    return new Complex(x,y);
}

// rotate using one complex number as a function
// rotatePoint = (C, a, b) => {
//     let D = new Complex(a, b);
//     return cmplxMul(C, D);
// }