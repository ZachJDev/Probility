// Euclid's Algorithm: https://en.wikipedia.org/wiki/Greatest_common_divisor#Euclid's_algorithm
const gcd = (...args) => {
    const findGcd = (a, b) => {
        if (b === 0) return a;
        return findGcd(b, a % b);
    }
    return args.reduce((acc, cur) => findGcd(acc, cur), 0)
}

module.exports = gcd;
