// Calculator script
// Top-level constant for the display element
const displayElem = document.getElementById('display');

// State variables
let currentInput = '';
let previousValue = null;
let operator = null;
let shouldResetDisplay = false;

/**
 * Refreshes the calculator display.
 */
function updateDisplay() {
    displayElem.textContent = currentInput || '0';
}

/**
 * Appends a digit or decimal point to the current input.
 * @param {string} digit - The digit character ('0'-'9' or '.')
 */
function appendDigit(digit) {
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }
    if (digit === '.') {
        // Prevent multiple decimals in the same number
        if (currentInput.includes('.')) return;
        // If the input is empty, start with "0."
        if (currentInput === '') {
            currentInput = '0.';
        } else {
            currentInput += '.';
        }
    } else {
        currentInput += digit;
    }
    updateDisplay();
}

/**
 * Handles operator selection.
 * @param {string} op - One of '+', '-', '*', '/'
 */
function chooseOperator(op) {
    if (operator && !shouldResetDisplay) {
        // There is a pending operation – compute it first
        calculate();
    }
    // Store the current value as the left operand
    previousValue = parseFloat(currentInput);
    operator = op;
    shouldResetDisplay = true;
}

/**
 * Performs the pending calculation.
 */
function calculate() {
    if (operator === null || previousValue === null) {
        // Nothing to compute
        return;
    }
    const currentValue = parseFloat(currentInput);
    let result;
    switch (operator) {
        case '+':
            result = previousValue + currentValue;
            break;
        case '-':
            result = previousValue - currentValue;
            break;
        case '*':
            result = previousValue * currentValue;
            break;
        case '/':
            if (currentValue === 0) {
                currentInput = 'Error';
                // Reset calculator state after an error
                previousValue = null;
                operator = null;
                shouldResetDisplay = true;
                updateDisplay();
                return;
            }
            result = previousValue / currentValue;
            break;
        default:
            return;
    }
    // Round to avoid floating‑point artifacts (12 decimal places)
    result = parseFloat(result.toFixed(12));
    currentInput = result.toString();
    // Clear pending operation
    previousValue = null;
    operator = null;
    shouldResetDisplay = true;
    updateDisplay();
}

/**
 * Resets the calculator to its initial state.
 */
function clearAll() {
    currentInput = '';
    previousValue = null;
    operator = null;
    shouldResetDisplay = false;
    updateDisplay();
}

/**
 * Click handler for calculator buttons.
 * @param {MouseEvent} event
 */
function handleButtonClick(event) {
    const value = event.target.dataset.value;
    if (!value && value !== '') return; // ignore clicks on non‑buttons

    if (value >= '0' && value <= '9') {
        appendDigit(value);
    } else if (value === '.') {
        appendDigit('.');
    } else if (['+', '-', '*', '/'].includes(value)) {
        chooseOperator(value);
    } else if (value === '=') {
        calculate();
    } else if (value === 'C') {
        clearAll();
    }
}

// Attach click listeners to all calculator buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', handleButtonClick);
});

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        appendDigit(e.key);
    } else if (e.key === '.') {
        appendDigit('.');
    } else if (['+', '-', '*', '/'].includes(e.key)) {
        chooseOperator(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
        calculate();
    } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
        clearAll();
    }
});

// Expose functions for potential unit testing
window.calc = {
    appendDigit,
    chooseOperator,
    calculate,
    clearAll,
    updateDisplay,
};
