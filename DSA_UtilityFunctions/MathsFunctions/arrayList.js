let alphabets = [];
function N_alphabets(n) {
    if(n<27) {
        for(let i=65; i<=65+n; i++) {
            alphabets.push(String.fromCharCode(i));
        }
    }
}
