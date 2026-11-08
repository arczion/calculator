
// Variables to store numbers & operator
let firstNumber = '';
let operator = '';
let secondNumber = '';
let justCalculated = false;
let lastOperand = '';
let lastNumber = '';


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
            if (justCalculated) {
                firstNumber = '';
                justCalculated = false;
            }
        firstNumber += button.textContent;
        display.textContent = firstNumber;
        } else {
            secondNumber += button.textContent;
            display.textContent = secondNumber;
        }
    });
});

// Event listener for decimal
const decimalButton = document.querySelector('.decimal');

decimalButton.addEventListener('click', function() {
    if (operator === '') {
        if (justCalculated) {
            firstNumber = '';
            justCalculated = false;
        }
        if(!firstNumber.includes('.')) {
            if (firstNumber === '') {
                firstNumber = '0';
            }
            firstNumber += '.';
            display.textContent = firstNumber;
        }
    } else {
        if(!secondNumber.includes('.')) {
            if (secondNumber = '') {
                secondNumber = '0';
            }
            secondNumber += '.';
            display.textContent = secondNumber;
        }
    }
});

// Event listener for operator buttons
const operatorButtons = document.querySelectorAll('.operator');

operatorButtons.forEach(function (button){
    button.addEventListener('click', function(){
        //Checks for one completer pair and calculates and appends to the screen
        if(firstNumber !== '' && secondNumber !== '') {
            const result = operate(operator, Number(firstNumber), Number(secondNumber));
            firstNumber = String(result);
            secondNumber = '';
            display.textContent = firstNumber;
        }
        operator = button.textContent;
    });
});

// Event listener for equal to button
const equalsButton = document.querySelector('#equals');

equalsButton.addEventListener('click', function() {
    
    if(justCalculated){
        if (!operator === '') return;

        firstNumber = String(display.textContent);
        secondNumber = lastNumber;
        operator = lastOperator;

         const result = operate(operator, Number(firstNumber), Number(secondNumber));
         display.textContent = result;

    }
    // Checks if any of the the 3 values is empty and skips the calculation
    if (firstNumber === '' || operator === '' || secondNumber === '') {
        return;
    }

    const result = operate(operator, Number(firstNumber), Number(secondNumber));
    display.textContent = result;

    if (result === 'Nice Try!') {
        display.textContent = result;
        firstNumber = '';
        operator = '';
        secondNumber = '';
        return;
    }

    const rounded = Math.round(result * 1000) / 1000;
    display.textContent = rounded;
    firstNumber = String(rounded);
    lastOperator = operator;
    lastNumber = secondNumber;
    operator = '';
    secondNumber = '';
    justCalculated = true;
    
});

// Event listener for clear button
const clearButton = document.querySelector('#clear');

clearButton.addEventListener('click', function () {
    firstNumber = '';
    operator = '';
    secondNumber = '';
    display.textContent = '0';
});

// Event listener for DEL button

const backspaceButton = document.querySelector('#backspace');

backspaceButton.addEventListener('click', function() {
    if (operator === '') {
        firstNumber = firstNumber.slice(0, -1);
        if (firstNumber === '') {
            display.textContent = '0';
        } else {
            display.textContent = firstNumber;
        }
    } else {
        secondNumber = secondNumber.slice(0, -1);
        if (secondNumber === '') {
            display.textContent = '0';
        } else {
        display.textContent = secondNumber;
        }
    }    
});

// Keyboard support
document.addEventListener('keydown', function(event){
    
    digitButtons.forEach(function (button){
        if (button.textContent === event.key) {
            button.click();
        }
    });
    
    operatorButtons.forEach(function (button){
    if (button.textContent === event.key) {
        button.click();
        } 
    });

    if (event.key === 'Enter') {
        event.preventDefault();
        equalsButton.click();
    }

    if (event.key === 'Backspace') {
        backspaceButton.click();
    }

    if (event.key === 'Escape') {
        clearButton.click();
    }

    if (event.key === '.') {
        decimalButton.click();
    }
});

