let x1, x2, a, b, c, discriminant, denominator, s, x, y;

document.querySelector('button').onclick = () => {
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
    console.log(typeof a, a);

    // Dx = (y2 * c1) - (y1 * c2);
    // Dy = (x1 * c2) - (x2 * c1);
    // C = (x1 * y2) - (x2 * y1);
    // if (C != 0) {
    //     x = Dx/C;
    //     y = Dy/C;
    //     document.getElementById("x").value = x;
    //     document.getElementById("y").value = y;        
    // }else{
    //     s = document.getElementById("ambiguous");
    //     if(x1/x2 == y1/y2 && y1/y2 == c1/c2) {
    //         s.innerHTML = "*The lines coincide and the system has infinitely many solutions!";
    //     }
    //     else if(x1/x2 == y1/y2 && y1/y2 != c1/c2) {
    //         s.innerHTML = "*The lines are parallel to each other and the system has no solution!";
    //     }
    //     else{
    //         alert("Enter all the cofficients!");
    //     }
    // }
};
