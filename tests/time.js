const {D6} = require('../Examples/classes/EX_dice')
const StdDeck = require('../Examples/classes/EX_DeckOfCards')
const Probility = require('../classes/Probility')

const ITERATIONS = 100000

const range = (start, stop, step) =>
    Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));

const timeFunction = (funct, name, iterations) => {
    console.log("Iterations:", iterations)
    console.time(name)
    for(let i = 0; i < iterations; i++) {
        funct()
    }
    console.timeEnd(name);
}

const d6 = new D6()
// const deck = new StdDeck()


// timeFunction(() => d6.roll(), "Die Roll", ITERATIONS)
// timeFunction(() => d6.slowRoll(), "Slow Die Roll", ITERATIONS)
// timeFunction(() => deck.dealAndReplace(), "Choose a Card", ITERATIONS)
// timeFunction(() => deck.slowDealAndReplace(), "Slow Choose a Card", ITERATIONS)

// const big = new Probility(range(1, 10000, 1))

// timeFunction(()=> big.choose(), "big probability space", ITERATIONS)

// console.log(big.probabilityOf((val) => val % 2 === 0))

for(let i = 0; i < 7; i++) {
    if(i % 2 === 0)
        console.log(i)
}