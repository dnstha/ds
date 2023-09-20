function elementFromHtml(html) {
    const template = document.createElement("template");

    template.innerHTML = html.trim();

    return template.content.firstElementChild;
}

writePrimes = () => {
    let max = Number(document.getElementById('max').value);
    for (let i = 1; i <= max; i++) {
        let flag = 0;

        // looping through 2 to user input number
        for (let j = 2; j < i; j++) {
            if (i % j == 0) {
                flag = 1;
                break;
            }
        }

        // if number greater than 1 and not divisible by other numbers
        if (i > 1 && flag == 0) {
            let n = elementFromHtml(`<h4>${i}</h4>`);
            document.body.append(n);
        }
    }
}

document.getElementById('myBtn').addEventListener('click', writePrimes);