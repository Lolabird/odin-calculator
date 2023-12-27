const screen = document.querySelector(".screen");
const buttons = document.querySelectorAll("button");
const operators = ["+", "-", "*", "/"];

buttons.forEach((button) => {
    button.addEventListener ("click", displayToScreen);
});


function displayToScreen() {

    if (this.className == "equal") {
        let calc = new Calculator;

        screen.textContent = calc.calculate(screen.textContent);
    } else if (this.className == "clear") {
        screen.textContent = "0";
    } else {
        if (this.className == "operator") {
            let screenContent = screen.textContent;

            for (let i = 0; i < screenContent.length; i++ ) {
                if (operators.includes(screenContent[i])) {
                    let calc = new Calculator;

                    result = calc.calculate(screen.textContent);
                    screen.textContent = result;
                    break;
                }
            } 

            screen.textContent += " " + this.textContent + " ";

        } else if (screen.textContent === "0" && this.className == "num") {
            screen.textContent = this.textContent;
        } else {
            screen.textContent += this.textContent;
        }
    }
}


function Calculator(str) {
    console.log("Calculator has been called")
    
    this.methods = {
        "-": (a, b) => (a - b),
        "+": (a, b) => (a + b), 
        "/": (a, b) => (a / b),
        "*": (a, b) => (a * b)
    };

    this.calculate = function(str) {
        let parts = str.split(" ");
        a = +parts[0];
        op = parts[1];
        b = +parts[2];

        if (isNaN(a) || isNaN(b)) {
            return NaN;
        }
        if (!this.methods[op]) {
            return "Operation not supported."
        }

        return this.methods[op](a, b);
    };
}