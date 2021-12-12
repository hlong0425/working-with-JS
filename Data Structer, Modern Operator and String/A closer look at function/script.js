// const greet = function (greeting) {
//     return function (name) {
//         console.log(`${greeting} ${name}`);
//     }
// }


const greet = (greeting) => (name) => {
    console.log(greeting + name);
}

greet("Hey")("Long");


//******************************************************************************************************************************************** */
//                                                  The Call Method                                                                            */
//******************************************************************************************************************************************** */


const VietNamAirLine = {
    airline: "VietNamAirLine",
    iatacode: "VNA",
    booking: [],
    book: function (flightNum, name) {
        console.log(`${name} booked a seat on ${this.airline}
        flight ${this.iatacode}${flightNum}`);
        this.booking.push(
            {
                flight: `${this.iatacode}${flightNum}`,
                name,
            }
        )
    }
}

let book = VietNamAirLine.book;
book.call(VietNamAirLine, 23, 'Sarah Williams');
console.log(VietNamAirLine.booking);

//******************************************************************************************************************************************** */
//                                                  The Apply Method                                                                           */
//******************************************************************************************************************************************** */
const VietJet = {
    airline: "VietJet",
    iatacode: "VJ",
    booking: [],
    book: function (flightNum, name) {
        console.log(`${name} booked a seat on ${this.airline}
        flight ${this.iatacode}${flightNum}`);
        this.booking.push(
            {
                flight: `${this.iatacode}${flightNum}`,
                name,
            }
        )
    }
}

book = VietJet.book;
book.apply(VietJet, ['E05', 'Long']);
console.log(VietJet.booking);


//******************************************************************************************************************************************** */
//                                                  Bind Method                                                                                */
//******************************************************************************************************************************************** */

const Dellproduct = {
    name: "dell computer",
    customer: [],
    order: function (customerName) {
        console.log(`tks ${customerName} to buy ${this.name}`);
        this.customer.push(customerName);
    }
}

const Asusproduct = {
    name: "Asus Product",
    customer: [],
}

let order = Dellproduct.order;
//Use Call Method
//Use Apply Method

//  Bind
const orderDell = order.bind(Dellproduct);
orderDell("Long");
console.log(Dellproduct.customer);

const orderAsus = order.bind(Asusproduct)
orderAsus("Long");
console.log(Asusproduct.customer);



//******************************************************************************************************************************************** */
//                                                      Challenge #1                                                                           */
//******************************************************************************************************************************************** */

/*
Let's build a simple poll app!
A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.
Here are your tasks:
1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)

  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1".
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.
HINT: Use many of the tools you learned about in this and the last section 😉
BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?
BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]
GOOD LUCK 😀
*/

// const poll = {
//     question: 'What is your favourite programming language?',
//     options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
//     // This generates [0, 0, 0, 0]. More in the next section 😃
//     answers: new Array(4).fill(0),
//     displayResult: function (type = "array") {
//         if (type === "string") {
//             console.log('poll results are' + this.answers);
//         }
//         else if (type === "array") {
//             console.log(this.answers);
//         }
//     },
//     resgisterNewAnswer: function (type) {
//         let option = -1;
//         while (option < 0 || option > 3) {
//             answer = prompt(` What is your favourite programming language?
//         0: JavaScript
//         1: Python
//         2: Rust
//         3: C++`);
//         }
//         this.answers[option]++;
//         displayResult(type);
//     }
// }

// poll.resgisterNewAnswer();

const currencies = new Map([
    ["key 1", "value 1"],
    ["key 2", "value 2"],
    ["key 3", "value 3"],
])

currencies.forEach(function (value, key, map) {
    console.log(value, map);
})
