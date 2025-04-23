const screen = document.getElementById('text-output');
const buttons = document.querySelectorAll('#input');
const equalTo = document.getElementById('equal-to');
const clear = document.getElementById('clear');
console.log(typeof 6/0);
console.log(`this is ${6/0}`);

let calculation = '';

let calculateStorage = JSON.parse(localStorage.getItem('calculation')) || '';

// console.log(calculateStorage);
getInput(input);
calculate();
clearStorage();


function getInput(input) {
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            
            input = `${button.textContent}`;

            calculation += input;

            localStorage.setItem('calculation', JSON.stringify(calculation));

            screen.textContent = calculation;

            console.log(calculation);
            // console.log(calculation);

            // return calculation
        });
    });
}

function calculate(){
    equalTo.addEventListener('click', () => {

        if (/\/\s*0/.test(calculation)) { // /\/\s*0/ is a regular expression that matches character / followed by zero or more whitespace characters and then a 0 to identify when a calculation is trying to divide a number by zero.
            screen.textContent = 'Number cannot be divided by zero'; 
        } else {
            try{
                // checks if calculation is empty after removing empty space with .trim(). if empty reassign calculation to be 0 and if not empty evaluate calculation
                calculation.trim() === '' ? calculate = 0 : calculate = eval(calculation);
                
                screen.textContent = calculate;
            }catch (error){ // catches any error in calculation and displays the result below
                screen.textContent = 'Invalid Calculation'; 
            }
        }

        // reduces font size of the displayed text if the length of the displayed text is more than 30 characters
        if (screen.textContent.length > 30 ){
            screen.style.fontSize = '20px';
        }
        
        // calls the clear storage function
        clearStorage();

    });
}




//clear storage
function clearStorage() {
    clear.addEventListener('click', () => {

        localStorage.clear();
        calculation = '';

        // localStorage.setItem('calculation', JSON.stringify(calculation));
        screen.textContent = '0';

});
}