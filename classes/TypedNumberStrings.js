const RationalNumber = require('probility-rational-numbers');

class RatNumString {
    constructor(str) {
        this.str = str;
    }
    parse() {
        const nums = this.str.split("/")
        const newNum = new RationalNumber(nums[0], nums[1])
        if (newNum.valueOf() > 1) throw new Error("Rational numbers must not be over one.")
        return newNum
    }
}

class PercentString {
    constructor(str) {
        this.str = str
    }
    parse() {
        const asNum = this.str.split("%")[0] // Get rid of the percent with split("%") and get the value out of the array.
        if (asNum > 100) throw new Error("Cannot add more than 100%")
        // Handles percents with up to two decimal places.
        return new RationalNumber(asNum * 100, 10000).simplify()
    }
}

class WholeNumString {
    constructor(str) {
        this.str = str
    }
    parse() {
        return new RationalNumber(this.str, 1);
    }
}

module.exports = {WholeNumString, RatNumString, PercentString}