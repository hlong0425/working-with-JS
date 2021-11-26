// document.querySelector('.message').textContent = "💛 Correct Number !!!";
// document.querySelector('.number').textContent = 13;
// document.querySelector('.score').textContent = 10;
// document.querySelector('.guess').value = 23;

let score = 20;
let hightscore = 0;
let secretNumber = Math.floor(Math.random() * 20) + 1;

console.log(secretNumber);

document.querySelector('.check').addEventListener('click', function () {
    const guess = Number(document.querySelector('.guess').value);
    console.log(guess);
    if (!guess) {
        displayMessage("😊 No Number!");
    }
    else if (guess === secretNumber) {
        hightscore = score > hightscore ? score : hightscore;
        displayMessage('👋 Correct Number');
        document.body.style.backgroundColor = "green";
        document.querySelector('.number').style.width = "30rem";
        document.querySelector('.number').textContent = secretNumber;
    }
    else {
        if (score > 1) {
            // easy way: displayMessage(guess > secretNumver ? "🔺 Too hight" : "🔻 Too low")
            let message = guess > secretNumber ? "🔺 Too hight" : "🔻 Too low ";
            displayMessage(message);
            score--;
            document.querySelector('.score').textContent = score;
            console.log(score);
        }
        else {
            displayMessage("😜 You lost the game !");
            document.querySelector('.score').textContent = 0;
        }
    }
})

document.querySelector(".again").addEventListener('click', function () {
    document.querySelector('.score').textContent = "20";
    document.querySelector('.number').textContent = "?";
    document.querySelector('.number').style.width = "20rem";
    displayMessage('Start guessing');
    document.querySelector('.guess').value = " ";
    document.body.style.backgroundColor = "#222";
    secretNumber = Math.floor(Math.random() * 20) + 1;

    document.querySelector('.highscore').textContent = hightscore;
    console.log(secretNumber);

})


function displayMessage(message) {
    document.querySelector('.message').textContent = message;
}