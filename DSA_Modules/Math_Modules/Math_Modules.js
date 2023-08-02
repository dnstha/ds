export const getDist = (x1, y1, x2, y2) => {
    let x = x2 - x1;
    let y = y2 - y1;
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

export const deg = (x) =>{
    return x*180/Math.PI;
}

export const rad = (x) =>{
    return x*Math.PI/180;
}

export const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const dotProduct = (a1,b1, a2,b2) => {
    return a1*a2 + b1*b2;
}

export const vctr = (x1, x2) => {
    return x2-x1;
}

export function average() {
    let avg = 0;
    let n = arguments.length;
    for(let i = 0; i<n; i++) {
        avg += arguments[i];
    }
    return avg/n;
}

export const randomSign = () => {
    return Math.pow(-1, randomInt(2,3));
}

export const slope = (V1) => {
    let A = Math.acos(dotProduct(V1.x, V1.y, 1, 0)/getDist(p.x, p.y, fixed[1].x, fixed[1].y));
    if(V1.y <= 0) {
        A = Math.PI * 2 - A;
    }
    return A;
}

/*

export const hello = () => {
    console.log("Hello Dodo!");
}

export const ahello = (name) => {
    console.log("Hello " + name);
}

const ds = () => {
    console.log("Hello DSA");
}

export default ds;

module.exports = {hello, ahello}; //same as
// module.exports = {hello: hello, ahello: ahello};

*/