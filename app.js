const previousDisplay = document.querySelector('.previous-display');
const currentDisplay = document.querySelector('.current-display');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const decimal = document.querySelector('.decimal-point');
const negateOperand = document.querySelector('.negate');
const oneOverDisplay = document.querySelector('.one-divide-by-current-display');
const square = document.querySelector('.square');
const squareRoot = document.querySelector('.square-root');
const percent = document.querySelector('.percent')
const equal = document.querySelector('.equal');
const clear = document.querySelector('.clear');
const clearCurrentDisplay = document.querySelector('.clear-current-display');
const del = document.querySelector('.delete');


currentDisplay.textContent = '0';
let firstOperand = '';
let secondOperand = '';
let operator = null;
let resetCurrentDisplay = false;

const display = function (num) {

    if (currentDisplay.textContent === '0' || resetCurrentDisplay) {
        currentDisplay.textContent = '';
        resetCurrentDisplay = false;
    }
    currentDisplay.textContent += num;
    currentDisplay.textContent = currentDisplay.textContent.substring(0, 12);
}
const decimalDisplay = function (point) {
    if (currentDisplay.textContent.includes('.') === true) currentDisplay = '';
    currentDisplay.textContent += point
    currentDisplay.textContent = currentDisplay.textContent.substring(0, 12);
}

const negate = function () {
    currentDisplay.textContent = (parseFloat(currentDisplay.textContent) * (-1));
}

const oneOverCurrentDisplay = function () {
    currentDisplay.textContent = (1 / parseFloat(currentDisplay.textContent));
    currentDisplay.textContent = currentDisplay.textContent.substring(0, 12);
    resetCurrentDisplay = true;
}

const squareCurrentDisplay = function () {
    currentDisplay.textContent = parseFloat(currentDisplay.textContent) * parseFloat(currentDisplay.textContent);
    resetCurrentDisplay = true;
}

const squareRootDisplay = function () {
    currentDisplay.textContent = Math.sqrt(parseFloat(currentDisplay.textContent));
    resetCurrentDisplay = true;
}

const percentCurrentDisplay = function () {
    currentDisplay.textContent = parseFloat(currentDisplay.textContent) / 100;
    resetCurrentDisplay = true;
}

const clearCurrentScreen = function () {
    if (previousDisplay.textContent.includes('=') === true) clr();
    currentDisplay.textContent = '0'
}

const setOperator = function (operation) {

    if (operator !== null) evaluate();
    operator = operation;
    firstOperand = currentDisplay.textContent;
    previousDisplay.textContent = `${firstOperand} ${operator}`;
    resetCurrentDisplay = true;
}
const evaluate = function () {

    if (resetCurrentDisplay) return;

    secondOperand = currentDisplay.textContent;

    if (operator === '+') {
        currentDisplay.textContent = (parseFloat(firstOperand) + parseFloat(secondOperand));
        previousDisplay.textContent = `${firstOperand} ${operator} ${secondOperand} =`;
    }

    if (operator === '−') {
        currentDisplay.textContent = parseFloat(firstOperand) - parseFloat(secondOperand);
        previousDisplay.textContent = `${firstOperand} ${operator} ${secondOperand} =`;
    }

    if (operator === '×') {
        currentDisplay.textContent = parseFloat(firstOperand) * parseFloat(secondOperand);
        previousDisplay.textContent = `${firstOperand} ${operator} ${secondOperand} =`;
    }

    if (operator === '÷') {

        currentDisplay.textContent = parseFloat(firstOperand) / parseFloat(secondOperand);
        previousDisplay.textContent = `${firstOperand} ${operator} ${secondOperand} =`;

        if (parseInt(secondOperand) === 0) {
            currentDisplay.textContent = 'undefined'

        }
    }

    resetCurrentDisplay = true;
}

const undo = function () {
    if (currentDisplay.textContent === '0') {
        return
    }

    const str = currentDisplay.textContent;
    currentDisplay.textContent = str.slice(0, str.length - 1);

    if (currentDisplay.textContent.length === 0) {
        currentDisplay.textContent = '0';

    }
}

const clr = function () {
    firstOperand = '';
    secondOperand = '';
    previousDisplay.textContent = '';
    currentDisplay.textContent = '0';
    operator = null;
    resetCurrentDisplay = false;
}

numberButtons.forEach((numberButton) => {
    numberButton.addEventListener('click', (e) => display(e.target.textContent));
})
operatorButtons.forEach((operatorButton) => {
    operatorButton.addEventListener('click', (e) => setOperator(e.target.textContent));
})
decimal.addEventListener('click', (e) => (decimalDisplay(e.target.textContent)));
oneOverDisplay.addEventListener('click', oneOverCurrentDisplay);
square.addEventListener('click', squareCurrentDisplay);
squareRoot.addEventListener('click', squareRootDisplay);
negateOperand.addEventListener('click', negate);
percent.addEventListener('click', percentCurrentDisplay)
equal.addEventListener('click', evaluate);
del.addEventListener('click', undo);
clearCurrentDisplay.addEventListener('click', clearCurrentScreen)
clear.addEventListener('click', clr)