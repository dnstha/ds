let x1, x2, A, B, C, discriminant, denominator, vertex, swap;
let x, y; // For complex numbers
let s = document.getElementById("ambiguous");

function Point(x, y) {
    this.x = x;
    this.y = y;
}

clearSpan = () => {
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
    if(A!=0) {
        graph();
        if(discriminant > 0) {
            x1 = (-B + Math.sqrt(discriminant)) / denominator;
            x2 = (-B - Math.sqrt(discriminant)) / denominator;
            if(x1>x2) {
                swap = x1;
                x1 = x2;
                x2 = swap;
            }
            c.font = "bold 24px times"
            c.fillText(`(${Math.round(x1*1000)/1000}, 0)`, PlotX(x1) - 110, Origin.y-5);
            c.fillText(`(${Math.round(x2*1000)/1000}, 0)`, PlotX(x2) + 3, Origin.y-5);
            if(vertex.y > 0 && A<0 || vertex.y < 0 && A>0) {
                point(PlotX(x1), Origin.y, '#ff0f0f');
                point(PlotX(x2), Origin.y, '#ff0f0f');
            }
        }
        else if(discriminant == 0) {
            x1 = -B / denominator;
            x2 = x1;
            c.font = "bold 24px times"
            if(A>0) {
                c.fillText(`(${Math.round(x1*1000)/1000}, 0)`, PlotX(x1), Origin.y+22);
            }else if (A<0){
                c.fillText(`(${Math.round(x1*1000)/1000}, 0)`, PlotX(x1), Origin.y-5);
            }
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

document.getElementById('MyBtn').onclick = function(){
    solve();
};
document.querySelectorAll(".coeff").forEach(element => element.addEventListener("keyup", function(event) {
    if(event.key === "Enter") {
        solve();
    }
}));
