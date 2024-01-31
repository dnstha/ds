getDist = (x1, y1, x2, y2) => {
    let x = x2 - x1;
    let y = y2 - y1;
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

//Determinant of 2x2 matrix
det2 = (a,b, c,d) => {
    return a*d - b*c;
}

//Determinant of 3x3 matrix
det3 = (a,b,c, d,e,f, g,h,i) => {
    return (a*det2(e,f,h,i) - b*det2(d,f,g,i) + c*det2(d,e,g,h));
}

deg = (x) =>{
    return x*180/Math.PI;
}

rad = (x) =>{
    return x*Math.PI/180;
}

randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Generates any random number in given range including decimal numbers
const randomNum = (min, max) => Math.random() * (max - min) + min;

dotProduct = (a1,b1, a2,b2) => {
    return a1*a2 + b1*b2;
}

vctr = (x1, x2) => {
    return x2-x1;
}

function average(...arg) {
    let avg = 0;
    let n = arg.length;
    for(let i = 0; i<n; i++) {
        avg += arg[i];
    }
    return avg/n;
}

function averageArr(Array) {
    let avg = 0;
    let n = Array.length;
    for(let i = 0; i<n; i++) {
        avg += Array[i];
    }
    return avg/n;
}

function summationArr(Array) {
    let sum = 0;
    for(let i = 0; i<Array.length; i++) {
        sum += Array[i];
    }
    return sum;
}

roundUp = (number, place) => {
    return Math.round(number * place)/place;
}

randomSign = () => {
    return Math.pow(-1, randomInt(2,3));
}

slope = (V1) => {
    let A = Math.acos(dotProduct(V1.x, V1.y, 1, 0)/getDist(p.x, p.y, fixed[1].x, fixed[1].y));
    if(V1.y <= 0) {
        A = Math.PI * 2 - A;
    }
    return A;
}

// Equal Ratio to check if two given ratios are equal a1/b1 and a2/b2
eqRto = (a1,b1, a2,b2) => {
    if(a1*b2 == a2*b1) {
        return true;
    }else{
        return false;
    }
}

// To check given set of numbers is all zero
function isAllZero() {
    let sum = 0;
    for(let i=0; i<arguments.length; i++) {
        if(Number(arguments[i]) < 0) {
            Number(arguments[i]) *= -1;
        }
        sum += Number(arguments[i]);
    }
    if(sum == 0) {
        return true;
    }else{
        return false;
    }
}

//To check if there is any zero in the set
function isAnyZero() {
    let result = 1;
    for(let i=0; i<arguments.length; i++) {
        if(arguments[i] == 0) {
            result *= 1;
        }else{
            result *= 0;
        }
    }
    return result;
}

// Modulus function
modulus = (x) => {
    if(x < 0) {
        return -x;
    }else{
        return x;
    }
}

// Inverse cos having range from 0 to 2PI
invCos = (value, y) => {
    if(y>=0) {
        return Math.acos(value);
    }else if(y<0){
        return Math.acos(value) + Math.PI;
    }else{
        return 0;
    }
}


// Returns true, or 1, if all the fields are full otherwise returns false, or 0.
filled = (text) => {
    let result = 1;
    document.querySelectorAll(text).forEach(element => {
        if(element.value == '' || element.value == 'null') {
            result *= 0;
        }else{
            result *= 1;
        }
    });
    return result;
}