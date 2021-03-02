const gcd = require('../functions/gcd')

test("gcd is found for two positive numbers", () => {
    expect(gcd(4, 6)).toBe(2)
})

test("gcd for two prime numbers is 1", () => {
    expect(gcd(7, 5)).toBe(1)
})

test("gcd of a number n and 0 is n", () => {
    expect(gcd(7, 0)).toBe(7)
})

test("gcd of 0 and 0 is 0", () => {
    expect(gcd(0, 0)).toBe(0)
})