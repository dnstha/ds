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


// addEventListener('load', function(){
//     if(btn.checked == true){
//         icon.innerHTML = `&#x2715`;
//     }else{
//         icon.innerHTML = `
//             <div class="hamburger"></div>
//             <div class="hamburger"></div>
//             <div class="hamburger"></div>        
//         `;
//     }
// });