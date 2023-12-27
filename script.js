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
    } else if (this.classList.contains("all")) {
        screen.textContent = "0";
    } else if (this.classList.contains("error") && screen.textContent !== "0") {
            screen.textContent = screen.textContent.trimEnd()
            screen.textContent = screen.textContent.slice(0, -1);

            if (!isNaN(screen.textContent.charAt(-2))) {
            screen.textContent = screen.textContent.trimEnd()
        }
    } else {
        if (this.className == "operator") {
            let screenContent = screen.textContent;

            // Add some logic for handling negatives with -
            // Add key support
            //limit character size in screen

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


function addDecimals(a, b) {
    a = String(a);
    b = String(b);

    const adec = (a.split(".")[1] || "").length;
    const bdec = (b.split(".")[1] || "").length;
    const maxDec = Math.max(adec, bdec);
    let divdec = "1";
    divdec = divdec.padEnd(maxDec, "0");

    return ((+a * divdec + +b * divdec) / divdec).toFixed(maxDec); 
}


function multiplyDecimals(a, b) {
    a = String(a);
    b = String(b);

    const adec = (a.split(".")[1] || "").length;
    const bdec = (b.split(".")[1] || "").length;
    const totalDec = adec + bdec;
    
    return (a * b).toFixed(totalDec)
}


function divideDecimals(a, b) {
    a = String(a);
    b = String(b);

    const adec = (a.split(".")[1] || "").length;
    const bdec = (b.split(".")[1] || "").length;
    const maxDec = Math.max(adec, bdec);
    const divisor = Math.pow(10, maxDec);
   
    return(a * divisor) / (b * divisor);
}


function Calculator(str) {
    console.log("Calculator has been called")
    
    this.methods = {
        "-": (a, b) => addDecimals(a, -b),
        "+": (a, b) => addDecimals(a, b), 
        "/": (a, b) => divideDecimals(a, b),
        "*": (a, b) => multiplyDecimals(a, b)
    };

    this.calculate = function(str) {
        let parts = str.split(" ");
        a = +parts[0];
        op = parts[1];
        b = +parts[2];


        if (a && !b) {
            return a;
        }
        if (isNaN(a) || isNaN(b)) {
            return NaN;
        }
        if (!this.methods[op]) {
            return "Operation not supported."
        }
        return this.methods[op](a, b);
    };
}