
const {RatNumString, PercentString, WholeNumString} = require('./TypedNumberStrings');

class TypeDeterminer {
    stringToTypedNum(str) {
        if (this.isRational(str)) {
            return new RatNumString(str);
        } else if (this.isPercent(str)) {
            return new PercentString(str);
        } else if (this.isWholeNumber(str)) {
            return new WholeNumString(str);
        }
    }

    isRational(key) {
        const rationalNumberRegEx = new RegExp(/^-?\d+ *\/ *-?\d+$/)
        return rationalNumberRegEx.test(key)
    }

    isPercent(key) {
        const percentRegEx = new RegExp(/^-?\d+.?\d{0,2}%$/)
        return percentRegEx.test(key)
    }

    isWholeNumber(key) {
        // Whole numbers are not handled well.
        const numberRegEx = new RegExp(/^-?\d+$/)
        return numberRegEx.test(key)
    }
    isRemainder(key) {
        return key.toLowerCase() === "remainder"
    }
}

module.exports = TypeDeterminer;