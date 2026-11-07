const calculator = {
    add: (a, b) =>a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => {
        if (b === 0) {
            return "Cannot divide by zero";
        }
        
        return a / b;
    },    
    operate: (operator, a, b) => {
        const method = operatorMap[operator];
        const result = calculator[method](a, b);

        if (typeof result !== "number") return result;

        return  Math.round(result * 100) / 100;
    }
};

const state = {
    firstOperand: null,
    secondOperand: null,
    operator: null,
    displayValue: "0",
    shouldResetDisplay: false,
    lastOperator: null,
    lastOperand: null,
    shouldResetAfterPercent: false
};

const buttons = [
    {value: "AC", type: "clear"},
    {value: "DEL", type: "delete"},
    {value: "%", type: "percent"},
    {value: "/", label: "÷", type: "operator"},

    {value: "7", type: "number"},
    {value: "8", type: "number"},
    {value: "9", type: "number"},
    {value: "*", label: "×", type: "operator"},

    {value: "4", type: "number"},
    {value: "5", type: "number"},
    {value: "6", type: "number"},
    {value: "-", type: "operator"},

    {value: "1", type: "number"},
    {value: "2", type: "number"},
    {value: "3", type: "number"},
    {value: "+", type: "operator"},

    {value: "0", type: "number"},
    {value: ".", type: "decimal"},
    {value: "=", type: "equal"},
];

const buttonsContainer = document.querySelector(".buttons");

buttons.forEach(button => {
    const buttonElement = document.createElement("button");
    
    buttonElement.textContent =  button.label || button.value;
    buttonElement.dataset.value = button.value;
    buttonElement.dataset.type = button.type;

    buttonsContainer.append(buttonElement);
});

buttonsContainer.addEventListener("click", function(event) {
    const clickedButton = event.target.closest("button");

    if (!clickedButton) return;

    const value = clickedButton.dataset.value;
    const type = clickedButton.dataset.type;

    if (type === "number") {
        inputNumber(value);

    }

    if (type === "operator") {
        inputOperator(value);
        console.log(state);
    }

    if (type === "equal") {
        inputEquals();
    }

    if (type === "clear") {
        clearCalculator();
    }

    if (type === "delete") {
        deleteNumber();
    }

    if (type === "decimal") {
        inputDecimal();
    }

    if (type === "percent") {
        inputPercent();
    }

});

const display = document.querySelector(".display");
display.textContent = state.displayValue;

function inputNumber(number) {
    if (state.shouldResetDisplay || state.shouldResetAfterPercent) {
        state.displayValue = number;
        state.shouldResetDisplay = false;
        state.shouldResetAfterPercent = false;
    }
     else if (state.displayValue === '0') {
        state.displayValue = number;
    }
     else {
        state.displayValue += number;
    }

    display.textContent = state.displayValue;
}

function inputOperator(operator) {

    if (state.shouldResetDisplay) {
        state.operator = operator;
        return;
    }

    if (state.operator != null) {
        state.secondOperand = Number(state.displayValue);

        const result = calculator.operate(
            state.operator,
            state.firstOperand,
            state.secondOperand
        );
        state.firstOperand = result;
        state.displayValue = String(result);
        display.textContent = state.displayValue;
    }

    state.firstOperand = Number(state.displayValue);
    state.operator = operator;
    state.shouldResetDisplay = true;
}

function inputEquals() {

    const isRepeating = state.operator === null;

    if (isRepeating) {
        if (state.lastOperator === null) return;

        state.firstOperand = Number(state.displayValue);
        state.operator = state.lastOperator;
        state.secondOperand = state.lastOperand;
    } else {
        if (state.shouldResetDisplay) return;
        
        state.secondOperand = Number(state.displayValue);
    }
    
          
    state.lastOperator = state.operator;
    state.lastOperand = state.secondOperand;

    const result = calculator.operate(
        state.operator,
        state.firstOperand,
        state.secondOperand       
    );

    state.displayValue = String(result);
    display.textContent = state.displayValue;
    state.shouldResetDisplay = true;
    state.operator = null;
}

const operatorMap = {
    "+": "add",
    "-": "subtract",
    "*": "multiply",
    "/": "divide"
};

function clearCalculator() {
    state.firstOperand = null;
    state.secondOperand =  null;
    state.operator = null;
    state.displayValue = "0";
    state.shouldResetDisplay = false;
    state.lastOperand = null;
    state.lastOperator = null;
    state.shouldResetAfterPercent = false;

    display.textContent = state.displayValue;
}

function deleteNumber() {
    state.displayValue = state.displayValue.slice(0, -1);

    if (state.displayValue === "") {
        state.displayValue = "0";
    }

    display.textContent = state.displayValue;
}

function inputDecimal() {
    
    if (state.shouldResetDisplay || state.shouldResetAfterPercent) {
        state.displayValue= "0.";
        state.shouldResetDisplay = false;
    } else if (!state.displayValue.includes(".")) {
        state.displayValue += ".";
    }

    display.textContent = state.displayValue;
}

function inputPercent() {
    const percentage = Number(state.displayValue) / 100;
    state.shouldResetAfterPercent = true;

    if (state.operator === "+" || state.operator === "-") {
        state.displayValue = String(
            Math.round(state.firstOperand * percentage * 100) / 100
        );
    } else {
        state.displayValue = String(
            Math.round(percentage * 100) / 100
        );
    }
    display.textContent = state.displayValue;
}

document.addEventListener("keydown", function(event) {
    
    switch (event.key) {
        case "Enter" :
            inputEquals();
            break;
        case "Backspace" :
            event.preventDefault();
            deleteNumber();
            break;
        case "Escape":
        case "Delete":
            clearCalculator();
            break;
        case ".":
            inputDecimal();
            break;
        case "%":
            inputPercent();
            break;
        case " ":
            event.preventDefault();
            break;

        default:
            if (event.key >= "0" && event.key <= "9") {
                inputNumber(event.key);
            } else if (operatorMap[event.key]) {
                inputOperator(event.key);
            }
        }
});