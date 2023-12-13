// import * as M from "../DSA_Modules/Math_Modules/Math_Modules.js";
// console.log(M.average(1,2,3,4));


let x1,y1,z1,c1, x2,y2,c2,z2, x3,y3,z3,c3, x,y,z, Dx,Dy,Dz,C, s;

det2 = (a,b, c,d) => {
    return a*d - b*c;
}

det3 = (a,b,c, d,e,f, g,h,i) => {
    return (a*det2(e,f,h,i) - b*det2(d,f,g,i) + c*det2(d,e,g,h));
}

solve = () => {
    x1 = Number(document.getElementById("x1").value);
    y1 = Number(document.getElementById("y1").value);
    z1 = Number(document.getElementById("z1").value);
    c1 = Number(document.getElementById("c1").value);
    x2 = Number(document.getElementById("x2").value);
    y2 = Number(document.getElementById("y2").value);
    z2 = Number(document.getElementById("z2").value);
    c2 = Number(document.getElementById("c2").value);
    x3 = Number(document.getElementById("x3").value);
    y3 = Number(document.getElementById("y3").value);
    z3 = Number(document.getElementById("z3").value);
    c3 = Number(document.getElementById("c3").value);
    s = document.getElementById("ambiguous");
    s.innerHTML = "";

    Dx = det3(c1,y1,z1, c2,y2,z2, c3,y3,z3);
    Dy = det3(x1,c1,z1, x2,c2,z2, x3,c3,z3);
    Dz = det3(x1,y1,c1, x2,y2,c2, x3,y3,c3);
    C = det3(x1,y1,z1, x2,y2,z2, x3,y3,z3);
    if (C != 0) {
        x = Dx/C;
        y = Dy/C;        
        z = Dz/C;
    }else{
        x = "";
        y = "";
        z = "";

        if(!isAllZero(x1,y1,z1) && !isAllZero(x2,y2,z2) && !isAllZero(x3,y3,z3)) {
            // When all the planes coincide: INFINITELY MANY SOLUTIONS
            if(eqRto(x1,x2, y1,y2) && eqRto(x1,x2, z1,z2) && eqRto(z1,z2, c1,c2) && eqRto(x1,x3, y1,y3) && eqRto(x1,x3, z1,z3) && eqRto(z1,z3, c1,c3)) {
                s.innerHTML = "*The planes coincide and the system has infinitely many solutions!";
            }

            // When all the planes are parallel to each other without coinciding: NO SOLUTION
            else if(eqRto(x1,x2, y1,y2) && eqRto(x1,x2, z1,z2) && !eqRto(z1,z2, c1,c2) && eqRto(x1,x3, y1,y3) && eqRto(x1,x3, z1,z3) && !eqRto(z1,z3, c1,c3) && !eqRto(z2,z3, c2,c3)) {
                s.innerHTML = "*The planes are parallel to each other and the system has no solution!";
            }

            // When two planes are coincide and the third one is parallel to them: NO SOLUTION
            else if(eqRto(x1,x2, y1,y2) && eqRto(x1,x2, z1,z2) && !eqRto(z1,z2, c1,c2) && eqRto(x1,x3, y1,y3) && eqRto(x1,x3, z1,z3) && eqRto(z1,z3, c1,c3)) {
                s.innerHTML = "*The system has no solution! Plane 2 is parallel to the planes 1 and 3! In addition, the planes 1 and 3 coincide in this system!";
            }
            else if(eqRto(x1,x2, y1,y2) && eqRto(x1,x2, z1,z2) && eqRto(z1,z2, c1,c2) && eqRto(x1,x3, y1,y3) && eqRto(x1,x3, z1,z3) && !eqRto(z1,z3, c1,c3)) {
                s.innerHTML = "*The system has no solution! Plane 3 is parallel to the planes 1 and 2! In addition, the planes 1 and 2 coincide in this system!";
            }
            else if(eqRto(x1,x2, y1,y2) && eqRto(x1,x2, z1,z2) && !eqRto(z1,z2, c1,c2) && eqRto(x1,x3, y1,y3) && eqRto(x1,x3, z1,z3) && !eqRto(z1,z3, c1,c3) && eqRto(z2,z3, c2,c3)) {
                s.innerHTML = "*The system has no solution! Plane 1 is parallel to the planes 2 and 3! In addition, the planes 2 and 3 coincide in this system!";
            }

            // When any of the two planes are parallel to each other without coinciding: NO SOLUTOIN
            else if(eqRto(x1,x2, y1,y2) && eqRto(x1,x2, z1,z2) && !eqRto(z1,z2, c1,c2)) {
                s.innerHTML = "*The system has no solution! Planes 1 and 2 are parallel to the each other!";
            }
            else if(eqRto(x3,x2, y3,y2) && eqRto(x3,x2, z3,z2) && !eqRto(z3,z2, c3,c2)) {
                s.innerHTML = "*The system has no solution! Planes 2 and 3 are parallel to the each other!";
            }
            else if(eqRto(x1,x3, y1,y3) && eqRto(x1,x3, z1,z3) && !eqRto(z1,z3, c1,c3)) {
                s.innerHTML = "*The system has no solution! Planes 1 and 3 are parallel to the each other!";
            }
            else {
                s.innerHTML = "*The given planes do not intersect at a single point!";
            }
            // When any of the two planes coincide and the third plane intersects both of them: Solution is an equation of line
            // else if (x1 == 0 && x2 == 0 && y1 != 0 && y2 != 0) {
            //     lpta(y1, c1, y2, c2);
            // }
            // else if (y1 == 0 && y2 == 0 && x1 != 0 && x2 != 0) {
            //     lpta(x1, c1, x2, c2);
            // }
        }
        else{
            alert("Enter cofficient of x or y or z in each equation!");
        }
    }
    document.getElementById("x").value = x;
    document.getElementById("y").value = y;
    document.getElementById("z").value = z;
}

document.querySelector('button').onclick = solve;
document.querySelectorAll("input").forEach(element => element.addEventListener("keyup", (event) => {
    if(event.key === "Enter") {
        solve();
    }
}));

// Equal Ratio
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
