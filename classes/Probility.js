const ProbabilitiyCollection = require('./ProbabilityCollection')
const RationalNumber = require('./ratNums')
const objectHandler = require("./ObjectHandler")

/**
 * The base Probility class. Represents a collection of things.
 * @param {array} choices - an array of the possible choices.
 * @constructor
 */
class Probility {
    constructor(choices = [], options) {
        this.choices = new Map()

        this.options = {
            parseArray: options?.parseArray ?? false,
            usePool: options?.usePool ?? true,
            total: options?.total // if total isn't specified, keep it null.
        }

        if (this.options.parseArray) {
            this.initObject(objectHandler.parseArray(choices, this.options.total))
        } else this.initArray(choices)

        if (this.options.usePool) this.initPool()

    }

    /** Returns the number of unique choices in a Probility collection */
    get numUniqueChoices() {
        return new Set(this.possibleChoices).size
    }

    /** Returns an array of every unique choice in a Probility collection */
    get possibleChoices() {
        return Array.from(this.choices.keys())
    }

    /** The number of total choices in a Probility collection. I.e. the sum of the total number of occurences of
     * each unique choice
     * */
    get numTotalChoices() {
        // Iterates over all of the items in the collection.
        // Probably a bit slower than modifying a property directly when adding / removing items,
        // But a lot easier to maintain.
        return Array.from(this.choices.values(), (value) => value.totalNumber)
            .reduce((acc, cur) => acc + cur, 0)
    }

    static copyChoices(probility) {
        if (!probility instanceof Probility) throw new Error(`expected probility to be instance of Probility`)
        return new Probility(probility.pool);
    }

    /**
     * Initializes a new Probility collection from an Array.
     * @Private
     * @param choices
     */
    initArray(choices) {
        choices.forEach(choice => {
            this.addOne(choice)
        })

    }

    /**
     * Initializes a new Probility collection from an object.
     *
     * @Private
     * @param choices
     */
    initObject(choices) {
        //
        // TODO: add method for initializing an object
        for (let choice of choices) {
            let value = choice[0];
            let numberOf = choice[1].numerator
            this.add(value, numberOf)
        }

    }

    /**
     * Initializes a pool of each possible choice in a collection.
     * @private
     */
    initPool() {
        this.pool = [];
        for (let choice of this.choices) {
            for (let i = 0; i < choice[1].totalNumber; i++) this.pool.push(choice[0])
        }
    }

    /**
     * Gives a simple abstraction of the two choose methodsand returns the one that will work with the options
     * @returns {*}
     */

    choose() {
        if(this.options.usePool)
            return this.chooseFromPool()
        return this.chooseWithSample()
    }

    /**
     * Chooses a random object from the unique choices, and picks a random number between 0 and 1.
     * If the random number is lower than the probability of the chosen object, it returns the object.
     * If not, it runs the algorithm again. Usually slower than the .chooseFromPool(), but does not rely on the
     * pool array.
     * @returns {any}
     */
    chooseWithSample() {
        if (this.numTotalChoices <= 0) throw new Error("No choices remain")
        while (true) {
            const choice = this.getRandomChoice()
            const p = this.singleChoiceProbability(choice).valueOf()
                .valueOf() // Probability of choosing `choice`
            const r = Math.random(); // a random number between 0 and 1
            if (r < p) return this.choices.get(choice).value
        }
    }

    /**
     * Chooses a random object from the pool, an array of every discrete object in the collection. Not usable if
     * the usePool option is set to false.
     * @returns {*}
     */
    chooseFromPool() {
        if (!this.options.usePool) throw new Error("Cannot call chooseFromPool() if the usePool option was set to false." +
            "to use chooseFromPool, instantiate a new Probility with the usePool option set to true.")
        return this.pool[this.getRandomNumberFromTotal()]
    }

    /**
     * Adds num copies of choice to the collection. If the choice is not in the collection, it will add a new choice.
     * @param choice
     * @param num
     * @returns {Probility}
     */
    add(choice, num) {
        if (num > 0) {
            this.choices.get(choice) ? this.choices.get(choice).increment(num) :
                this.choices.set(choice, new ProbabilitiyCollection(choice, num))
            if (this.options.usePool) this.initPool()
        }
        return this
    }

    /**
     * Adds a single choice to the collection.
     * @param choice
     * @returns {Probility}
     */
    addOne(choice) {
        return this.add(choice, 1)
    }

    /**
     * Iterates over the choices in a collection and compares each value using a predicate function. Removes
     * a number of items up to the given limit.
     * @param {function} predicate
     * @param limit
     * @returns {Probility}
     */
    remove(predicate, limit = 1) {
        const newChoices = new Map();
        Array.from(this.choices.keys()).forEach((key) => {
            if (!predicate(key) || limit <= 0) newChoices.set(key, this.choices.get(key))
            else { // when we do match the predicate
                let match = this.choices.get(key)
                if (match.totalNumber > limit) {
                    match.totalNumber -= limit
                    newChoices.set(key, match)
                    limit = 0;
                } else {
                    limit -= match.totalNumber
                }
            }
        })
        this.choices = newChoices
        this.initPool()
        return this
    }

    /**
     * Returns a new map of the probability of each unique item in the collection.
     * @returns {Map<any, string>}
     */
    listAllProbabilities() {
        const results = new Map()
        this.possibleChoices.forEach(choice => {
            const prob = new RationalNumber(this.choices.get(choice).totalNumber, this.numTotalChoices).toString()
            results.set(choice, prob)
        })
        return results
    }

    /**
     * Returns a new Rational Number representing the probability choice being chosen from the collection.
     * @param choice
     * @returns {module.RationalNumber}
     */
    singleChoiceProbability(choice) {
        const total = this.choices.get(choice)?.totalNumber || 0
        return new RationalNumber(total, this.numTotalChoices)
    }

    /**
     * Iterates over the collection and returns a Rational Number representing the total number of choices
     * that are true for the given predicate function.
     * @param {function} predicate
     * @returns {module.RationalNumber}
     */
    probabilityOf(predicate) {
        let total = 0;
        this.choices.forEach(val => {
            if (predicate(val.value)) total += val.totalNumber
        })
        return new RationalNumber(
            total,
            this.numTotalChoices)
    }

    /**
     * Returns a random choice from the collection of unique choices in the collection.
     * @Private
     * @returns {any}
     */
    getRandomChoice() {
        return this.possibleChoices[this.getRandomNumberFromUnique()]
    }

    /**
     * Returns a random number between 0 and the total number of all choices in the collection.
     * @Private
     * @returns {number}
     */
    getRandomNumberFromTotal() {
        return Math.floor(Math.random() * this.pool.length)
    }

    /**
     * returns a random number between 0 and the number of unique choices in the collection.
     * @Private
     * @returns {number}
     */
    getRandomNumberFromUnique() {
        return Math.floor(Math.random() * Math.floor(this.numUniqueChoices));
    }

    /**
     * Returns an array of each of the possible choices after being applied to the given function.
     * This method uses flatMap(), so the method can be called successively in the callback and still return a 1D array.
     * @param {enumerateCallback} func
     * @returns {unknown[]}
     */

    enumerate(func) {
        if(!this.options.usePool) throw new Error("Cannot enumerate choice when the usePool option is false.")
        this.initPool() // Force a pool update, just in case someone manually sets options.usePool
        return this.pool.flatMap(func)
    }
    /**
     * The callback used for the enumerate method
     * @callback enumerateCallback
     * @param value
     * @param index
     * @param array
     */
}

module.exports = Probility









