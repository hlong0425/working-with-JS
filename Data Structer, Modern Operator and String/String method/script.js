

//             -[           4321]
const airline = "TAP Air Potugal";
//              [012345678......]  

// All string'method
console.log(String.prototype);

// 1)
// a) indexOf
console.log(airline.indexOf(" ")); //3 
console.log(airline.indexOf("Potugal")); //8

// 1) b) lastIndexOf
console.log(airline.lastIndexOf(" ")); //7 



//------ 2) slice ------------------------------

//a) Copy new string
console.log(airline.slice(""));
//b) Cut string
console.log(airline.slice(0, 3)); //TAP
console.log(airline.slice(0, airline.indexOf(" "))); //TAP
console.log(airline.slice(airline.lastIndexOf(" ") + 1)); //Potugal

//c) Cut string (use nagative)
console.log(airline.slice(-2)); //al
console.log(airline.slice(3 + 1, -7)); //Air

checkMiddleSeat('11B');
function checkMiddleSeat(seat) {
    const s = seat.slice(-1);

    if (s === 'B' || s === 'C') {
        console.log("This is Middle Seat");
    }
    else {
        console.log("Not middle seat");
    }
}



// 3) -------UpperCase/LowerCase
const passenger = 'JoNas';
const passengerLower = passenger.toLowerCase();
const passengerCorrect = passenger[0].toLocaleUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);




// 4) ------------Trim--- :))) --------
const email = "hello@jonas.io";
const loginEmail = "   Hello@Jonas \n";
const loginEmaiCorrect = loginEmail.trim().toLowerCase();
console.log(loginEmaiCorrect); //hello@jonas

// 5) --------------Replace------------- 
const price = "5000VND";
console.log(price.replace('VND', '$')); //5000$

const cry = "Ha Ha Ha Ha Ha";
console.log(cry.replaceAll(/Ha/g, "Hu"));

//-----------Boolean-----------
const phone = "+8481823012";
//include
console.log(phone.includes("+84")); //true; 
console.log(phone.startsWith("+84")); //true \;




//------- Split (Tách)-----------

let name = "le   hoang   lOng";



function correctName(name) {
    name = name.toLowerCase().split(" ");
    const newname = [];
    for (let e of name) {
        if (e !== "") {
            eUpper = e[0].toUpperCase();
            e = e.replace(e[0], eUpper);
            newname.push(e);
        }
    }
    return newname.join(" ");
}


const capitalizeName = function (name) {
    name = name.split(" ");
    const newName = new Array();
    for (let n of name) {
        // n = n.replace(n[0], n[0].toUpperCase());

        newName.push(n[0].toUpperCase() + n.slice(1));
    }
    console.log(newName);
    return newName.join(" ");
}
capitalizeName('jessica ann with smith david');


const message = "go to gate 23";
console.log(message.padStart(23, "+").padEnd(33, "+"));


function maskCreditCard(number) {
    number = String(number);
    return number.slice(-4).padStart(number.length, "*");
}

let a = 5;
function switchValue(b) {
    b = 10;
}


switchValue(a);
console.log(a);

const oneWord = function (str) {
    return str.replaceAll(/ /g, '').toLowerCase();
}

const upperfirstword = function (str) {
    //le hoang long
    let [first, ...other] = str.split(" ");
    return [first.toUpperCase(), ...other].join(" ");
}

console.log(upperfirstword('Le  Hoang Long')); //lehoanglong; 
