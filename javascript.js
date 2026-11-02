console.log("Hello");

const add = (a, b) => a + b;
const subtract = (a, b) => a -b;
const divide = (a, b) => {
    if( b === 0) return "not permissible";
    return a / b;
};
const multiply = (a, b) => a * b;

console.log(subtract(5,3));
console.log(divide(15,0));
console.log(multiply(5,3));

