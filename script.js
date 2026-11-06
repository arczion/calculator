let firstNumber = '';
let operator = '';
let secondNumber = '';




function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function divide(a, b) {
    if (b === 0) {
        return 'Nice Try!';
    }
    return a / b;
}

function multiply(a, b) {
    return a * b;
}

function operate(operator, a, b) {
    if (operator === '+') {
        return add(a, b);
    } else if (operator === '-') {
        return subtract(a, b);
    } else if (operator === '*') {
        return multiply(a, b);
    } else if (operator === '/') {
        return divide(a, b);
    }
}

const display = document.querySelector('#display');
const digitButtons = document.querySelectorAll('.digit');

digitButtons.forEach(function (button){
    button.addEventListener('click', function (){
        firstNumber += button.textContent;
        display.textContent = firstNumber;
    });
});