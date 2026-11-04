console.log("Hello");

const add = (a, b) => a + b;
const subtract = (a, b) => a -b;
const divide = (a, b) => {
    if( b === 0) return "not permissible";
    return a / b;
};
const multiply = (a, b) => a * b;

const number1 = 0;
const number2 = 0;
const operand = '';

function operate(number1, number2, operand) {
    return operand(number1,number2);
}

const button = document.querySelector('.buttons');

button.addEventListener('click', (event) => {
    let target = event.target;
    console.log(target.value);
})