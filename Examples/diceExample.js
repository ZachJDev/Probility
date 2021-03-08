const {D6, Coin} = require('./classes/EX_dice')
const Probility = require('../Probility')

// Examples //
const d61 = new D6()
const d62 = new D6()
const d63 = new D6()


console.log("Results of rolling a die 600000 times: ")
Probility.createTable(Probility.frequencyTest(() => d61.roll(), 600000), true)

console.log("Actual Probabilities of each number appearing in a single roll: ");
Probility.createTable(Probility.frequencyEnumeration(() => d61.enumerate(roll => roll)))

console.log("A more complex test: Roll three dice. If the second die is even,\n" +
    "add all three together. If it is not, add the first two dice for a score.");

console.log("Results of Test:");

Probility.createTable(Probility.frequencyTest(() => {
    const roll1 = d61.roll();
    const roll2 = d62.roll();
    if (roll2 % 2 === 0) {
        return roll1 + roll2 + d63.roll();
    } else return roll1 + roll2
}, 216000), true);

console.log("Results of enumeration");

Probility.createTable(Probility.frequencyEnumeration(() => {
    return d61.enumerate(roll1 => {
            return d62.enumerate(roll2 => {
                return d63.enumerate(roll3 => {
                    if (roll2 % 2 === 0) return roll3 + roll2 + roll1
                    return roll1 + roll2
                })
            });
        }
    )
}), true)

console.log("Using functions as choices:\n ")

const loudCoin = new Coin([val => val.toUpperCase(), val => val.toLowerCase()])
const wordD6 = new D6(["One", "Two", "Three", "Four", "Five", "Six"])

console.log("With a loudCoin, which tells us to whisper or a yell a word, and a wordD6, which gives us the name of a face \n" +
    "we can call loudCoin.flip()(wordD6.roll()) to be given a yelled or whispered face name: " +
    loudCoin.flip()(wordD6.roll()))

Probility.createTable(Probility.frequencyEnumeration(() => {
    return wordD6.enumerate(face => {
        return loudCoin.enumerate(funct => {
            return funct(face)
        })
    })
}))
