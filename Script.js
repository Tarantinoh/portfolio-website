class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if (this.currentOperand === '') {
            this.currentOperand = '0';
        }
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }
        
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    updateDisplay() {
        this.currentOperandElement.innerText = this.currentOperand;
        if (this.operation != null) {
            this.previousOperandElement.innerText = 
                `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousOperandElement.innerText = this.previousOperand;
        }
    }
}

// Get DOM elements
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-action="equals"]');
const deleteButton = document.querySelector('[data-action="delete"]');
const clearButton = document.querySelector('[data-action="clear"]');
const previousOperandElement = document.getElementById('previous-operand');
const currentOperandElement = document.getElementById('current-operand');

// Create calculator
const calculator = new Calculator(previousOperandElement, currentOperandElement);

// Event listeners for number buttons
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

// Event listeners for operation buttons
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

// Event listener for equals button
equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

// Event listener for clear button
clearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

// Event listener for delete button
deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});

// Keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    if (key >= '0' && key <= '9' || key === '.') {
        calculator.appendNumber(key);
        calculator.updateDisplay();
    }
    
    if (key === '+' || key === '-' || key === '*' || key === '/') {
        let operation = key;
        if (key === '*') operation = '×';
        if (key === '/') operation = '÷';
        calculator.chooseOperation(operation);
        calculator.updateDisplay();
    }
    
    if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculator.compute();
        calculator.updateDisplay();
    }
    
    if (key === 'Escape') {
        calculator.clear();
        calculator.updateDisplay();
    }
    
    if (key === 'Backspace') {
        calculator.delete();
        calculator.updateDisplay();
    }
});
