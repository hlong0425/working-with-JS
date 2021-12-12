'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2021-11-24T14:11:59.604Z",
    "2021-11-25T17:01:17.194Z",
    "2021-11-30T23:36:17.929Z",
    "2021-12-01T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];



// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////


const createUserName = function (accs) {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map(e => e[0])
      .join("");
  })
}
createUserName(accounts);

const calculateDate = function (date1, date2) {
  return Math.round(Math.abs((date2 - date1) / (24 * 60 * 60 * 1000)));
}

const formatMovementDate = function (date, locale) {

  const dayPassed = calculateDate(date, new Date());
  if (dayPassed === 1) return "Yesterday";
  if (dayPassed === 0) return "Today";
  if (dayPassed <= 7) return `${dayPassed} days ago`;

  else {
    const datetimeFormat = new Intl.DateTimeFormat(locale).format(date);
    return datetimeFormat;
  }
}

const formattedCur = function (account, value) {
  const option = {
    style: 'currency', currency: account.currency
  }
  return new Intl.NumberFormat(account.locale, option).format(value);
}

const StartLogoutAccount = function () {
  let time = 60 * 15;

  const tick = function () {
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Login to get started';
      containerApp.style.opacity = 0;
    }

    console.log(time);
    const min = String(Math.floor(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;
    time--;
  }
  tick();

  const timer = setInterval(tick, 1000);
  return timer;
}

const displayMovements = function (account, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort ? account.movements.slice().sort((a, b) => a - b) : account.movements;
  movs.forEach((mov, i) => {
    const date = new Date(currentAccount.movementsDates[i])
    const type = mov > 0 ? "deposit" : "withdrawal";
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__date">${formatMovementDate(date, currentAccount.locale)}</div>
      <div class="movements__value">${formattedCur(currentAccount, mov)}</div>
    </div>    
    `
    containerMovements.insertAdjacentHTML("afterbegin", html);
  })

}



const calcDisplayBalance = function (account) {
  const balance = account.movements.reduce((acc, mov) => (acc + mov), 0);
  account.balance = balance;
  labelBalance.textContent = formattedCur(account, balance);
}

const DisplaySummary = function (account) {

  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => (acc + mov), 0)
    .toFixed(2);

  const outcomes = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => (acc + mov * -1), 0)
    .toFixed(2);

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(mov => mov * account.interestRate / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0)
    .toFixed(2);
  ;

  labelSumIn.textContent = formattedCur(currentAccount, incomes);
  labelSumOut.textContent = formattedCur(currentAccount, outcomes);
  labelSumInterest.textContent = formattedCur(currentAccount, interest);
}

const displayCurrentDay = function () {
  const today = new Date();

  // let [day, month, year] = [today.getDate().toString().padStart(2, 0), (today.getMonth() + 1).toString().padStart(2, 0), today.getFullYear()];
  // let [hour, min] = [today.getHours(), today.getMinutes()];
  // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

  const locale = currentAccount.locale;
  const option = {

    hour: "numeric",
    minute: "numeric",
    month: "numeric",
    day: "numeric",
    year: "numeric"
  }

  labelDate.textContent = new Intl.DateTimeFormat(locale, option).format(today);
  // console.log(",,,,,,," + );
}

/********************************************************************/
/*                  UI                                              */
/********************************************************************/
function UpdateUI(currentAccount) {
  displayMovements(currentAccount);
  calcDisplayBalance(currentAccount);
  DisplaySummary(currentAccount);
}


//Fake login
let currentAccount, timer;


// currentAccount = account1;
// UpdateUI(currentAccount);
// containerApp.style.opacity = 1;





/********************************************************************/
/*                  App Function                                    */
/********************************************************************/
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  const user = accounts.find(acc => acc.username === inputLoginUsername.value);
  currentAccount = user?.pin === Number(inputLoginPin.value) ? user : "";
  if (currentAccount) {
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(" ")[0]}`;
    containerApp.style.opacity = 1;
    inputLoginPin.value = inputLoginUsername.value = "";
    inputLoginPin.blur();


    UpdateUI(currentAccount);
    displayCurrentDay();
    if (timer) clearInterval(timer);
    timer = StartLogoutAccount();

  }
  else {
    console.log("username or password not valid");
  }
})

// Sort function
let sorted = false;
btnSort.addEventListener('click', function () {
  sorted = !sorted
  displayMovements(currentAccount, sorted);

})

// Loan function
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      //Add movment
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toJSON());

      //Update UI
      UpdateUI(currentAccount);
      inputLoanAmount.value = "";

      //Reset Timer
      clearInterval(timer);
      timer = StartLogoutAccount();
    }, 2500);
  }
})

// Transfer function
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const receiverAccount = accounts.find(acc => acc.username === inputTransferTo.value);
  const amount = Number(inputTransferAmount.value);

  if (receiverAccount?.username !== currentAccount.username && amount > 0 && currentAccount.balance >= amount) {

    //Doing the transfer
    currentAccount.movements.push(amount * -1);
    currentAccount.movementsDates.push(new Date().toJSON());

    receiverAccount.movements.push(amount);
    receiverAccount.movementsDates.push(new Date().toJSON());



    //Reset input field
    inputTransferTo.value = inputTransferAmount.value = "";

    //Update UI; 
    UpdateUI(currentAccount);
  }
})




//Delete Account function
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const usernameConfirm = inputCloseUsername.value;
  const pinConfirm = Number();

  if (currentAccount.username === usernameConfirm && currentAccount.pin === pinConfirm) {
    const index = accounts.findIndex(acc => acc.username === usernameConfirm);
    accounts.splice(index, 1);

    //Hine UI
    containerApp.style.opacity = 0;
    labelWelcome.textContent = "Login to get start";
    inputCloseUsername.value = inputClosePin.value = "";
    console.log(accounts);
  }
})






/*
  // Coding Challenge #4

/*
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).
1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)
HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.
TEST DATA:
*/
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];



// Forumla: recommendedFood = weight ** 0.75 * 28
dogs.map(dog => dog.recommendedFood = dog.weight ** 0.75 * 28);
console.log(dogs);


const SarahDog = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(SarahDog);

// ownersEatTooMuch
const ownerEatTooMuch = function (dogs) {
  let owners = dogs
    .filter(dog => dog.curFood > dog.recommendedFood + dog.recommendedFood * 0.1)
    .map(dog => dog.owners);
  return owners;
}

const ownerEatTooLittle = function (dogs) {
  let owners = dogs
    .filter(dog => dog.curFood < dog.recommendedFood - dog.recommendedFood * 0.1)
    .map(dog => dog.owners);
  return owners;
}

ownerEatTooMuch(dogs);
ownerEatTooLittle(dogs);

//this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!";
let ownerTooMuch = ownerEatTooMuch(dogs).flat().join(" and ")
let ownerTooLitte = ownerEatTooLittle(dogs).flat().join(" and ")

console.log(`"${ownerTooMuch}'s dogs eat too much!" and "${ownerTooLitte}'s dogs eat too little!"`);

//5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
// Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
console.log(dogs.some(dog => dog.curFood === dog.recommendedFood));
console.log(dogs.some(dog => dog.curFood >= dog.recommendedFood - dog.recommendedFood * 0.1 && dog.curFood <= dog.recommendedFood + dog.recommendedFood * 0.1));


const dogEatingOkey = function (dogs) {
  return dogs
    .filter(dog => dog.curFood >= dog.recommendedFood - dog.recommendedFood * 0.1 && dog.curFood <= dog.recommendedFood + dog.recommendedFood * 0.1);
}


console.log(dogEatingOkey(dogs));


// Create a shallow copy of the dogs

//sort it by recommended food portion in an ascending order
const dogsToSort = dogs.slice(0);
console.log(dogsToSort.sort((a, b) => a.recommendedFood - b.recommendedFood));
console.log(dogs);


//10:00; 


// 1p 50s






























