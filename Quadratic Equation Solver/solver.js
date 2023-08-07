let x1, x2, a, b, c, discriminant, denominator, s, x, y;

solve = () => {
    a = Number(document.getElementById("a").value);
    b = Number(document.getElementById("b").value);
    c = Number(document.getElementById("c").value);
    s = document.getElementById("ambiguous");
    x1 = "";
    x2 = "";
    s.innerHTML = "";
    discriminant = b*b - 4*a*c;
    denominator = 2*a;

    if(a!=0) {
        if(discriminant > 0) {
            x1 = (-b + Math.sqrt(discriminant)) / denominator;
            x2 = (-b - Math.sqrt(discriminant)) / denominator;
        }
        else if(discriminant == 0) {
            x1 = -b / denominator;
            x2 = x1;
        }
        else if(discriminant < 0) {
            x = -b / denominator;
            discriminant = -discriminant;
            y = Math.sqrt(discriminant) / denominator;
            y += "i";
            x1 = x.toString() + " + " + y;
            x2 = x.toString() + " - " + y;
            s.innerHTML = "*The given equation does not have any real solution!";
        }
        document.getElementById("x1").value = x1;
        document.getElementById("x2").value = x2;
    }
    else {
        alert("Enter the cofficient of x^2");
    }
}

document.querySelector('button').onclick = solve;
document.querySelectorAll("input").forEach(element => element.addEventListener("keyup", (event) => {
    if(event.key === "Enter") {
        solve();
    }
}));
