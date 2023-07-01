function add(a, b) {
    return a + b;
}

function substract(a, b) {
    return a - b;
}

function divide(a, b) {
    return a / b;
}

function multiply(a, b) {
    return a * b;
}

function operate() {
    if(firstNumber !== '' && +input.textContent !== NaN && secondNumber !== '') {
        b = +secondNumber;
        a = +firstNumber;
        if(operator === plus) {
            secondNumber = add(a,b);
        } else if(operator === minus) {
            secondNumber = substract(a,b);
        } else if(operator === divided) {
            if(secondNumber === 0) {
                result.textContent = 'Nice try!';
                return null
            } else {
                secondNumber = divide(a,b);
            }
        } else if(operator === times) {
            secondNumber = multiply(a,b);
        }
        result.textContent = secondNumber
        firstNumber = secondNumber;
        secondNumber = '';
    } else if(firstNumber === '') {
        result.textContent = secondNumber
        firstNumber = secondNumber;
        secondNumber = '';
    }  
    input.textContent = '';
}
