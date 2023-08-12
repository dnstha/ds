let x1, x2, A, B, C, discriminant, denominator, s, vertex, swap;
let x, y; // For complex numbers

function Point(x, y) {
    this.x = x;
    this.y = y;
}

clearSpan = () => {
    s = document.getElementById("ambiguous");
    s.innerHTML = "";
}

getCoeff = () => {
    A = Number(document.getElementById("a").value);
    B = Number(document.getElementById("b").value);
    C = Number(document.getElementById("c").value);
}

solve = () => {
    getCoeff();
    clearSpan();
    discriminant = B*B - 4*A*C;
    denominator = 2*A;
    x1 = "";
    x2 = "";
    graph();
    if(A!=0) {
        if(discriminant > 0) {
            x1 = (-B + Math.sqrt(discriminant)) / denominator;
            x2 = (-B - Math.sqrt(discriminant)) / denominator;
            if(x1>x2) {
                swap = x1;
                x1 = x2;
                x2 = swap;
            }
            c.font = "bold 24px times"
            c.fillText("("+ Math.round(x1*1000)/1000 +", " + "0)", Origin.x + scale*x1 - 110, Origin.y-5);
            c.fillText("("+ Math.round(x2*1000)/1000 +", " + "0)", Origin.x + scale*x2 + 3, Origin.y-5);
            if(vertex.y > 0 && A<0 || vertex.y < 0 && A>0) {
                point(Origin.x + scale*x1, Origin.y, '#ff0f0f');
                point(Origin.x + scale*x2, Origin.y, '#ff0f0f');
            }
        }
        else if(discriminant == 0) {
            x1 = -B / denominator;
            x2 = x1;
        }
        else if(discriminant < 0) {
            x = -B / denominator;
            discriminant = -discriminant;
            y = Math.sqrt(discriminant) / denominator;
            y += "i";
            x1 = x.toString() + " + " + y;
            x2 = x.toString() + " - " + y;
            s.innerHTML = "*The given equation does not have any real solution!<br> Here, i<sup>2</sup> = -1";
        }
        document.getElementById("x1").value = x1;
        document.getElementById("x2").value = x2;
    }
    else {
        alert("Enter the cofficient of x^2");
    }
}

document.getElementById('MyBtn').onclick = solve;
document.querySelectorAll("input").forEach(element => element.addEventListener("keyup", (event) => {
    if(event.key === "Enter") {
        solve();
    }
}));

/*
// c2.addEventListener("keyup", (e) => {
//     if(e.key === "Enter") {
//         result.innerText = ("x = " + x + "\ny= " + y);
//     }
// });
let x1, y1, c1, x2, y2, c2, x, y, Dx, Dy, C, s;

clearSpan = () => {
    s = document.getElementById("ambiguous");
    s.innerHTML = "";
}

getCoeff = () => {
    x1 = Number(document.getElementById("x1").value);
    y1 = Number(document.getElementById("y1").value);
    c1 = Number(document.getElementById("c1").value);
    x2 = Number(document.getElementById("x2").value);
    y2 = Number(document.getElementById("y2").value);
    c2 = Number(document.getElementById("c2").value);
}

solve = () => {
    getCoeff();
    clearSpan();
    Dx = (y2 * c1) - (y1 * c2);
    Dy = (x1 * c2) - (x2 * c1);
    C = (x1 * y2) - (x2 * y1);
    graph();
    if (C != 0) {
        x = Dx/C;
        y = Dy/C;
        px = Origin.x + det2(c1,y1,c2,y2)/det2(x1,y1,x2,y2) * scale;
        py = Origin.y - det2(x1,c1,x2,c2)/det2(x1,y1,x2,y2) * scale;
        c.fillText("("+ Math.round(x*1000)/1000 +", " + Math.round(y*1000)/1000 + ")", px, py-5);     
    }else{
        x = "";
        y = "";
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
            alert("Enter cofficient of x or y in each equation!");
        }
    }
    document.getElementById("x").value = x;
    document.getElementById("y").value = y;  
};

document.querySelector('button').onclick = solve;
document.querySelectorAll("input").forEach(element => element.addEventListener("keyup", (event) => {
    if(event.key === "Enter") {
        solve();
    }
}));

// If the line is parallel to either of axes
lpta = (x1, c1, x2, c2) => {
    if(c1/x1 == c2/x2) {
        s.innerHTML = "*The lines coincide and the system has infinitely many solutions!";
    }else{
        s.innerHTML = "*The lines are parallel to each other and the system has no solution!";
    }
}
*/
