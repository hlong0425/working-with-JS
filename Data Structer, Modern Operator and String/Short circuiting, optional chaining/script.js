//**************************************************************************************************************************************************** */
//                                                                        I. Short Circuiting
//**************************************************************************************************************************************************** */

const flights =
    '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
let openingHours = {
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
};

const restaurant = {
    name: 'Classico Italiano',
    location: 'Via Angelo Tavanti 23, Firenze, Italy',
    categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],

    order: function (starterIndex, mainIndex) {
        return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
    },

    openingHours,
};
/*-------    OR      -------------- */
console.log(3 || "three");
console.log('' || "databaseName");
console.log(false || true);
console.log(undefined || null);
console.log(0 || true);

// Old way; 
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1); //10
// Use short Circuiting; 
const guest2 = restaurant.numGests || 3;
console.log(guest2); //3;

/*-------    AND      -------------- */
// truely and falsy

console.log(0 && false); //0; 
console.log(1 && "true") //true;
console.log(null && "true"); //null 


// old way;

restaurant.guests = 3;

if (restaurant.guests) {
    console.log(restaurant.guests);
}

// Best way
restaurant.guests && console.log(restaurant.guests); //the same above; 



//**************************************************************************************************************************************************** */
//                                                                        I.  The Nulish Coalescing Operator
//**************************************************************************************************************************************************** */

//           Nulish: null and undefind; 


restaurant.numGuests = 0;
let guestsCorrect = restaurant.numGuests ?? 10;
console.log(guestsCorrect);  //10; 

//**************************************************************************************************************************************************** */
//                                                                        I. Optional Chaining
//**************************************************************************************************************************************************** */




// Old way
if (restaurant.openingHours && restaurant.openingHours.mon) {
    console.log(restaurant.openingHours.mon);
}

// 1.Use Optional Chaining: 
console.log(restaurant.openingHours?.mon?.open);


const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
for (let day of days) {
    const open = openingHours?.[day]?.open ?? 'closed';
    console.log(day + ": " + open);
}

restaurant.order?.(0, 1) ?? "method doesn't exist";


// 2.
const volcabularies = [
    { name: "hello", type: "noun" },
    { name: "mouse", type: "noun" },
    { name: "angry" }
]

console.log(volcabularies[2]?.type ?? "This array is empty");


const entries = Object.entries(openingHours);
for (let [key, { open: on, close: off }] of entries) {
    console.log(on, off);
}