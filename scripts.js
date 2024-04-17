let a = 0
let b = 0;
let operator;
let currentVal = 0;
let resetInput = true; // if true, the next number input will replace the current number being displayed.
const DECIMAL_PLACES = 6;
const OVERFLOW_LIMIT = 8; //amount of characters thatn can be input

let display = document.querySelector('#display');
init();


//Bug: can't do 0.000000

//Todo 3: clean up code (don't take too long on this... as per odin proj recommendations)
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
                if (display.textContent !== '0' && display.textContent.length <= OVERFLOW_LIMIT) {
                    console.log('determining current val...');
                    currentVal = ( (currentVal === 0 || resetInput === true) && (display.textContent !== '.') ) ? num.textContent : String(currentVal).concat(num.textContent);
                    resetInput = false;
                    display.textContent = currentVal;
                }
            });
        }
        else {
            num.addEventListener('click', () => {
                if (display.textContent.length <= OVERFLOW_LIMIT) {
                    currentVal = ( (currentVal === 0 || resetInput === true) && (display.textContent !== '.') ) ? num.textContent : String(currentVal).concat(num.textContent);
                    resetInput = false;
                    display.textContent = currentVal;
                }
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
        currentVal = resetInput ? '0.' : String(currentVal).concat('.');
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