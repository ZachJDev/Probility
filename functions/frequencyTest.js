const RationalNumber = require('../classes/ratNums')


 const createFrequencyTest = (funct, n) => {
    const results = new Map()
    for (let i = 0; i < n; i++) {
        const x = funct()
        const val = results.get(x) ? results.get(x).increment() : new RationalNumber(1, n)
        results.set(x, val)

    }
    return results
}


module.exports = createFrequencyTest
