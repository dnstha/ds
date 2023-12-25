const options = ['rock', 'paper', 'scissors'];
let human, computer, win = undefined;
let th, tc; // Total score of human and computer


function init(){
    document.querySelector('span').innerText = '';
    document.querySelectorAll('.ipt').forEach((element)=>{
        element.style.background = 'aqua';
    });
}


function result(x){
    init();
    computer = options[Math.floor(Math.random() * 3)];
    if(computer == x){
        document.querySelector('span').innerText = 'The game was draw!';
        document.querySelector('span').style.background = 'skyblue';
    }else{
        if(x == 'rock'){
            win = (computer == 'scissors')? true : false;
        }else if(x == 'scissors'){
            win = (computer == 'paper')? true : false;
        }else if(x == 'paper'){
            win = (computer == 'rock')? true : false;
        }
        if(win){
            document.querySelector('span').innerText = 'You won!';
            document.querySelector('span').style.background = 'limegreen';
            document.querySelector('#human').value++;
        }else{
            document.querySelector('span').innerText = 'You lost!';
            document.querySelector('span').style.background = 'red';
            document.querySelector('#computer').value++;
        }
    }
    document.querySelector(`#${computer}`).style.background = 'yellow';
}

document.querySelectorAll('.ipt').forEach(element => element.addEventListener('click', function(){
    human = element.value;
    result(human);
    th = Number(document.querySelector("#human").value);
    tc = Number(document.querySelector("#computer").value);
    if(th==tc){
        document.querySelector('#total').innerText = 'No one is winning!';
    }else if(th>tc){
        document.querySelector('#total').innerText = `You are winning by ${th-tc} points!`;
    }else if(th<tc){
        document.querySelector('#total').innerText = `Computer is winning by ${tc-th} points!`;
    }
}));

document.querySelector('#initialize').addEventListener('click', function(){
    document.querySelector('#human').value = 0;
    document.querySelector('#computer').value = 0;
    document.querySelector('#total').innerText = '';
    init();
})