(function() {
    // Calculator class definition
    class Calculator {
        constructor() {
            this.currentInput = '';
            this.previousValue = null;
            this.operator = null;
            this.result = null;
        }

        // Append a digit or decimal point to the current input
        appendDigit(digit) {
            if (digit === '.') {
                // Prevent multiple decimal points
                if (this.currentInput.includes('.')) return;
                // If current input is empty, prepend a leading zero for clarity
                if (this.currentInput === '') this.currentInput = '0';
            }
            this.currentInput += digit;
            // Reset any previous result when starting a new entry (clears error state)
            this.result = null;
        }

        // Set the operator for the next calculation
        setOperator(op) {
            if (this.currentInput !== '') {
                // Store the current input as the previous value
                this.previousValue = this.currentInput;
                this.currentInput = '';
            }
            this.operator = op;
            // Reset any previous result when a new operator is chosen
            this.result = null;
        }

        // Perform the calculation based on stored operator and values
        calculate() {
            if (this.operator === null) return; // Nothing to calculate
            const left = parseFloat(this.previousValue);
            const right = parseFloat(this.currentInput);
            if (isNaN(left) || isNaN(right)) return; // Incomplete expression
            let res;
            switch (this.operator) {
                case '+':
                    res = left + right;
                    break;
                case '-':
                    res = left - right;
                    break;
                case '*':
                    res = left * right;
                    break;
                case '/':
                    if (right === 0) {
                        this.result = 'Error';
                        this.previousValue = null;
                        this.operator = null;
                        this.currentInput = '';
                        return;
                    }
                    res = left / right;
                    break;
                default:
                    return;
            }
            // Store result and reset state for next operation
            this.result = Number.isFinite(res) ? parseFloat(res.toFixed(10)) : res; // limit floating errors
            this.previousValue = null;
            this.operator = null;
            this.currentInput = '';
        }

        // Clear all calculator state
        clear() {
            this.currentInput = '';
            this.previousValue = null;
            this.operator = null;
            this.result = null;
        }

        // Remove the last character from current input
        backspace() {
            if (this.currentInput.length > 0) {
                this.currentInput = this.currentInput.slice(0, -1);
            }
            // If we backspace away all characters, also clear any stale result
            if (this.currentInput === '') {
                this.result = null;
            }
        }

        // Determine what should be shown on the display
        getDisplayValue() {
            if (this.result !== null) return String(this.result);
            if (this.currentInput !== '') return this.currentInput;
            if (this.previousValue !== null) return this.previousValue;
            return '0';
        }

        // Update the DOM display element and handle error visual state
        updateDisplay() {
            const displayEl = document.getElementById('display');
            if (displayEl) {
                displayEl.textContent = this.getDisplayValue();
                // Apply error styling when result is the string 'Error'
                if (this.result === 'Error') {
                    displayEl.classList.add('error');
                } else {
                    displayEl.classList.remove('error');
                }
            }
        }
    }

    // Utility to detect operator keys
    function isOperator(key) {
        return ['+', '-', '*', '/'].includes(key);
    }

    // Instance placeholder – will be created on DOMContentLoaded
    let calc = null;

    // Event handler for button clicks (delegated)
    function handleButtonClick(event) {
        const target = event.target;
        if (!target.matches('button')) return; // ignore non‑button clicks
        const action = target.getAttribute('data-action');
        const value = target.getAttribute('data-value');
        if (!action) return;

        switch (action) {
            case 'digit':
                calc.appendDigit(value);
                break;
            case 'operator':
                calc.setOperator(value);
                break;
            case 'equals':
                calc.calculate();
                break;
            case 'clear':
                calc.clear();
                break;
            case 'backspace':
                calc.backspace();
                break;
            default:
                // No unknown actions expected
                break;
        }
        calc.updateDisplay();
    }

    // Event handler for keyboard input
    function handleKeyPress(event) {
        const key = event.key;
        // Map keys to actions
        if (/^[0-9]$/.test(key)) {
            calc.appendDigit(key);
        } else if (key === '.') {
            calc.appendDigit(key);
        } else if (isOperator(key)) {
            calc.setOperator(key);
        } else if (key === 'Enter' || key === '=') {
            calc.calculate();
        } else if (key === 'Backspace') {
            calc.backspace();
        } else if (key === 'Escape' || key.toLowerCase() === 'c') {
            calc.clear();
        } else {
            // Unhandled key – ignore but prevent default for space to avoid scrolling
            if (key === ' ') {
                event.preventDefault();
            }
            return;
        }
        // Prevent default behavior for handled keys (e.g., form submission, scrolling)
        event.preventDefault();
        calc.updateDisplay();
    }

    // Initialization after DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        calc = new Calculator();
        // Expose for debugging
        window.calculator = calc;
        const grid = document.querySelector('.buttons-grid');
        if (grid) {
            grid.addEventListener('click', handleButtonClick);
        }
        document.addEventListener('keydown', handleKeyPress);
        // Initial display
        calc.updateDisplay();
    });
})();