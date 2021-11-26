



//This => trỏ đến đối tượng hiện tại để call method 


const Long = {
    year: 2000,
    calcAge: function () {
        console.log(2021 - this.year);
    }
}


Long.calcAge(); //=>result = 21; 



const Thu = {
    year: 2001,
}

Thu.calcAge = Long.calcAge;
Thu.calcAge();  //=> result = 20; 


//Create Year variable ( Global scope ); 

var year = 2021;
// let calcAge = Thu.calcAge;
// console.log(calcAge);
// calcAge();
console.log(window.year);





// Arrow function:
function regularSum(a, b) {
    // arguments is array 
    console.log(arguments);
    return a + b;
}

regularSum(1, 2, 3);



var ArrowSum = (a, b) => {
    return a + b;
}

console.dir(ArrowSum(1, 2))



