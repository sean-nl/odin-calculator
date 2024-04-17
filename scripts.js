let a = 0
let b = 0;
let operator;
let currentVal = 0;
let resetInput = true; // if true, the next number input will replace the current number being displayed.
const DECIMAL_PLACES = 6;

let display = document.querySelector('#display');
init();

//Todo 2.0: display error when dividing by 0. DONE.

//Todo 3: the operator reset issue
//once "equal" has been hit, pressing more buttons does not reset the display, but adds more vals.
//this to be fixed.

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
                if (Number(display.textContent) !== 0) {
                    currentVal = ( currentVal === 0 ) ? num.textContent : Number(String(currentVal).concat(num.textContent));
                    resetInput = false;
                    display.textContent = roundToDecimal(currentVal, DECIMAL_PLACES);
                }
            });
        }
        else {
            num.addEventListener('click', () => {
                currentVal = ( currentVal === 0 || resetInput === true) ? num.textContent : Number(String(currentVal).concat(num.textContent));
                resetInput = false;
                display.textContent = roundToDecimal(currentVal, DECIMAL_PLACES);
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
            }
    });

    //Decimal button
    const decBtn = document.querySelector('#decimal');
    decBtn.addEventListener('click', () => {
        currentVal = String(currentVal).concat('.');
        display.textContent = currentVal;
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