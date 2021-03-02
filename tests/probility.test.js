const Probility = require('../classes/Probility')

// Total Choices

const onlyOne = new Probility([1])

test("numTotalChoices of a 1 / 1 chance is 1", () => {
    expect(onlyOne.numTotalChoices).toBe(1)
})

const onlyOnes = new Probility([1, 1, 1, 1, 1])

test("numTotalChoices of a a single repeated option will be the number of times it repeats", () => {
    expect(onlyOnes.numTotalChoices).toBe(5)
})

// NumUniqueChoices

const uniqueTest = new Probility([1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8])

test("numUniqueChoices will return the number of unique choices", () => {
    expect(uniqueTest.numUniqueChoices).toBe(8)
})

// possibleChoices

test("possibleChoices returns an array of the unique choices", () => {
    expect(uniqueTest.possibleChoices).toEqual([1, 2, 3, 4, 5, 6, 7, 8])
})

// initArray


// initObject


// initPool

test("When the Probility instance is constructed with an array, the pool will contain the same array from the constructor", () => {
    expect(uniqueTest.pool).toEqual([1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8])
})

test("The pool length will be the same as numTotalChoices after initialization", () => {
    expect(uniqueTest.pool.length).toEqual(uniqueTest.numTotalChoices)
})

// choose

test("choose() will return a random item from the possible choices", () => {
    expect(uniqueTest.choose()).toEqual(expect.anything())
    1
})


// chooseFromPool

// add

const addTest = new Probility([1])

test("add() adds a new choice", () => {
    expect(addTest.add(1, 1).numTotalChoices).toBe(2)
})

test("add() can add new choices", () => {
    expect(addTest.add(2, 1).probabilityOf(val => val === 2).toString()).toBe("1 / 3")
})

test("add() can add more instances of other choices", () => {
    expect(addTest.add(2, 3).probabilityOf(val => val === 2).toString()).toBe("4 / 6")
})

const addPoolTest = new Probility([1])

test("add() will affect the size of the pool", () => {
    addPoolTest.addOne(2)
    expect(addPoolTest.pool.length).toBe(2)
})

test("add() will affect the possibleChoices getter", () => {
    expect(addPoolTest.possibleChoices.length).toBe(2)
})


test("pool length and numTotalChoices will be equal after an add()", () => {
    addPoolTest.add(15, 100)
    expect(addPoolTest.pool.length).toEqual(addPoolTest.numTotalChoices)
})

// addOne

test("addOne() is a special case of add() that behaves in the same way but always adds a single object", () => {
    expect(addTest.addOne(3).numTotalChoices).toBe(7)
})


// Remove

test("remove works normally for objects", () => {
    let test = new Probility([{name: "Zach"}, {name: "Bob"}, {name: "Alice"}])
    expect(test.remove(val => val.name === "Zach").numUniqueChoices).toBe(2)
})

test("remove works as expected for functions", () => {
    let test = new Probility([(val) => val + 1, (val) => val + 2, (val) => val + 3])
    expect(test.remove(val => val(1) === 2).numUniqueChoices).toBe(2)
})

test("remove a function with a limit over 1:", () => {
    let test = new Probility([(val) => val + 1, (val) => val + 2, (val) => val + 3])
    expect(test.remove(val => val(1) > 2, 2).numUniqueChoices).toBe(1)
})

test("remove will affect the number of unique choices", () => {
    let removeTest = new Probility([1, 2, 3])
    expect(removeTest.remove(val => val === 3).numUniqueChoices).toBe(2)
})

test("remove will affect the number of possible choices", () => {
    const removeTest = new Probility([1, 2, 3])
    expect(removeTest.remove((val) => val === 2).numTotalChoices).toBe(2)
})

test("remove affects the size of the pool", () => {
    const removeTest = new Probility([1, 2, 3])
    expect(removeTest.remove(val => val === 2).pool.length).toBe(2)
})

test("remove() will only remove the specified number of items from a collection", () => {
    const removeTest = new Probility([1, 2, 3, 3, 3, 3, 3])
    expect(removeTest.remove(val => val === 3, 2).singleChoiceProbability(3).toString()).toBe("3 / 5")
})

test("numTotalChoices and the pool length will be consistent with the number of items removed, not the given limit", () => {
    const removeTest = new Probility([1, 2, 3])
    removeTest.remove(val => val === 3, 1000)
    expect(removeTest.numTotalChoices === removeTest.pool.length &&
        removeTest.pool.length === 2).toBe(true)
})


// SingleChoiceProbability

test("singleChoiceProbability will return 0 for a choice not in the collection", () => {
    const test = new Probility([1, 2, 3])
    expect(test.singleChoiceProbability(4).toString()).toBe("0 / 3")
})

// listAllProbabilities

test("listAllProbabilities() returns a map of the probability of each object being the next choice from the current state", () => {
    expect(Array.from(addTest.listAllProbabilities().entries())).toEqual([[1, "2 / 7"], [2, "4 / 7"], [3, "1 / 7"]])
})

// probabilityOf

test("probabilityOf() will return a rational number representation of the given predicate function to be true", () => {
    const firstTen = new Probility([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    expect(firstTen.probabilityOf(val => val % 2 === 0).toString()).toBe("5 / 10")
})

// getRandomChoice


// getRandomNumber


// enumerate
