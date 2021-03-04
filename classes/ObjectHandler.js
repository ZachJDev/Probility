const RationalNumber = require('../classes/ratNums')

class ProbilityObjectHandler {
    constructor() {
        this.tempTotal = null // Used as a state variable to be accessed in methods. Will change on different calls.
    }

    parseArray(array, total) {
        this.tempTotal = total;
        const tempMap = new Map()
        let remainderVal = null

        for (let entry of array) {
            const key = Object.keys(entry)[0]
            const value = entry[key]
            // Handle remainders
            if (key === 'remainder') {
                if (!remainderVal)
                    remainderVal = value;
                else throw new Error("Only a single Remainder key can be processed")
            } else {

                const ratio = this.parseKey(key);
                if (ratio.isNegative) throw new Error(`values cannot have negative probabilities received ${key}`)
                if (!ratio.isZero)
                    tempMap.set(value, ratio)
            }
        }
        this.tempTotal = null; // reset tempTotal.
        return this.makeFinalMap(tempMap, remainderVal)
    }

    makeFinalMap(initialMap, remainderVal) {
        let normalBase; // will hold normalized base
        if (this.areAllWhole(initialMap)) {
            if (remainderVal !== null) throw new Error("Remainders cannot be used with whole Numbers.")
            normalBase = this.getBaseFromWholes(initialMap);
        } // adds whole numbers for new base
        else normalBase = RationalNumber.normalizeBases(...Array.from(initialMap.values())) // normalizes other bases

        const finalMap = new Map()
        let finalTest = new RationalNumber(0, normalBase) // will accumulate the total of all probabilities

        for (let entry of initialMap.entries()) {
            const key = entry[0]; // The 'choice'
            const value = entry[1]; // the ratio
            let newRatio; // will hold the new ratio for the final probability
            // Normalize whole numbers
            if (value.valueOf() >= 1) newRatio = new RationalNumber(value.numerator, normalBase)
            else newRatio = value.newBase(normalBase)

            finalTest = finalTest.add(newRatio)
            finalMap.set(key, newRatio)
        }
        // set the remainder to whatever is left over.
        const remainder = new RationalNumber(normalBase, normalBase).subtract(finalTest)
        if (remainderVal) finalMap.set(remainderVal, remainder)

        if (this.isTotalWhole(finalMap, normalBase)) return finalMap
        else throw new Error("Total of all ratios does not equal 1.")
    }

    parseKey(key) {
        if (this.keyIsNumber(key)) {
            return this.parseNumber(key)
        } else if (this.keyIsPercent(key)) {
            return this.parsePercent(key)
        } else if (this.keyIsRationalNumber(key)) {
            return this.parseRationalNumber(key)
        } else if (this.keyIsRemainder(key)) {
            return "remainder"
        } else throw new Error(`Unrecognized format in '${key}'. Enter a percent with fewer than three decimal points, fraction, whole number, or 'Remainder'.`)
    }

    keyIsNumber(key) {
        // Whole numbers are not handled well.
        const numberRegEx = new RegExp(/^-?\d+$/)
        return numberRegEx.test(key)
    }

    keyIsRationalNumber(key) {
        const rationalNumberRegEx = new RegExp(/^-?\d+ *\/ *-?\d+$/)
        return rationalNumberRegEx.test(key)
    }

    keyIsRemainder(key) {
        return key.toLowerCase() === "remainder"
    }

    keyIsPercent(key) {
        const percentRegEx = new RegExp(/^-?\d+.?\d{0,2}%$/)
        return percentRegEx.test(key)
    }

    parseNumber(num) {
        return new RationalNumber(num, 1);
    }

    parsePercent(num) {
        const asNum = num.split("%")[0] // Get rid of the percent with split("%") and get the value out of the array.
        if (asNum > 100) throw new Error("Cannot add more than 100%")
        // Handles percents with up to two decimal places.
        return new RationalNumber(asNum * 100, 10000).simplify().newBase(this.tempTotal)

    }

    parseRationalNumber(ratNum) {
        const nums = ratNum.split("/")
        const newNum = new RationalNumber(nums[0], nums[1]).newBase(this.tempTotal)
        if (newNum.valueOf() > 1) throw new Error("Rational numbers must not be over one.")
        return newNum

    }

    areAllWhole(map) { // Bad name?
        // Whole numbers and ratios/percents cannot be mixed.
        let hasWholeNumber = false  // assume no whole numbers
        for (let value of map.values()) {
            if (value.isWhole) hasWholeNumber = true; // Set hasWhole if a number has a denom of 1
            // Below checks for mixed wholes and ratios
            else if (!value.isWhole && hasWholeNumber) throw new Error("Cannot mix Whole numbers and ratios in a collection")
        }
        return hasWholeNumber;
    }

    getBaseFromWholes(map) {
        // Add the numerators together to find the total, assuming all are whole numbers.
        return Array.from(map.values()).reduce((prev, cur) => prev + cur.numerator, 0)
    }

    isTotalWhole(map, normalBase) { // Not sure if this is a good pattern -- either returns true or throws an error.
        let testRatNum = new RationalNumber(0, normalBase); // hold a new rational number
        for (let ratNum of map.values()) {
            testRatNum = testRatNum.add(ratNum); // add all the rational numbers together.
            if (ratNum.valueOf() < 0) // I kinda like allowing 0-probability options, but I don't think it makes sense.
                throw new Error("cannot have negative or zero probabilities.")
        }
        if (testRatNum.valueOf() !== 1) // make sure the probability stays at one.
            throw new Error("total of all probabilities must equal 1.")
        return true;
    }

}

module.exports = new ProbilityObjectHandler()






