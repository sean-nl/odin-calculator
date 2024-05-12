let a = 0
let b = 0;
let operator;
let currentVal = 0;
let resetInput = true; // if true, the next number input will replace the current number being displayed.
const DECIMAL_PLACES = 8;
const OVERFLOW_LIMIT = 10; //amount of characters that can be input

let display = document.querySelector('#display');
init();

//Todo 1: Add negative and sqrt

//Todo 2: clean up code (don't take too long on this... as per odin proj recommendations)
//probbably can use resetinput intelligently and simplify the number button event listeners.

function init() {
    display.textContent = 0;
    
    //For displaying numbers
    const numberButtons = document.querySelectorAll('.num');
    for (const num of numberButtons) {

        //If user presses 0 and 0 is displayed, don't do anything.
        //Otherwise, update the currentval and display it.
        if (num.textContent === '0') {
            num.addEventListener('click', () => {
                if (display.textContent !== '0') {
                    currentVal = ( (currentVal === 0 || resetInput === true) && (display.textContent !== '.') ) ? num.textContent : trimToLen(String(currentVal).concat(num.textContent),OVERFLOW_LIMIT);
                    resetInput = false;
                    display.textContent = currentVal;
                }
            });
        }
        else {
            num.addEventListener('click', () => {
                currentVal = ( (currentVal === 0 || resetInput === true) && (display.textContent !== '.') ) ? num.textContent : trimToLen(String(currentVal).concat(num.textContent),OVERFLOW_LIMIT);
                resetInput = false;
                display.textContent = currentVal;
            });
        }

    }

    //Operators
    const operatorBtns = document.querySelectorAll('.operator');
    for (const op of operatorBtns) {
        op.addEventListener('click', () => {
            if (operator) {
                currentVal = operate(a, display.textContent, operator);
                isNumeric(currentVal) ? display.textContent = roundToDecimal(currentVal, DECIMAL_PLACES) : display.textContent = currentVal;            
            }
            operator = op.textContent;
            a = currentVal;
            currentVal = 0;
            decBtn.disabled = false;
        });
    }

    //Equals button
    const eqBtn = document.querySelector('#evaluate');
    eqBtn.addEventListener('click', () => {
            if (operator) {
                currentVal = operate(a, display.textContent, operator);
                isNumeric(currentVal) ? display.textContent = roundToDecimal(currentVal, DECIMAL_PLACES) : display.textContent = currentVal;
                operator = '';
                resetInput = true;
                decBtn.disabled = false;
            }
    });

    //Decimal button
    const decBtn = document.querySelector('#decimal');
    decBtn.addEventListener('click', () => {
        currentVal = resetInput ? '0.' : currentVal.concat('.');
        display.textContent = currentVal;
        resetInput = false;
        decBtn.disabled = true;
    });

    //Clr button
    const clrBtn = document.querySelector('#clr');
    clrBtn.addEventListener('click', () => {
        currentVal = 0;
        display.textContent = roundToDecimal(currentVal, DECIMAL_PLACES);
        operator = '';
        a = 0;
        b = 0;
        decBtn.disabled = false;
    });

    //Del button
    const delBtn = document.querySelector('#del');
    delBtn.addEventListener('click', () => {
        if (display.textContent !== '0' && isNumeric(display.textContent)) {
            currentVal = display.textContent.slice(0,-1);
            if (currentVal.length === 0) {
                currentVal = 0;
            }
            display.textContent = currentVal;
        }
    });
}

function roundToDecimal(x,d) {
    return Math.round(x * Math.pow(10,d)) / Math.pow(10,d);
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
    if (Number(b) === 0) {
        return "ERROR: DIVISION BY ZERO";
    }
    else {
        return Number(a) / Number(b);
    }
}

function operate(a, b, operator) {
    switch (operator) { //operator is assumed to be string
        case "+":
            return add(a,b);
        case "-":
            return subtract(a,b);
        case "x":
            return multiply(a,b);
        case "/":
            return divide(a,b);
    }
}

//reference: https://stackoverflow.com/questions/175739/how-can-i-check-if-a-string-is-a-valid-number
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function trimToLen(s, n) {
    return s.substring(0,n);
}