/**
 * Creates a new map from a sourceMap containing values and RationalNumbers,
 * converts the Rational Number to a string, and sorts and console.table()s it, if desired.
 * @param {Map<any, RationalNumber>} sourceMap
 * @param sort
 * @param toTable
 * @returns {void|Map<any, any>}
 */
const createTable = (sourceMap, sort = false, toTable = true) => {
    const results = new Map();
    Array.from(sourceMap.entries()).sort((a, b) => {
        if(sort) return a[1].valueOf() - b[1].valueOf() // Only sort if specified.
        else return a
    }).forEach(pair => {
        results.set(pair[0], pair[1].toString())
    })
    return toTable ? console.table(results) : results
}

module.exports = createTable