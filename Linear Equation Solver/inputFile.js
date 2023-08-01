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
        document.getElementById("x").value = x;
        document.getElementById("y").value = y;        
    }else{
        if(x1/x2 == y1/y2 && y1/y2 == c1/c2) {
            s.innerHTML = "*The lines coincide and the system has infinitely many solutions!";
        }
        else if(x1/x2 == y1/y2 && y1/y2 != c1/c2) {
            s.innerHTML = "*The lines are parallel to each other and the system has no solution!";
        }
        else{
            alert("Enter all the cofficients!");
        }
    }
};
