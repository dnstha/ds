// import * as M from "../DSA_Modules/Math_Modules/Math_Modules.js";
// console.log(M.average(1,2,3,4));


let x1, y1, z1, c1, x2, y2, c2, z2, x, y, z, Dx, Dy, Dz, C, s;

det2 = (a,b, c,d) => {
    return a*d - b*c;
}

det3 = (a,b,c, d,e,f, g,h,i) => {
    return (a*det2(e,f,h,i) - b*det2(d,f,g,i) + c*det2(d,e,g,h));
}


document.querySelector('button').onclick = () => {
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
        if(x1/x2 == y1/y2 && y1/y2 == c1/c2) {
            s.innerHTML = "*The lines coincide and the system has infinitely many solutions!";
        }
        else if(x1/x2 == y1/y2 && y1/y2 != c1/c2) {
            s.innerHTML = "*The lines are parallel to each other and the system has no solution!";
        }
        else if (x1 == 0 && x2 == 0 && y1 != 0 && y2 != 0) {
            lpta(y1, c1, y2, c2);
        }
        else if (y1 == 0 && y2 == 0 && x1 != 0 && x2 != 0) {
            lpta(x1, c1, x2, c2);
        }
        else{
            alert("Enter cofficient of x or y or z in each equation!");
        }
    }
    document.getElementById("x").value = x;
    document.getElementById("y").value = y;
    document.getElementById("z").value = z;
};

// If the line is parallel to either of axes
lpta = (x1, c1, x2, c2) => {
    if(c1/x1 == c2/x2) {
        s.innerHTML = "*The lines coincide and the system has infinitely many solutions!";
    }else{
        s.innerHTML = "*The lines are parallel to each other and the system has no solution!";
    }
}
