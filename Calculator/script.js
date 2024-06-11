let runningTotal = 0;
let buffer = '0';
let previousOperator;
let isDecimal = false;

const screen = document.querySelector('.screen');
const display = document.querySelector('.display');

function buttonClick(value) {
    if (isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    updateDisplay();
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            buffer = '0';
            runningTotal = 0;
            isDecimal = false;
            break;
        case '=':
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseFloat(buffer));
            previousOperator = null;
            isDecimal = false;
            updateDisplay(true); // Pass true to indicate the result
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = '0';
                isDecimal = false;
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '+':
        case '-':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
        case '.':
            handleDecimal();
            break;
    }
}

function handleMath(symbol) {
    if (buffer === '0') {
        return;
    }

    const floatBuffer = parseFloat(buffer);

    if (runningTotal === 0) {
        runningTotal = floatBuffer;
    } else {
        flushOperation(floatBuffer);
    }
    previousOperator = symbol;
    buffer = '0';
    isDecimal = false;
}

function flushOperation(floatBuffer) {
    if (previousOperator === '+') {
        runningTotal += floatBuffer;
    } else if (previousOperator === '-') {
        runningTotal -= floatBuffer;
    } else if (previousOperator === '×') {
        runningTotal *= floatBuffer;
    } else if (previousOperator === '÷') {
        runningTotal /= floatBuffer;
    }
}

function handleNumber(numberString) {
    if (buffer === '0') {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

function handleDecimal() {
    if (!isDecimal) {
        buffer += '.';
        isDecimal = true;
    }
}

function updateDisplay(isResult = false) {
    if (isResult) {
        screen.innerText = runningTotal;
        display.innerText = '';
    } else {
        screen.innerText = runningTotal;
        display.innerText = buffer + (previousOperator ? ' ' + previousOperator : '');
    }
}

function init() {
    document.querySelector('.calc-buttons').addEventListener('click', function (event) {
        buttonClick(event.target.innerText);
    });
}

init();
