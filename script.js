
// Variables to store numbers & operator
let firstNumber = '';
let operator = '';
let secondNumber = '';



// Functions to do the math operations
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

// Functions to take operator, num1 & num2 & do the calculations
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

// Event listener for digit buttons
const display = document.querySelector('#display');
const digitButtons = document.querySelectorAll('.digit');

digitButtons.forEach(function (button){
    button.addEventListener('click', function (){
        if (operator === '') {
        firstNumber += button.textContent;
        display.textContent = firstNumber;
        } else {
            secondNumber += button.textContent;
            display.textContent = secondNumber;
        }
    });
});

// Event listener for operator buttons
const operatorButtons = document.querySelectorAll('.operator');

operatorButtons.forEach(function (button){
    button.addEventListener('click', function(){
        operator = button.textContent;
    });
});

// Event listener for equal to button
const equalsButton = document.querySelector('#equals');

equalsButton.addEventListener('click', function() {
    const result = operate(operator, Number(firstNumber), Number(secondNumber));
    display.textContent = result;
});

const clearButton = document.querySelector('#clear');

clearButton.addEventListener('click', function () {
    firstNumber = '';
    operator = '';
    secondNumber = '';
    display.textContent = '0';
});