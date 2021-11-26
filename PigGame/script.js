
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let currentScore = 0;
const scores = [0, 0];
let activePlayer = 0;



function init() {
    currentScore = 0;
    scores[0] = scores[1] = 0;

    diceEl.classList.add('hidden');

    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');

    current0El.textContent = 0;
    current1El.textContent = 0;

    score0El.textContent = 0;
    score1El.textContent = 0;
}

init();
//Rolling dice functionality 

btnRoll.addEventListener('click', function () {
    // 1.Generating a random dice roll; 
    const dice = Math.floor(Math.random() * 6) + 1;

    // 2.Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3.Check for rolled 1: => 
    if (dice !== 1) {
        currentScore += dice;
        document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
    }
    //  switch to the next player; 
    else {
        switchPlayer();
    }
})

btnHold.addEventListener('click', function () {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];
    if (scores[activePlayer] >= 50) {
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    }
    else {
        switchPlayer();
    }
})


btnNew.addEventListener('click', init);



function switchPlayer() {
    currentScore = 0;
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;

    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}