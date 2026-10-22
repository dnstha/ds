window.addEventListener('load', function(){
    const btn = document.querySelector('#navBtn');
    const icon = document.querySelector('#navMenu');
    const loader = document.querySelector('.preloader');
    const header = document.querySelector('#intro-section h1');
    const intro = document.querySelector('#intro-section p');

    if (loader) {
        loader.classList.add("preloader-hidden");
        loader.addEventListener('transitionend', function(){
            if (loader.parentNode) {
                loader.parentNode.removeChild(loader);
            }
            if (header) {
                header.classList.add('h-animation');
                header.addEventListener('animationend', () => {
                    if (intro) {
                        intro.classList.add('intro-animation');
                    }
                }, { once: true });
            }
        }, { once: true });
    }

    const updateNavIcon = () => {
        if(btn && btn.checked){
            icon.innerHTML = `&#x2715;`;
        }else if(icon){
            icon.innerHTML = `
                <div class="hamburger"></div>
                <div class="hamburger"></div>
                <div class="hamburger"></div>     
            `;
        }
    };

    if(btn) {
        btn.addEventListener('click', updateNavIcon);
        updateNavIcon();
    }
});
