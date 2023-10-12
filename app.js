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


// Listen for keydown events on the entire document
document.addEventListener("keydown", function(event) {
    const key = event.key;
    
    switch (key) {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            appendNumber(parseInt(key));
            break;
        case "+":
        case "-":
        case "*":
        case "/":
        case "%":
            appendOperator(key);
            break;
        case ".":
            appendDecimalPoint();
            break;
        case "Enter":
            calculateResult();
            break;
        case "Backspace":
            clearEntry();
            break;
    }
    
    // Prevent the default behavior for certain keys to avoid unwanted side effects
    if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "*", "/", "%", ".", "Enter", "Backspace"].includes(key)) {
        event.preventDefault();
    }
});
