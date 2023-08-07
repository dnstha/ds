let a1,b1,c1, a2,b2,c2, a3,b3,c3, D;

det2 = (a,b, c,d) => {
    return a*d - b*c;
}

det3 = (a,b,c, d,e,f, g,h,i) => {
    return (a*det2(e,f,h,i) - b*det2(d,f,g,i) + c*det2(d,e,g,h));
}

solve = () => {
    a1 = Number(document.getElementById("a1").value);
    b1 = Number(document.getElementById("b1").value);
    c1 = Number(document.getElementById("c1").value);
    a2 = Number(document.getElementById("a2").value);
    b2 = Number(document.getElementById("b2").value);
    c2 = Number(document.getElementById("c2").value);
    a3 = Number(document.getElementById("a3").value);
    b3 = Number(document.getElementById("b3").value);
    c3 = Number(document.getElementById("c3").value);

    D = det3(a1,b1,c1, a2,b2,c2, a3,b3,c3);
    document.getElementById("D").value = D;
}

document.querySelector('button').onclick = solve;
document.querySelectorAll("input").forEach(element => element.addEventListener("keyup", (event) => {
    if(event.key === "Enter") {
        solve();
    }
}));
/*
Instead of these tedious lines below, we can loop through each element using above lines
document.getElementById('a1').addEventListener('keyup', (event) => {
    if(event.key === "Enter") {
        solve();
    }
});
document.getElementById('a2').addEventListener('keyup', (event) => {
    if(event.key === "Enter") {
        solve();
    }
});
document.getElementById('a3').addEventListener('keyup', (event) => {
    if(event.key === "Enter") {
        solve();
    }
});
document.getElementById('b1').addEventListener('keyup', (event) => {
    if(event.key === "Enter") {
        solve();
    }
});
document.getElementById('b2').addEventListener('keyup', (event) => {
    if(event.key === "Enter") {
        solve();
    }
});
document.getElementById('b3').addEventListener('keyup', (event) => {
    if(event.key === "Enter") {
        solve();
    }
});
document.getElementById('c1').addEventListener('keyup', (event) => {
    if(event.key === "Enter") {
        solve();
    }
});
document.getElementById('c2').addEventListener('keyup', (event) => {
    if(event.key === "Enter") {
        solve();
    }
});
document.getElementById('c3').addEventListener('keyup', (event) => {
    if(event.key === "Enter") {
        solve();
    }
});
*/