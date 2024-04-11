let a = 0
let b = 0;
let operator;
let display = 0;

let displayText = document.querySelector('#display');
init();


function init() {
    displayText.textContent = display;
    const numberButtons = document.querySelectorAll('.num');

    //listener for displaying numbers
    for (const num of numberButtons) {
        num.addEventListener('click', () => {
            display = ( display === 0 ) ? num.textContent : String(display).concat(num.textContent);
            displayText.textContent = display;
        });
    }

    //listener for adding numbers
    const operatorBtns = document.querySelectorAll('.operator');
    for (const op of operatorBtns) {
        op.addEventListener('click', () => {

            if (operator) {
                display = operate(Number(a),Number(displayText.textContent),operator);
                displayText.textContent = display;                   
            }

            operator = op.textContent;
            a = display;
            display = 0;
            // displayText.textContent = display;

        });
    }

    //equals button
    const eqBtn = document.querySelector('#evaluate');
    eqBtn.addEventListener('click', () => {
            display = operate(Number(a),Number(displayText.textContent),operator);
            displayText.textContent = display;
            operator = '';
    });

    //clr button
    const clrBtn = document.querySelector('#clr');
    clrBtn.addEventListener('click', () => {
        display = 0;
        displayText.textContent = display;
        operator = '';
        a = 0;
        b = 0;
    });

}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a, b, operator) {
    switch (operator) { //operator is assumed to be string
        case "+":
            return add(a,b);
        case "-":
            return subtract(a,b);
        case "*":
            return multiply(a,b);
        case "/":
            return divide(a,b);
    }
}