// Data needed for a later exercise
const flights =
    '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
    name: 'Classico Italiano',
    location: 'Via Angelo Tavanti 23, Firenze, Italy',
    categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],

    order: function (starterIndex, mainIndex) {
        return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
    },

    openingHours: {
        thu: {
            open: 12,
            close: 22,
        },
        fri: {
            open: 11,
            close: 23,
        },
        sat: {
            open: 0, // Open 24 hours
            close: 24,
        },
    },
};
//**************************************************************************************************************************************************** */
//                                                                        I. Destructuring Array;
//**************************************************************************************************************************************************** */

const number = [5, 6, 7];
const [five, six, seven] = number;

console.log(five, six, seven);


// Get 2 value in restaurant's category
let [main, second] = restaurant.categories;
console.log(main, second);


/* swap value of main => value of second; 
    value of second => value of main; 
    Bad way: 
    let temp = main;
    main = second;
    second = temp;
    console.log(main, second);*/


// Best way: (using destructuring)
[second, main] = [main, second];
//    1     2         1      2 
console.log("after swap: ", main, second);


[order1, order2] = restaurant.order(1, 2);
console.log("order1,order2:", order1, order2);


// Array inside Array (Nested destructuring); 

const nestedArr = [1, 2, [3, 4]];
const [one, two, [three, four]] = nestedArr;
console.log(four);

// Default values; 
const blurArr = [1, 2];
const [a, b, c] = blurArr;
console.log(a, b, c);


//**************************************************************************************************************************************************** */
//                                                                        I. Destructuring Object;
//**************************************************************************************************************************************************** */

// a) get Object's property (name, openingHours, categories) :
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

// .b) Change variable name: 
const { name: n, openingHours: openH, categories: ctg } = restaurant;
console.log(n, openH, ctg);

// c) get StarterMenu Array: 

const { starterMenu, Menu } = restaurant;
console.log(starterMenu, Menu);

// d) get StarterMenu, chang variable name and set it default value; 
const { starterMenu: Mstart = [], Menu: M = [] } = restaurant;
console.log(Mstart, M);


// e) 
const { thu: { open, close }, fri, sat } = openingHours
console.log(open, close);

// f) add new method name orderDelivery to restaurant and 4 object parameter {starterIndex, mainIndex, time, address}: 
restaurant.orderDelivery = function ({ starterIndex, mainIndex, time, address }) {
    let starterMenu = this.starterMenu[starterIndex];
    let mainMenu = this.mainMenu[mainIndex];
    console.log('starterMenu :', starterMenu);
    console.log('mainMenu :', mainMenu);
    console.log('Time to Deliver:', time);
    console.log('address', address);
}

// Call function above; 
restaurant.orderDelivery({ starterIndex: 1, mainIndex: 2, time: "3:30pm", address: "562/46 NK PN" });
