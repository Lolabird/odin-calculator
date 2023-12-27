const screen = document.querySelector(".screen");
const buttons = document.querySelectorAll("button");
const operators = ["+", "-", "*", "/"];

buttons.forEach((button) => {
    button.addEventListener ("click", displayToScreen);
});

function displayToScreen() {

    if (this.className == "equal") {
        //equal
    } else if (this.className == "clear") {
        //clear´
    } else {
        let screenContent = screen.textContent;

        if (this.className == "operator") {
            for (let i = 0; i < screenContent.length; i++ ) {
                if (operators.includes(screenContent[i])) {
                    //call calculator
                    console.log("An operator was pressed again")
                    break;
                }
            }
        }

        screen.textContent += this.textContent;
        console.log("A button was pressed")
    }

}

function Calculator(str) {

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