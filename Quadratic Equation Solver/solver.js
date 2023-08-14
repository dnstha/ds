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
