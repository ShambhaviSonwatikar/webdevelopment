document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('input[type="text"]');
    let currentInput = '';
    let previousInput = '';
    let operation = null;

    const clearDisplay = () => {
        currentInput = '';
        previousInput = '';
        operation = null;
        display.value = '0';
    };

    const deleteLast = () => {
        currentInput = currentInput.toString().slice(0, -1);
        display.value = currentInput;
    };

    const appendNumber = (number) => {
        if (number === '.' && currentInput.includes('.')) return;
        currentInput += number;
        display.value = currentInput;
    };

    const chooseOperation = (op) => {
        if (currentInput === '') return;
        if (previousInput !== '') {
            compute();
        }
        operation = op;
        previousInput = currentInput;
        currentInput = '';
    };

    const compute = () => {
        let computation;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        if (isNaN(prev) || isNaN(current)) return;
        switch (operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            default:
                return;
        }
        currentInput = computation;
        operation = undefined;
        previousInput = '';
        display.value = currentInput;
    };

    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('operator')) {
                if (button.innerText === 'AC') {
                    clearDisplay();
                } else if (button.innerText === 'DEL') {
                    deleteLast();
                } else {
                    chooseOperation(button.innerText);
                }
            } else if (button.innerText === '=') {
                compute();
            } else {
                appendNumber(button.innerText);
            }
        });
    });
});

