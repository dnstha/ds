// c2.addEventListener("keyup", (e) => {
//     if(e.key === "Enter") {
//         result.innerText = ("x = " + x + "\ny= " + y);
//     }
// });
let x1, y1, c1, x2, y2, c2, x, y, Dx, Dy, C, s;

document.querySelector('button').onclick = () => {
    x1 = Number(document.getElementById("x1").value);
    y1 = Number(document.getElementById("y1").value);
    c1 = Number(document.getElementById("c1").value);
    x2 = Number(document.getElementById("x2").value);
    y2 = Number(document.getElementById("y2").value);
    c2 = Number(document.getElementById("c2").value);
    s = document.getElementById("ambiguous");
    s.innerHTML = "";

    Dx = (y2 * c1) - (y1 * c2);
    Dy = (x1 * c2) - (x2 * c1);
    C = (x1 * y2) - (x2 * y1);
    if (C != 0) {
        x = Dx/C;
        y = Dy/C;        
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

// If the line is parallel to either of axes
lpta = (x1, c1, x2, c2) => {
    if(c1/x1 == c2/x2) {
        s.innerHTML = "*The lines coincide and the system has infinitely many solutions!";
    }else{
        s.innerHTML = "*The lines are parallel to each other and the system has no solution!";
    }
}
