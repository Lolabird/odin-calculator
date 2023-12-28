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
    } else if (mainScreen.textContent.length < 8) {
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

    } else if (this.classList.contains("entry") && mainScreen.textContent !== "0") {
            if (/^[0-9.]+$/.test(mainScreen.textContent)) {
                mainScreen.textContent = mainScreen.textContent.slice(0, -1);
            } else {
                mainScreen.textContent = "";
            }

            if (mainScreen.textContent === "") {
                mainScreen.textContent = "0"
            }
    }
}


function changeSign() {
    let num = mainScreen.textContent;

    if (num === "0") {
        mainScreen.textContent = "-";
    } else if (num === "-") {
        mainScreen.textContent = "0";
    } else if (num.startsWith("-")) {
        mainScreen.textContent = num.substring(1);
    } else {
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
            return formatResult(a);
        }
        if (isNaN(a) || isNaN(b)) {
            return NaN;
        }
        if (!this.methods[op]) {
            return "Operation not supported."
        }

        let result = this.methods[op](a, b);
        return formatResult(result);
    };
}


function formatResult(result) {
    const resultStr = result.toString();
    const maxLength = 9; 
    
    if (resultStr.length > maxLength) {
        expoResult =  parseFloat(result).toExponential(maxLength - 6);
        return expoResult;
    } 

    return result;
}


function handleKeys(e) {
    const operators = {
        "+": "plus", 
        "-": "minus", 
        "*": "multiply", 
        "/": "divide"
    };

    let button;

    if (e.key >= 0 && e.key <= 9) {
        button = document.querySelector(`#num${e.key}`);
    } else if (e.key === ".") {
        button = document.querySelector("#dec");
    } else if (e.key === "Backspace" || e.key === "Delete") {
        button = document.querySelector(".entry");
    } else if (e.key === "c" || e.key === "C" || e.key === "Escape") {
        button = document.querySelector(".all");
    } else if (operators.hasOwnProperty(e.key)) {
        e.preventDefault();
        button = document.querySelector(`#${operators[e.key]}`);
    } else if (e.key === "=" || e.key === "Enter") {
        e.preventDefault();
        button = document.querySelector(".equal");
    } else if (e.key === "_") {
        button = document.querySelector(".plus-minus");
    }

    if (button) {
        button.classList.add("active");

        window.addEventListener("keyup", () => {
            button.classList.remove("active")
        });

        button.click();
    }
} 