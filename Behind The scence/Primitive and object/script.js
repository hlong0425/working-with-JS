console.log("------------------     Primitive Type             -------------------");
// Primitive type; 
let lastname = "Williams";
let oldLastName = lastname;

console.log('oldLastName: ' + oldLastName);
console.log('lastname: ' + lastname);
console.log("set lastname become David")
lastname = "David";
console.log('oldLastName: ' + oldLastName);
console.log('lastname: ' + lastname);


console.log("---------------- Reference types ------------------------");

// Reference types; 
const jessica = {
    firstname: "jessica",
    lastname: "Williams",
    age: 27,
}
console.log('Jessica', jessica);
console.log('Set marriedJessica = jessica');

const marriedJessica = jessica;
console.log('marriedJessica', marriedJessica)
console.log(marriedJessica);


console.log('marriedJessica.lastname = David Beckham')
marriedJessica.lastname = "David Beckham";
console.log("jessica", jessica);



console.log("----------------- Copy object actualy -----------------------");
const jessica2 = {
    firstname: "jessica",
    lastname: "Williams",
    age: 27,
}

const jessicaCopy = Object.assign({}, jessica2);
console.log('jessicaCopy (use Object asign) ', jessicaCopy);
jessicaCopy.firstname = 'David Backham';
console.log('jessicaCopy.firstname= "David Backham"');
console.log('jessica2', jessica2);
console.log('jessicaCopy', jessicaCopy);
