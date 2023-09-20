function elementFromHtml(html) {
    const template = document.createElement("template");

    template.innerHTML = html.trim();

    return template.content.firstElementChild;
}


const ol = document.querySelector('#lst');

writeTriples = () => {
    let n = Number(document.getElementById('n').value);
    ol.innerHTML = "";
    for (let i = 1; i <= n; i++) {
        const newListItem = document.createElement('li');
        newListItem.textContent = `Gecko ${i}`;
        ol.appendChild(newListItem);        
    }
}


document.getElementById('myBtn').addEventListener('click', writeTriples);