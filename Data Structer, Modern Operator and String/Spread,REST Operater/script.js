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



/*************************************************************************************************************************/
/*******                                Spread Operator with Array                                                 *******/
/*************************************************************************************************************************/

// 😪 Bad way; 
const arr = [7, 8, 9];
const badNewArray = [1, 2, arr[0], arr[1], arr[2]]

// a) Use spread Operator; 
const spread = [7, 8, 9, ...arr];
console.log(spread);// => [7, 8, 9, 7, 8, 9]


// b) Create new Array name "newMenu" contains all mainMenu in restaurant; 
let newmenu = [...restaurant.mainMenu];
console.log(newmenu); // (3) ['Pizza', 'Pasta', 'Risotto']

// c) "b)" expand 
newmenu = [...restaurant.mainMenu, 'hot dog', 'Taco'];
console.log(newmenu);  //['Pizza', 'Pasta', 'Risotto', 'hot dog', 'Taco']


// d) Create array "meu" hold all menu value; 
let menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(menu); //['Pizza', 'Pasta', 'Risotto', 'Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'] 

// e) spread string bellow; 
const str = "My computer is black";
console.log([...str]); // ['M', 'y', ' ', 'c', 'o', 'm', 'p', 'u', 't', 'e', 'r', ' ', 'i', 's', ' ', 'b', 'l', 'a', 'c', 'k']

// f); 
restaurant.orderPasta = function (ing1, ing2, ing3) {
    console.log(`Here is your delicious pasta with ${ing1} , ${ing2}, ${ing3}`);
}

const ingredient = ["Bacon", "Cheese", "Mushroom"]; //Here is your delicious pasta with Bacon , Cheese, Mushroom
restaurant.orderPasta(...ingredient);


/*************************************************************************************************************************/
/*******                                Spread Operator with Object                                                *******/
/*************************************************************************************************************************/


// a) make a new restaurant copy; 
let restaurantCopy = { ...restaurant };
console.log(restaurantCopy);


/*************************************************************************************************************************/
/*******                                REST Operator with Object                                                *********/
/*************************************************************************************************************************/

// The Res syntax is taking mutiple number/value and packs them all into the array; 


//      1.Destructuring
//a) 
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others); //1 2 (3) [3, 4, 5]

//b)
const [Pizza, , Risotto, ...othersfood] = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(Pizza, Risotto, othersfood);

//c)
const { fri, ...weekdays } = restaurant.openingHours;
console.log(fri, weekdays);





//      2.Function 
//a) 
function sum(...arr) {
    console.log(arr);
}

sum(1, 2, 3, 4);


//b)
restaurant.orderPizza = function (mainIngredient, ...ortherIngredient) {
    console.log("mainIngredient: " + mainIngredient);
    console.log("" + ortherIngredient);
}

restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');

