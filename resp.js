const btn = document.querySelector('#navBtn');
const icon = document.querySelector('#navMenu');

btn.addEventListener('click', ()=>{
    if(btn.checked == true){
        icon.innerHTML = `&#x2715`;
    }else{
        icon.innerHTML = `
            <div class="hamburger"></div>
            <div class="hamburger"></div>
            <div class="hamburger"></div>        
        `;
    }
});


// document.querySelectorAll('a[href=""#"]').forEach(elem.addEventListener('click' , (event)=> {
//     event.preventDefault();
//     window.scrollTo({
//         top: 0,
//         behavior: 'smooth'
//     });
// }));