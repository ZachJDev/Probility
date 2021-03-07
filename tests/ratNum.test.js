const RationalNumber = require('../classes/ratNums')

const x = new RationalNumber(31, 948);
const y = new RationalNumber(511, 1937);

// Construction

test("Numbers are not automatically simplified", () => {
    expect(new RationalNumber(2, 4).toString()).toBe("2 / 4")
})

test("0 as a denominator will throw an error", () => {
    expect(() => new RationalNumber(1, 0)).toThrow(/zero/)
})

test("the numerator will be negative if only the supplied numerator is negative", () => {
    expect(new RationalNumber(-2, 4).toString()).toBe("-2 / 4")
})

test("Only the numerator will be negative if the only the supplied denominator is negative", () => {
    expect(new RationalNumber(2, -4).toString()).toBe("-2 / 4")
})

test("The number will be positive if both the supplied numerator and supplied denominator are negative", () => {
    expect(new RationalNumber(-2, -4).toString()).toBe("2 / 4")
})

// Adding

test("Rational Numbers are Added correctly", () => {
    expect(x.add(y).toString()).toBe("544475 / 1836276")
})

test("Numbers with the same denominator will keep that denominator", () => {
    const quarter = new RationalNumber(1, 4)
    expect(quarter.add(quarter).toString()).toBe("2 / 4")
})

test("Adding a number to zero will return the same number", () => {
    expect(new RationalNumber(1, 2).add(new RationalNumber(0, 1999)).toString()).toBe("1 / 2")
})

// Subtracting

test("Rational Numbers are Subtracted correctly", () => {
    expect(x.subtract(y).toString()).toBe("-424381 / 1836276")
})


// Multiplication

test("Multiplying by zero results in zero", () => {
    expect(new RationalNumber(1, 2).multiply(new RationalNumber(0, 2)).toString()).toBe("0 / 4")
})

test("Multiplying by one results in the same number with a modified denominator", () => {
    expect(new RationalNumber(1, 2).multiply(new RationalNumber(2, 2)).toString()).toBe("2 / 4")
})

// Division

test("Division works correctly", () => {
    expect(new RationalNumber(1, 2).divide(new RationalNumber(1, 2)).toString()).toBe("2 / 2")
})

test("Division by zero will throw an error", () => {
    expect(() => x.divide(new RationalNumber(0, 4))).toThrowError(/zero/)
})


// Inverting

test("Inverting a number will switch its numerator and denominator", () => {
    expect(new RationalNumber(1, 2).invert().toString()).toBe("2 / 1")
})

test('Inverting 0 will throw an error', () => {
    expect(() => new RationalNumber(0, 9).invert()).toThrowError(/zero/)
})

// Simplifying

test("numbers in which the numerator and denominator share a common factor are simplified", () => {
    expect(new RationalNumber(14, 49).simplify().toString()).toBe("2 / 7")
})

test("whole numbers are simplified to be 1 / 1", () => {
    expect(new RationalNumber(6, 6).simplify().toString()).toBe("1 / 1")
})

test("numbers in which the numerator and denominator do not share a common factor are not simplified", () => {
    expect(new RationalNumber(59, 131).simplify().toString()).toBe("59 / 131")
})

// Convert Bases

test("Rational Numbers can be converted to larger bases", () => {
    expect(new RationalNumber(1, 2).newBase(4).toString()).toBe("2 / 4")
})

test("Rational Numbers can be converted to smaller bases", () => {
    expect(new RationalNumber(2, 4).newBase(2).toString()).toBe("1 / 2")
})

test("Rational Numbers cannot be converted to bases that would make the numerator non-whole", () => {
    expect(() => new RationalNumber(1, 2).newBase(3).toString()).toThrowError()
})

test("Throws an Error when new base is not a whole number", () => {
    expect(() => x.newBase(.5)).toThrowError()
})



