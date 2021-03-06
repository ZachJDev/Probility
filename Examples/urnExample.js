const {Probility, frequencyTest, createTable} = require('../Probility')

class TwoColorUrn extends Probility {
    constructor(array, options) {
        super(array, options);
        this.choiceKeys = this.possibleChoices
        if (this.choiceKeys.length > 2) throw new Error("Only Two initial choices allowed")
        this.choice1 = this.choiceKeys[0]
        this.choice2 = this.choiceKeys[1]
    }
}

class ReinforcementUrn extends TwoColorUrn {
    constructor(array, options) {
        super(array, options);
    }

    choose() {
        const choice = super.choose() // This is a type of problem where foregoing the pool is benefinial to the resource usage.
        this.addOne(choice);
        return choice;
    }
}

class InverseReinforcementUrn extends TwoColorUrn {
    constructor(array, options) {
        super(array, options);

    }

    otherChoice(choice) {
        if (choice === this.choice1) return this.choice2;
        return this.choice1
    }

    choose() {
        const choice = super.choose()
        this.addOne(this.otherChoice(choice));
        return choice;
    }
}

const ball1 = "Red Ball"
const ball2 = "Green Ball"

const antiUrn = new InverseReinforcementUrn([{"1/2": ball1}, {"1/2": ball2}], {parseArray: true, usePool: false})
// Because we don't use the pool when chooing, we can skip ever using it in the instance
const reinforcementUrn = new ReinforcementUrn([{"1/2": ball1}, {"1/2": ball2}], {parseArray: true, usePool: false})

console.log("We've created two classes of urns: one that, when picked from, adds another ball of the same type that was picked.\n" +
    "The second type does the opposite: it adds another ball of the type NOT picked after each pick.\n")

console.log("If we test these two urns, we'll see that the distribution of the balls in the first urn get further apart the more balls are picked:")

const ITERATIONS = 10_000

createTable(frequencyTest(() => {
    return reinforcementUrn.choose()
}, ITERATIONS))

console.log("But the distribution of the balls in the second urn stay relatively close to one another:")

createTable(frequencyTest(() => {
    return antiUrn.choose()
}, ITERATIONS))


let counter1 = 0;
let counter2 = 0;

const minus1 = (num) => num - 1
const plus1 = (num) => num + 1

console.log("we can describe the same phenomenon by passing in two different functions instead of two different balls.\n" +
    "Here we use the same kinds of urns, but instead of balls we have a function that adds one to a number and a function that \n" +
    "subtracts one from a number. When we call this repeatedly on a variable, we essentially measure how many more times \n" +
    "one function was called than the other.\n");

const convergingUrn = new InverseReinforcementUrn([{"1/2": minus1}, {"1/2": plus1}], {parseArray: true, usePool: false})
const divergingUrn = new ReinforcementUrn([{"1/2": plus1}, {"1/2": minus1}], {parseArray: true, usePool: false})


frequencyTest(() => {
    counter1 = convergingUrn.choose()(counter1)
}, ITERATIONS)

frequencyTest(() => {
    counter2 = divergingUrn.choose()(counter2)
}, ITERATIONS)

console.log(`With our converging urn that makes the non-chosen function more likely to be called, we see that the number is close to
(but probably not exactly) 0. In our test, after choosing ${ITERATIONS} times, we got ${counter1}.\n`);
console.log(`Conversely, we can assume that the diverging urn, which makes each pick more likely in the future, our counter will be much
further away from zero than in the other urn. After choosing ${ITERATIONS} times, we got ${counter2}. That means that one function was called
${Math.abs(counter2)} times more than the other.`)