const options = ['rock', 'paper', 'scissors'];
let human, computer, win = undefined;
let th, tc; // Total score of human and computer
const Span = document.querySelector('span');
const Statement = document.querySelector('.statement');
const WonAudio = new Audio("audio_won.mp3");
const LostAudio = new Audio("audio_lost.mp3");
const Sound = document.querySelector("#sound");
let mute = Sound.checked ? false : true;

function init(){
    Span.innerText = '';
    document.querySelectorAll('.ipt').forEach((element)=>{
        element.style.background = 'aqua';
    });
}

const symbol = {
    rock: '<i class="fa-solid fa-hand-back-fist"></i>',
    paper: '<i class="fa-solid fa-hand"></i>',
    scissors: '<i class="fa-solid fa-hand-scissors"></i>'
}

function result(x){
    init();
    computer = options[Math.floor(Math.random() * 3)];
    if(computer == x){
        Span.innerText = 'The game was draw!';
        Span.style.background = 'skyblue';
        Statement.innerHTML = `Both chose&nbsp;${symbol[x]}`;
    }else{
        if(x == 'rock'){
            win = (computer == 'scissors')? true : false;
        }else if(x == 'scissors'){
            win = (computer == 'paper')? true : false;
        }else if(x == 'paper'){
            win = (computer == 'rock')? true : false;
        }
        if(win){
            Statement.innerHTML = `${symbol[x]}&nbsp;beats&nbsp;${symbol[computer]}`;
            Span.innerText = 'You won!';
            Span.style.background = 'limegreen';
            document.querySelector('#human').value++;
            if (!mute){
                WonAudio.play();
            }
        }else{
            Statement.innerHTML = `${symbol[computer]}&nbsp;beats&nbsp;${symbol[x]}`;
            Span.innerText = 'You lost!';
            Span.style.background = 'red';
            document.querySelector('#computer').value++;
            if (!mute){            
                LostAudio.play();
            }
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
    Statement.innerText = '';
    init();
})

Sound.addEventListener('click', function(){
    mute = Sound.checked ? false: true;
});