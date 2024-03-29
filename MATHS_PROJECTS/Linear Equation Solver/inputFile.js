// c2.addEventListener("keyup", (e) => {
//     if(e.key === "Enter") {
//         result.innerText = ("x = " + x + "\ny= " + y);
//     }
// });
let x1, y1, c1, x2, y2, c2; // Coefficients from input
let Dx, Dy, C; // Variables for solving the system of eqns
let x, y; // Solutions of the equation

let s = document.getElementById("ambiguous");

clearSpan = () => {
    s.innerText = "";
}

getCoeff = () => {
    x1 = Number(document.getElementById("x1").value);
    y1 = Number(document.getElementById("y1").value);
    c1 = Number(document.getElementById("c1").value);
    x2 = Number(document.getElementById("x2").value);
    y2 = Number(document.getElementById("y2").value);
    c2 = Number(document.getElementById("c2").value);
}

// If the line is parallel to either of axes "lpta" = line parallel to axis
lpta = (x1, c1, x2, c2) => {
    if(c1/x1 == c2/x2) {
        s.innerText = "*The lines coincide and the system has infinitely many solutions!";
    }else{
        s.innerText = "*The lines are parallel to each other and the system has no solution!";
    }
}

solve = () => {
    getCoeff();
    clearSpan();
    Dx = (y2 * c1) - (y1 * c2);
    Dy = (x1 * c2) - (x2 * c1);
    C = (x1 * y2) - (x2 * y1);
    if (C != 0) {
        x = Dx/C;
        y = Dy/C;
        // px = Origin.x + x * scale;
        // py = Origin.y - y * scale;
        // c.font = "bold 24px times"
        // c.fillText("("+ Math.round(x*1000)/1000 +", " + Math.round(y*1000)/1000 + ")", px, py-5);     
    }else{
        x = "";
        y = "";
        if (x1 == 0 && x2 == 0 && y1 != 0 && y2 != 0) {
            lpta(y1, c1, y2, c2);
        }
        else if (y1 == 0 && y2 == 0 && x1 != 0 && x2 != 0) {
            lpta(x1, c1, x2, c2);
        }
        else if(x1/x2 == y1/y2 && y1/y2 == c1/c2) {
            s.innerText = "*The lines coincide and the system has infinitely many solutions!";
        }
        else if(x1/x2 == y1/y2 && y1/y2 != c1/c2) {
            s.innerText = "*The lines are parallel to each other and the system has no solution!";
        }
        else{
            alert("Enter cofficient of x or y in each equation!");
        }
    }
    document.getElementById("x").value = x;
    document.getElementById("y").value = y;
    graph();
};

document.querySelector('#MyBtn').onclick = function() {
    solve();
};
document.querySelectorAll(".coeff").forEach(element => element.addEventListener("keyup", function(event) {
    if(event.key === "Enter") {
        solve();
    }
}));