const screen = document.querySelector(".screen")
const buttons = document.querySelectorAll("button")

buttons.forEach((button) => {
    button.addEventListener ("click", displayToScreen);
});

function displayToScreen() {

    if (this.className == "equal") {
        //equal
    } else if (this.className == "clear") {
        //clear
    } else {
        screen.textContent = this.textContent;
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