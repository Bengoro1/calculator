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
let floored = 1;

function operate() {
    if(firstNumber !== '' && +input.textContent !== NaN && secondNumber !== '') {
        b = +secondNumber;
        a = +firstNumber;
        if(operator === plus) {
            secondNumber = add(a,b);
        } else if(operator === minus) {
            secondNumber = substract(a,b);
        } else if(operator === divided) {
            if(b === 0) {
                clearDisplay();
                result.textContent = 'Nice try!';
                return
            } else {
                secondNumber = divide(a,b);
            }
        } else if(operator === times) {
            secondNumber = multiply(a,b);
        }
        getFloored();
        equation.textContent = `${a} ${operator.textContent} ${b} =`
        secondNumber = Math.floor(secondNumber * floored) / floored;
        if(secondNumber.toString().length > 16) {
            clearDisplay();
            result.textContent = 'ERROR';
            return
        }
        result.textContent = secondNumber;
        firstNumber = secondNumber;
        secondNumber = '';
    } else if(firstNumber === '') {
        result.textContent = secondNumber
        firstNumber = secondNumber;
        secondNumber = '';
    }
    floored = 1;
    input.textContent = '';
    fontSize(equation);
    fontSize(result);
}

const numbers = document.querySelectorAll('.number');
const displayContent = document.querySelectorAll('.display-content');

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
        if(operators[i].getAttribute('listener') !== 'true') {
            operators[i].addEventListener('click', operatorEvent, true);
            operators[i].setAttribute('listener', 'true')
        }
    }
}

function operatorEvent(e) {
    if (e.currentTarget === operator && secondNumber === '') {
        e.currentTarget.removeAttribute('listener', 'true');
        e.currentTarget.removeEventListener('click', operatorEvent, true);
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
    equation.textContent = '';
}

const point = document.getElementById('point');
point.addEventListener('click', () => {
    if (input.textContent.includes('.') !== true && input.textContent !== '') {
        secondNumber += point.textContent;
        input.textContent = secondNumber;
    }
});

checkNumberEvent();

function getFloored() {   
    checkFlooredLength(secondNumber)
    for (let i = 15; i > temporaryFloored.toString().length; i--) {
        floored *= 10;
    } 
}

let temporaryFloored;

function checkFlooredLength(val) {
    temporaryFloored = Math.floor(val);
    return temporaryFloored.toString().length;
}

function fontSize(val) {
    if(val.textContent.length >= 10) {
        val.style.fontSize = '20px';
    } else if (val.textContent.length >= 6) {
        val.style.fontSize = '30px';
    } else {val.style.fontSize = '48px';}
}

const buttons = document.querySelectorAll('.button');
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        checkOperatorEvent();
        checkNumberEvent();
        fontSize(input);
    });
});
