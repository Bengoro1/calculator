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
                secondNumber = 'Nice try!';
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

const buttons = document.querySelectorAll('.button');
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        checkNumberEvent();
        checkOperatorEvent();
    });
});

const numbers = document.querySelectorAll('.number');

function checkNumberEvent() {
    if(input.textContent.length < 15 && numbers[0].getAttribute('listener') !== 'true') {
        for (let i = 0; i < numbers.length; i++) {
            numbers[i].setAttribute('listener', 'true');
            numbers[i].addEventListener("click", numberEvent);
        }
    } else if (input.textContent.length >= 15 && numbers[0].getAttribute('listener') === 'true') {
        for (let i = 0; i < numbers.length; i++) {
            numbers[i].removeAttribute('listener', 'true');
            numbers[i].removeEventListener('click', numberEvent);
        }
    }
}

function numberEvent(e) {
    secondNumber += e.currentTarget.textContent;
    input.textContent = secondNumber;
}

const operators = document.querySelectorAll('.operator');

function checkOperatorEvent() {
    for (let i = 0; i < operators.length; i++) {
        operators[i].addEventListener('click', operatorEvent);
    }
}

function operatorEvent(e) {
    if (e.currentTarget === operator) {
        e.currentTarget.removeEventListener('click', operatorEvent);
        return;
    }
    operate();
    operator = e.currentTarget;
    result.textContent = firstNumber + ' ' + operator.textContent;
}

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
clear.addEventListener('click', clearDisplay);

function clearDisplay() {
    firstNumber = '';
    secondNumber = '';
    operator = '';
    input.textContent = '';
    result.textContent = '';
}

const point = document.getElementById('point');
point.addEventListener('click', () => {
    if (input.textContent.includes('.') !== true && input.textContent !== '') {
        secondNumber += point.textContent;
        input.textContent = secondNumber;
    }
});

checkNumberEvent();
checkOperatorEvent();
// function getFloored() {   
    //     for (let i = 17; i > checkFlooredLength(result.textContent); i--) {
//         floored *= 10;
//     } 
// }

// let temporaryFloored;

// function checkLength(val) {
//     return val.toString().length;
// }

// function checkFlooredLength(val) {
//     temporaryFloored = Math.floor(val);
//     return checkLength(temporaryFloored);
// }

// removeEventListener in forEach if conditions are met 
// check for point in input removeEventListener

