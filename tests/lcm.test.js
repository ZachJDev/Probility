const lcm = require('../functions/lcm')


// Correct ways to call lcm()

test("There is no LCM of a set containing Zero", () => {
    expect(() => lcm(0, 1, 4, 6)).toThrowError(/zero/)
})

test("lcm() throws an error with if called with fewer than 2 arguments", () => {
    expect(() => lcm(1)).toThrowError(/one/)
})

// finds the correct answer

test("lcm() will find the least common multiple of an arbitrarily-sized set of numbers", () => {
    expect(lcm(6, 12, 24, 48, 36)).toBe(144)
})

test("lcm() of a number and a multiple of that number will be the multiple", () => {
    expect(lcm(6, 48)).toBe(48)
})