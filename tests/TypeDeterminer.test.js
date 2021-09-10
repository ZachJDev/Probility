const TypeDeterminer = require('../classes/TypeDeterminer')

const typeDeterminer = new TypeDeterminer();

test("Rational Number strings are identified correctly", () => {
    expect(
        typeDeterminer.isRational('1/4')
    ).toBe(true)
})

test("Percent Number strings are identified correctly", () => {
    expect(
        typeDeterminer.isPercent('10%')
    ).toBe(true)
})

test("Whole Number strings are identified correctly", () => {
    expect(
        typeDeterminer.isWholeNumber('5')
    ).toBe(true)
})