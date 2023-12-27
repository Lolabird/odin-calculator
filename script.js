const mainScreen = document.querySelector(".main-screen");
const buttons = document.querySelectorAll("button");
const operators = ["+", "-", "*", "/"];

buttons.forEach((button) => {
    button.addEventListener ("click", displayToScreen);
});


function displayToScreen() {
    if (this.className == "equal") {
        let calc = new Calculator;

        mainScreen.textContent = calc.calculate(mainScreen.textContent);
    } else if (this.classList.contains("all")) {
        mainScreen.textContent = "0";
    } else if (this.classList.contains("error") && mainScreen.textContent !== "0") {
            mainScreen.textContent = mainScreen.textContent.trimEnd()
            mainScreen.textContent = mainScreen.textContent.slice(0, -1);

            if (!isNaN(mainScreen.textContent.charAt(-2))) {
                 mainScreen.textContent = mainScreen.textContent.trimEnd()
            }

            if (mainScreen.textContent === "") {
                mainScreen.textContent = "0"
            }
    } else {
        if (this.className == "operator") {
            let screenContent = mainScreen.textContent;

            // Add some logic for handling negatives with -
            // Add key support
            // limit character size in mainScreen -- first step is to move numbers from the main mainScreen to somewhere else every time a new operator is used and then change what gets sent to the calculator to that new location

            for (let i = 0; i < screenContent.length; i++ ) {
                if (operators.includes(screenContent[i])) {
                    let calc = new Calculator;

                    result = calc.calculate(mainScreen.textContent);
                    mainScreen.textContent = result;
                    break;
                }
            } 

            mainScreen.textContent += " " + this.textContent + " ";

        } else if (mainScreen.textContent === "0" && this.className == "num") {
            mainScreen.textContent = this.textContent;
        } else if (this.className == "num") {
            mainScreen.textContent += this.textContent;
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


        if ((a || a == "0") && !b) {
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