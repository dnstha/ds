const btn = document.querySelector('#navBtn');
const icon = document.querySelector('#navMenu');

btn.addEventListener('click', ()=>{
    if(btn.checked){
        icon.innerHTML = `&#x2715;` || `✕` || `&#x2573;`;
    }else{
        icon.innerHTML = `
            <div class="hamburger"></div>
            <div class="hamburger"></div>
            <div class="hamburger"></div>        
        `;
    }
});


if(btn.checked){
    icon.innerHTML = `&#x2715;` || `✕` || `&#x2573;`;
}else{
    icon.innerHTML = `
        <div class="hamburger"></div>
        <div class="hamburger"></div>
        <div class="hamburger"></div>        
    `;
}