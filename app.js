// function appendOperator(operator) {
//     if (typed !== 'Error') {
//         operation += typed + ' ' + operator + ' ';
//         typed = '';
//         updateDisplay();
//     }
// }

// function updateDisplay() {
//     const operationElement = document.querySelector('.calc-operation');
//     const typedElement = document.querySelector('.calc-typed');
//     operationElement.textContent = operation;
//     typedElement.textContent = typed;
// }

var blinkElements = document.getElementsByClassName("blink-me");

function blink() {
    for (var i = 0; i < blinkElements.length; i++) {
        blinkElements[i].classList.toggle("blink");
    }
}
setInterval(blink, 1000);


let operation = '';
let typed = '0';


        function updateDisplay() {
            const operationElement = document.querySelector('.calc-operation');
            const typedElement = document.querySelector('.calc-typed');
        
            // Remove repeated consecutive operators from the operation string
            const cleanedOperation = operation.replace(/([+\-*/%])+/g, '$1 ');
        
            operationElement.textContent = cleanedOperation;
            typedElement.textContent = typed;
        }
        

        function appendNumber(number) {
            if (typed === '0' || typed === 'Error') {
                typed = number.toString();
            } else {
                typed += number;
            }
            updateDisplay();
        }


        function appendDecimalPoint() {
            if (!typed.includes('.')) {
                typed += '.';
                updateDisplay();
            }
        }

        function clearDisplay() {
            operation = '';
            typed = '0';
            updateDisplay();
        }

        function clearEntry(){
            typed = typed.slice(0, -1);
            updateDisplay();
        }

        function calculateResult() {
            if (typed !== 'Error') {
                try {
                    const result = eval(operation + typed);
                    typed = result.toString();
                    operation = '';
                } catch (error) {
                    typed = 'Error';
                    operation = '';
                }
                updateDisplay();
            }
        }

        function appendOperator(operator) {
            if (typed !== 'Error') {
                // Check if the last character of the operation is an operator
                if (isOperator(operation.charAt(operation.length - 1))) {
                    // If the last character is an operator, do nothing
                    return;
                }
                
                operation += typed + ' ' + operator + ' ';
                typed = '';
                updateDisplay();
            }
        }

        function isOperator(char) {
            // Define a list of valid operators
            const operators = ['+', '-', '*', '/', '%'];
            // Check if the character is in the list of valid operators
            return operators.includes(char);
        }