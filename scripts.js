let a = 0
let b = 0;
let operator;
let display = 0;

let displayText = document.querySelector('#display');
init();

//Todo: make the names and responsibilities of "display" vs "displayText" consistent.
//This should be legible in the code and redundant assignments should be removed.

//Todo 2: clean up code (don't take too long on this... as per odin proj recommendations)

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
                display = operate(a, displayText.textContent, operator);
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
            if (operator) {
                display = operate(a, displayText.textContent, operator);
                displayText.textContent = display;
                operator = '';
            }
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
    return Number(a) + Number(b);
}

function subtract(a, b) {
    return Number(a) - Number(b);
}

function multiply(a, b) {
    return Number(a) * Number(b);
}

function divide(a, b) {
    return Number(a) / Number(b);
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