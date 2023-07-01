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

let firstNumber = '';
let secondNumber = '';
let operator;

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
        result.textContent = `${a} ${operator.textContent} ${b} = \r ${secondNumber}` 
        firstNumber = secondNumber;
        secondNumber = '';
    } else if(firstNumber === '') {
        result.textContent = secondNumber
        firstNumber = secondNumber;
        secondNumber = '';
    }  
    input.textContent = '';
}

const numbers = document.querySelectorAll('.number');
numbers.forEach((number) => {
    number.addEventListener('click', () => {
        secondNumber += number.textContent;
        input.textContent = secondNumber;
    });
});

const operators = document.querySelectorAll('.operator');
operators.forEach((opers) => {
    opers.addEventListener('click', () => {
        operate();
        operator = opers;
        result.textContent += ' ' + opers.textContent;
    });
});

const equal = document.getElementById('equal');
equal.addEventListener('click', () => {
    if (firstNumber !== '' && secondNumber !== '') {
        operate();
    }
});

const del = document.getElementById('delete');
del.addEventListener('click', () => {
    input.textContent = input.textContent.slice(0, -1);
    secondNumber = input.textContent;
});

const clear = document.getElementById('clear');
clear.addEventListener('click', () => {
    firstNumber = '';
    secondNumber = '';
    operator = '';
    input.textContent = '';
    result.textContent = '';
});
