// document.querySelector('.message').textContent = "💛 Correct Number !!!";
// document.querySelector('.number').textContent = 13;
// document.querySelector('.score').textContent = 10;
// document.querySelector('.guess').value = 23;

let score = 20;
const secretNumber = Math.floor(Math.random() * 20) + 1;
document.querySelector('.number').textContent = secretNumber;



document.querySelector('.check').addEventListener('click', function () {
    const guess = Number(document.querySelector('.guess').value);
    console.log(guess);
    if (!guess) {
        document.querySelector('.message').textContent = "😊 No Number!"
    }
    else if (guess === secretNumber) {
        document.querySelector('.message').textContent = "👋 Correct Number";
        document.body.style.backgroundColor = "green";
        document.querySelector('.number').style.width = "30rem";
    }
    else {
        if (score > 1) {
            document.querySelector('.message').textContent = guess > secretNumber ? "🔺 Too hight" : "🔻 Too low ";
            score--;
            document.querySelector('.score').textContent = score;
            console.log(score);
        }
        else {
            document.querySelector('.message').textContent = "😜 You lost the game !"
            document.querySelector('.score').textContent = 0;
        }
    }

})