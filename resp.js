window.addEventListener('load', function(){
    const btn = document.querySelector('#navBtn');
    const icon = document.querySelector('#navMenu');
    const loader = document.querySelector('.preloader');
    const header = document.querySelector('h1');
    const intro = document.querySelector('p');
    header.style.fontSize = 0;
    intro.style.fontSize = 0;

    loader.classList.add("preloader-hidden");
    loader.addEventListener('transitionend', function(){
        document.body.removeChild(loader);
        document.querySelector('h1').classList.add('h-animation');
        document.querySelector('p').classList.add('intro-animation');
        header.style.fontSize = '2.5rem';
        intro.style.fontSize = '1.5rem';
    });

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
});