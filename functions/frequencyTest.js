const RationalNumber = require('../classes/ratNums')


module.exports = createFrequencyTest = (funct, n = 1000) => {
    const results = new Map()
    for(let i = 0; i < n; i++) {
        const x = funct()
        const val = results.get(x) ? results.get(x).increment() : new RationalNumber(1, n)
        results.set(x, val)

    }
    return results
}

