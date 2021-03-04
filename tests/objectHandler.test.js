const ObjectHandler = require('../classes/ObjectHandler')
const Probility = require('../classes/Probility')

test("ObjectHandler will init an array of objects", () => {
    expect(ObjectHandler.parseArray([{1: 1}, {2: 2}]).get(1).denominator).toBe(3)
})

// Init ratios mixed with percents

test("ObjectHandler will initialize objects correctly with mixed ratios and percents", () => {
    expect(ObjectHandler.parseArray([{"12.46%": "red"}, {"1254/10000": "blue"}, {"25/100": "pink"},
        {"1/4": "green"}, {"25%": "purple"}])
        .get("green").valueOf())
        .toBe(.25)
})

// init ratios

test("ObjectHandler will initialize objects correctly with only ratios", () => {
    expect(ObjectHandler.parseArray([{"1/4": "red"}, {"1/2": "blue"}, {"2/8": "green"}])
        .get("green").valueOf())
        .toBe(.25)
})


// init percents

test("ObjectHandler will initialize objects correctly that are only percents", () => {
    expect(ObjectHandler.parseArray([{"10%": "red"}, {"60%": "blue"}, {"15%": "green"}, {"15%": "yellow"}])
        .get("green").valueOf())
        .toBe(15 / 100)
})

// init w/ remainder

test("ObjectHandler will correctly determine remainder", () => {
    expect(ObjectHandler.parseArray([{"12%": 50}, {"15.5%": 60}, {"remainder": 70}]).get(70).valueOf())
        .toBe((100 - 12 - 15.5) / 100)
})

// throw an error for mixing whole numbers and ratios

test("ObjectHandler will throw an error when mixing whole numbers and ratios", () => {
    expect(() => ObjectHandler.parseArray([{"80": "red"}, {"10%": "blue"}]))
        .toThrow(/ratio/)
})

// throw an error for using remainder with whole numbers

test("ObjectHandler will throw an error for mixing whole numbers and remainders", () => {
    expect(() => ObjectHandler.parseArray([{"80": "red"}, {"remainder": "blue"}]))
        .toThrow(/Remainder/)
})

// throw an error when anything is negative

test("ObjectHandler will throw an error if any probabilities are negative", () => {
    expect(() => ObjectHandler.parseArray([{"-12%": "red"}, {"remainder": "blue"}]))
        .toThrow(/negative/)
})

// throw an error for probabilities larger than 1

test("ObjectHandler wll throw an error if the probabilities add up to more than one", () => {
    expect(() => ObjectHandler.parseArray([{"75%": "red"}, {"3/4": "blue"}]))
        .toThrow(/1/)
})
// Init a Probility instance correctly

test("Probility can initialize an array with objects correctly", () => {
    const x = new Probility([{"25%": "red"}, {"3/4": "blue"}], {parseArray: true, usePool: false})
    expect(x.singleChoiceProbability("blue").valueOf()).toBe(.75)
})

// Dealing with Zeros
test("Probability Instances with zero will not be added", () => {
    expect(new Probility([{"50%": 1}, {"0%": 2}, {"50%": 3}], {parseArray: true})
        .singleChoiceProbability(2).valueOf()).toBe(0);

    expect(new Probility([{"5": 1}, {"0": 2}, {"5": 3}], {parseArray: true})
        .singleChoiceProbability(2).valueOf()).toBe(0);

})