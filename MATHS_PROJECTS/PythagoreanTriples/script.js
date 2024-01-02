function elementFromHtml(html) {
    const template = document.createElement("template");

    template.innerHTML = html.trim();

    return template.content.firstElementChild;
}

let Temp, Swap;
let triplesArray = [];
const ol = document.querySelector('#lst');

writeTriples = () => {
    let n = Number(document.getElementById('n').value);
    ol.innerHTML = "";
    triplesArray = [];
    for (let i = 0; i < n; i++) {
        Temp = new Complex(randomInt(1,4+i), randomInt(1,4+i));
        triplesArray.push(cmplxMul(Temp, Temp));

        // To check repetition
        if(i!=0) {
            for(let x = 0; x<triplesArray.length-1; x++) {
                if(triplesArray[i].r == triplesArray[x].r){
                    Temp = new Complex(randomInt(1,8+i), randomInt(1,8+i));
                    triplesArray[i] = cmplxMul(Temp, Temp);
                }
            }
        }
        while(triplesArray[i].x == 0 || triplesArray[i].y == 0) {
            Temp = new Complex(randomInt(1,4+i), randomInt(1,4+i));
            triplesArray[i] = cmplxMul(Temp, Temp);
            // To check repetition
            if(i!=0) {
                for(let x = 0; x<triplesArray.length-1; x++) {
                    if(triplesArray[i].r == triplesArray[x].r){
                        Temp = new Complex(randomInt(1,8+i), randomInt(1,8+i));
                        triplesArray[i] = cmplxMul(Temp, Temp);
                    }
                }
            }
        }
        if(modulus(triplesArray[i].x) > modulus(triplesArray[i].y)) {
            Swap = triplesArray[i].x;
            triplesArray[i].x = triplesArray[i].y;
            triplesArray[i].y = Swap;
        }
        const newListItem = document.createElement('li');
        newListItem.textContent = `${modulus(triplesArray[i].x)}\xb2 + ${modulus(triplesArray[i].y)}\xb2 = ${triplesArray[i].r}\xb2`;
        ol.appendChild(newListItem);        
    }
}


document.getElementById('myBtn').addEventListener('click', writeTriples);
document.querySelector('#n').addEventListener('keyup', function(e){
    if(e.key == 'Enter'){
        writeTriples();
    }
});