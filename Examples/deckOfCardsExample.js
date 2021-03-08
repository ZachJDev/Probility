const Probility= require('../Probility')
const {StdDeck} = require('./classes/EX_DeckOfCards')

const deck = new StdDeck(false)
console.log("Because a deck's deal() method essentially removes it from the choice pool, we should expect \n" +
    "that testing that function will return equal probability for each card: ")
Probility.createTable(Probility.frequencyTest(() => {
    const card = deck.deal()
    return `${card.rank}${card.suit}`
}, 52 * 100))

console.log("However, testing the chooseAndReplace() method will return close to, but not exactly the same probabilities:")
deck.initCards()
Probility.createTable(Probility.frequencyTest(() => {
    const card = deck.chooseAndReplace()
    return `${card.rank}${card.suit}`
}, 52 * 100))

console.log("We can use probabilityOf() to find the number of aces in the deck:")
const aces = deck.probabilityOf((card) => card.rank === "A")
console.log(`There are ${aces} in the deck, or a ${aces.simplify()} chance of choosing one. \n`)


console.log("We can also use enumeration to find the chance of pulling two aces: \n")

const withReplacing = Probility.frequencyEnumeration(() => {
    return deck.enumerate((card1) => {
        return deck.enumerate((card2) => {
            if (card1.rank === "A" && card2.rank === 'A') return "Two Aces"
            return "Other"
        })
    })
})

const withoutReplacing = Probility.frequencyEnumeration(() => {
    return deck.enumerate(card1 => {
        let newDeck = StdDeck.fromDeck(deck)
            // TODO: find a better way of representing the previous card in the deck. Should be possible using the instance of Card1
            .prob.remove((card) => card1.rank === card.rank && card1.suit === card.suit)
        return newDeck.enumerate(card2 => {
            if (card1.rank === "A" && card2.rank === "A") return "Two Aces"
            return "Other"
        })
    })
})

console.log(`With Replacing the card, we have a ${withReplacing.get("Two Aces").simplify()} chance of pulling two aces in a row.`)
console.log(`Without Replacing, we have a ${withoutReplacing.get("Two Aces").simplify()} chance of pulling two aces in a row.\n`)

console.log("But one thing to remember is that enumerating probability spaces this way can become resource hungry very quickly.\n" +
    "Sometimes it's better to calculate the probabilities directly with the Rational Number objects that represent probabilities in this library.")

console.log("\nOne more thing to try: call the new StdDeck() constructor with the hasJokers parameter as true, and see how the numbers change. ")