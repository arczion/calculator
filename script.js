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
const display = document.querySelector('.display');
const button = document.querySelector('.buttons');

button.addEventListener('click', (event) => {
    let target = event.target;
    
    switch(target.value) {
        case '0':
            break;
        case '1':
            break;
        case '2':
            break;
        case '3':
            break;
        case '4':
            break;
        case '5':
            break;
        case '6':
            break;
        case '7':
            break;
        case '8':
            break;
        case '9':
            break;
        case 'clr':
            display.innerText = '';
            break;
        case '+':
            break;
        case '-':
            break;
        case '/':
            break;
        case '*':
            break;
        case '=':
            break; 
    }
})

