const Probility = require('../Probility');

const range = (start, stop, step) =>
    Array.from({length: (stop - start) / step + 1}, (_, i) => start + (i * step));

class pickFrom256 extends Probility {
    constructor() {
        super(range(0, 255, 1))
    }

    getNumber() {
        return this.choose()
    }
}

const speedTest = new pickFrom256()

class Pokemon {
    constructor(name, speed) {
        this.speed = speed;
        this.name = name;
    }

    attemptEscape(opponentPokemon, attempt) {
        const F = this.calcF(opponentPokemon, attempt);
        const randomNum = speedTest.getNumber();
        return this.canEscape(F, randomNum)
    }

    canEscape(F, randomNum) {
        return F > 255 || randomNum < F;

    }

    calcF(opponentPokemon, attempts) {
        // Formula from https://bulbapedia.bulbagarden.net/wiki/Escape
        const A = this.speed;
        const B = (opponentPokemon.speed / 4) % 256;
        const C = attempts;
        return ((A * 32) / B) + 30 * C;
    }
}

console.log("The chance to escape algorithm in the Pokemon Series of games can be implemented with Probility as well.\n" +
    "With a correct implementation of Probility, we can calculate how likely a pokemon is to escape another and see the chances enumerated.\n")
console.log("The algorithm can be found at https://bulbapedia.bulbagarden.net/wiki/Escape. I'll be using Pikachu with a speed stat of 25 and Charizard with a speed stat of 100. \n" +
    "I don't think these numbers are correct, but they mirror the example on the page.\n")

const pikachu = new Pokemon("Pikachu", 25)
const charizard = new Pokemon("Charizard", 100)

const probOfEscape = speedTest.probabilityOf((val) => {
    const F = pikachu.calcF(charizard, 1)
    return val < F;
})

const asPercent = (val) => {
    return `${val * 100}%`
}

console.log(`Probility will be used as a random number generator, generating numbers between 0 and 255. Using the .probabilityOf() method,\n
we can calculate that Pikachu has a ${asPercent(probOfEscape.valueOf())} chance of escaping Charizard.\n`)

console.log("We can use frequencyTest() to see how often Pikachu escapes out of 10,000 tries: ")
Probility.createTable(Probility.frequencyTest(() => {
    return pikachu.attemptEscape(charizard, 1) ? "Pikachu ran away!" : "Can't Escape!"
}, 10000))

console.log("Even though I don't know the numbers as they are exactly, I will guess that Pikachu was able to escape about 2,400 times.\n");

console.log("We can also create a chart of successive run attempts, as the chance of success increases as the number of attempts increase: ")
for (let i = 1; i < 5; i++) {
    console.log(`Attempt #${i}: `)
    Probility.createTable(Probility.frequencyEnumeration(() => speedTest.enumerate(num => {
        return pikachu.canEscape(pikachu.calcF(charizard, i), num) ? "Pikachu ran away!" : "Can't Escape!"
    })))
}