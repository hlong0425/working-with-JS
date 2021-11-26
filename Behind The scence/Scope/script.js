//Function scope and Block scope;

//Biến có type là "var" được khai báo trong block scope có thể được sử dụng bên ngoài nếu trong cùng function scope; 



let age = 10;
function myFamily() {
    age = 3
    if (age < 4) {
        let people = "children";
        var person = "children";
    }
    console.log(age);
    // console.log(people); => Wrong; 
    console.log(person); //chirldren
}

myFamily();
// console.log(My);




