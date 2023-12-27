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