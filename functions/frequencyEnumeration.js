const RationalNumber = require('../classes/ratNums')

/**
 * Enumerates the results of a given function, which should return an array. Written to be used the .enumerate()
 * method of a Probility instance. Returns a Mapping of a value to a Rational Number object.
 * @param funct
 * @returns {Map<any, RationalNumber>}
 */
frequencyEnumeration = (funct) => {
    const results = new Map();
        const array = funct();
        const totalNumber = array.length;
            array.forEach(val => {
            results.get(val) ?
                results.get(val).increment() :
                results.set(val, new RationalNumber(1, totalNumber));
        })
    return results
}
module.exports = frequencyEnumeration
