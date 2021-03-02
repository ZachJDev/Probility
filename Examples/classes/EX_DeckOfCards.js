const Probility = require('../../classes/Probility')

class Card {
    constructor(value, suit = null) {
        this.rank = value.toString();
        this.suit = suit;
    }
}


class StdDeck {
    constructor(hasJokers = false) {
        this.joker = hasJokers
        this.cards = []
        this.createCards(this.joker)
        this.shuffleDeck()
        this.initCards()
    }

    static fromDeck(deck) {
        return new StdDeck(deck.joker)
    }

    createCards() {
        const ranks = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"]
        const revRanks = Array.from(ranks).reverse()
        // Put in Bicycle's new deck order
        this.startingDeck = ["♥", "♣"]
            .flatMap(suit => ranks.map(val => new Card(val, suit)))
            .concat(["♦", "♠"].flatMap(suit => revRanks.map(val => new Card(val, suit))))
        if (this.joker) {
            this.startingDeck = this.startingDeck.concat([new Card('J', 'J'), new Card('J', 'J')])
        }

    }

    initCards() {
        this.prob = new Probility(this.startingDeck)
    }

    getRandomCard() {
        if (this.prob.numTotalChoices <= 0) throw new Error("No cards remain. call method initCards() to refresh the deck")
        const card = this.prob.chooseFromPool();
        this.prob.remove((val) => val === card)
        return card
    }

    chooseAndReplace() {
        return this.prob.chooseFromPool()
    }

    deal() {
        if (this.cards.length <= 0) this.shuffleDeck()
        return this.cards.pop()
    }

    shuffleDeck() {
        if (this.cards.length === 0) this.initCards()
        while (this.prob.numTotalChoices > 0) {
            this.cards.push(this.getRandomCard())
        }
    }

    slowDealAndReplace() {
        return this.prob.choose()
    }

    probabilityOf(funct) {
        return this.prob.probabilityOf(funct)
    }

    enumerate(funct) {
        return this.prob.enumerate(funct)
    }
}


module.exports.StdDeck = StdDeck