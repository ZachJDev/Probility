const createFrequencyTest = require('../functions/frequencyTest')
const Probility = require('../classes/Probility')

const onlyOne = new Probility([1])

test("A frequency chart with One Option will record all of the outcomes for that option", () => {
    expect(
        createFrequencyTest(() => onlyOne.choose(), 1000).get(1).toString()
    ).toBe("1000 / 1000")
})