const mainScreen = document.querySelector(".main-screen");
const topScreen = document.querySelector(".top-screen");
const numButtons = document.querySelectorAll(".num");
const equalButton = document.querySelector(".equal");
const opButtons = document.querySelectorAll(".operator");
const clearButtons = document.querySelectorAll(".clear");
const plusMinus = document.querySelector(".plus-minus");
let inOps = false;
let isEval = false;


numButtons.forEach((button) => {
    button.addEventListener("click", displayNum);
});
opButtons.forEach((button) => {
    button.addEventListener("click", displayOperator);
});
clearButtons.forEach((button) => {
    button.addEventListener("click", clear);
});
equalButton.addEventListener("click", displayEval);
plusMinus.addEventListener("click", changeSign);
window.addEventListener("keydown", handleKeys);


function displayEval() {
    let calc = new Calculator;
    let result = 0

    if (topScreen.textContent === "0" || !inOps) {
        result = calc.calculate(mainScreen.textContent);
    } else {
        topScreen.textContent += mainScreen.textContent;
        console.log("main: " + mainScreen.textContent);
        result = calc.calculate(topScreen.textContent);
    }

    mainScreen.textContent = result;
    inOps = false;
    isEval = true;
}


function displayOperator() {
    let result = 0
    let operator = this.textContent;

    if (operator == "-" && (isNaN(mainScreen.textContent) || mainScreen.textContent == "0")) {
        console.log("Entering changeSign");
        changeSign();
        return;
    }

    if (topScreen.textContent == "" || !inOps) {
        topScreen.textContent = mainScreen.textContent + " " + this.textContent + " "; 
    } else {
        let calc = new Calculator;

        topScreen.textContent += mainScreen.textContent;
        result = calc.calculate(topScreen.textContent);

        topScreen.textContent = result + " " + this.textContent + " ";
    }

    mainScreen.textContent = 0;
    inOps = true;
    isEval = false;
}


function displayNum() {
    if (mainScreen.textContent == "0" || isEval) {
        mainScreen.textContent = this.textContent;
    } else {
        mainScreen.textContent += this.textContent;
    }

    if (isEval) {
        topScreen.textContent = "";
    }

    isEval = false;
}


function clear() {
    if (this.classList.contains("all")) {
        mainScreen.textContent = "0";
        topScreen.textContent = "";

    } else if (this.classList.contains("error") && mainScreen.textContent !== "0") {
            mainScreen.textContent = mainScreen.textContent.trimEnd()
            mainScreen.textContent = mainScreen.textContent.slice(0, -1);

            if (!isNaN(mainScreen.textContent.charAt(-2))) {
                 mainScreen.textContent = mainScreen.textContent.trimEnd()
            }

            if (mainScreen.textContent === "") {
                mainScreen.textContent = "0"
            }
    }
}


function changeSign() {
    let num = mainScreen.textContent;

    if (num === "0") {
        // Replace 0 with the negative sign
        mainScreen.textContent = "-";
    } else if (num === "-") {
        // If already negative, reset to 0
        mainScreen.textContent = "0";
    } else if (num.startsWith("-")) {
        // If the number is negative, remove the negative sign
        mainScreen.textContent = num.substring(1);
    } else {
        // Toggle the sign for positive numbers
        mainScreen.textContent = `-${num}`;
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
    isEval = true;
    
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


        if ((a || a == "0") && !op && !b) {
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


function handleKeys(e) {
    const operators = {
        "+": "plus", 
        "-": "minus", 
        "*": "multiply", 
        "/": "divide"
    };


    if (e.key >= 0 && e.key <= 9) {
        document.querySelector(`#num${e.key}`).click();
    } else if (e.key === ".") {
        document.querySelector("#dec").click();
    } else if (e.key === "Backspace" || e.key === "Delete") {
        document.querySelector(".error").click();
    } else if (e.key === "c" || e.key === "Escape") {
        document.querySelector(".all").click();
    } else if (operators.hasOwnProperty(e.key)) {
        e.preventDefault();
        document.querySelector(`#${operators[e.key]}`).click();
    } else if (e.key === "=" || e.key === "Enter") {
        e.preventDefault();
        document.querySelector(".equal").click();
    } else if (e.key === "_") {
        document.querySelector(".plus-minus").click();
    }
} 