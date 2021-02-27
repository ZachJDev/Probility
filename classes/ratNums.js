const gcd = require("../functions/gcd")
const lcm = require("../functions/lcm")

module.exports = class RationalNumber {
    constructor(numerator, denominator = 1) {
        if (denominator === 0) throw new Error("Dividing by zero is undefined");
        if(numerator < 0 ? !(denominator < 0) : (denominator < 0)) { // XOR for negative rational numbers
            this.numerator = 0 - Math.abs(numerator);
        } else this.numerator = Math.abs(numerator);
        this.denominator = Math.abs(denominator);
    }
    toString() {
      return `${this.numerator} / ${this.denominator}`
    }
    valueOf () {
        return this.numerator / this.denominator;
    }
    simplify () {
        const greatestCommonDivisor = gcd(this.numerator, this.denominator);
        return new RationalNumber(this.numerator = this.numerator / greatestCommonDivisor,
            this.denominator = this.denominator / greatestCommonDivisor )
    }
    add(rationalNumber) {
        if(this.denominator === rationalNumber.denominator)
            return new RationalNumber(this.numerator + rationalNumber.numerator, this.denominator)
        if (rationalNumber.numerator === 0)
            return new RationalNumber(this.numerator, this.denominator);

        const factor = this.denominator * rationalNumber.denominator;
        const newNum = this.numerator * rationalNumber.denominator +
            rationalNumber.numerator * this.denominator;
        return new RationalNumber(newNum, factor)
    }
    multiply (rationalNumber){
        const newNum = this.numerator * rationalNumber.numerator;
        const newDenom = this.denominator * rationalNumber.denominator;
        return new RationalNumber(newNum, newDenom)
    }
    subtract(rationalNumber) {
        return this.add(rationalNumber.makeNegative());
    }

    divide(rationalNumber) {
        return this.multiply(rationalNumber.invert())
    }

    makeNegative() {
        return new RationalNumber(0 - this.numerator, this.denominator)
    }
    invert() {
        return new RationalNumber(this.denominator, this.numerator)
    }
    increment() {
        ++this.numerator;
        return this
    }
    newBase(num) {
       const factor = num / this.denominator
        if(!Number.isInteger(num)) throw new Error("Denominators must be whole numbers")
        const newNum = this.numerator * factor;
       const newDemon = this.denominator * factor;
       if(!Number.isInteger(newNum)) throw new Error("bases do not share a common factor")
        return new RationalNumber(this.numerator * factor, this.denominator * factor);
    }
}

