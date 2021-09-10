const RationalNumber = require('probility-rational-numbers')
const TypeDeterminer = require('./TypeDeterminer');


class ProbilityObjectHandler {
    constructor() {
        this.tempTotal = null // Used as a state variable to be accessed in methods. Will change on different calls.
    }

    parseArray(array, total) {
        this.tempTotal = total;
        const tempMap = new Map()
        let remainderVal;
        let remainderSet = false; //seperated from val to allow for the remainder value to be a falsy value.

        for (let entry of array) {
            const key = Object.keys(entry)[0] // ignore anything but the first key
            const value = entry[key]
            // Handle remainders
            if (key === 'remainder') {
                if (!remainderSet) {
                    remainderSet = true;
                    remainderVal = value;
                }
                else throw new Error("Only a single Remainder key can be processed")
            } else {
                const interRatio = new TypeDeterminer().stringToTypedNum(key)
                const ratio = interRatio.parse().newBase(this.tempTotal)
                if (ratio.isNegative) throw new Error(`values cannot have negative probabilities received ${key}`)
                if (!ratio.isZero)
                    tempMap.set(value, ratio)
            }
        }
        this.tempTotal = null; // reset tempTotal.
        return this.makeFinalMap(tempMap, remainderVal, remainderSet)
    }

    makeFinalMap(initialMap, remainderVal, remainderSet) {
        let normalBase; // will hold normalized base
        if (this.areAllWhole(initialMap)) {
            if (remainderVal !== undefined) {
                throw new Error('Remainders cannot be used with whole Numbers.');
            }
            normalBase = this.getBaseFromWholes(initialMap); // a better designed system would have a single method to normalize bases, regardless of type.
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
        if (remainderSet) finalMap.set(remainderVal, remainder)

        if (this.isTotalWhole(finalMap, normalBase)) return finalMap
        else throw new Error("Total of all ratios does not equal 1.")
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






