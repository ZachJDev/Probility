# Probility

Probility is a WIP progress library that aims to provide an easy-to-understand interface for creating probability
distributions and generating data from those distributions.

Probility provides both a class to interface with data collections and a set of functions to generate practical tests of
outcomes and theoretical enumerations of expected outcomes for complex probability rules.

To see the current power of Probility, please check out
the [Examples Folder](https://github.com/ZachJDev/Probility/tree/main/Examples) and run the sample code in Node. Example
output is provided in the Markdown files, but running the code and looking at how the examples are constructed should
give a much clearer picture of how everything works behind the scenes.

## Why Probility?

My game-designer coworker trying to work out various combinations of die rolls using an Excel table initially inspired
this project. I hope that, as it works now, Probility provides an easy way to interface with, describe, and explore
probabilistic collections of data. In the future, I hope to make it even more robust by allowing developers to store and
manipulate different states of a single Probility instance.

## API Reference

**More Coming Soon!!**

### `class Probility(array, [options])`

The main class for Probility collections. It can be assigned directly, extended, or wrapped in a new class. It takes an
array and an optional options object during initialization.

```Javascript
const {Probility} = require('Probility')

const sixSidedDie = new Probility([1, 2, 3, 4, 5, 6])

//////// OR /////////
class SixSidedDie extends Probility {
    constructor() {
        super([1, 2, 3, 4, 5, 6])
    }

    roll() {
        return this.choose()
    }

...
}

//////// OR /////////
class SixSidedDie {
    constructor(faces = [1, 2, 3, 4, 5, 6]) {
        this.prob = new Probility(faces) // Access all the Probility methods in the prob property
    }

    roll() {
        return this.prob.choose()
    }

...
}

// creating a new instance with an array describing the state:

class Urn extends Probility {
    constructor(stateDescription, options) {
        super(stateDescription, options)
    }

    pick() {
        return this.choose()
    }
}

const quarterUrn = new Urn([{"25%": "red ball"}, {"25%": "green ball"},
    {"1/4": "purple ball"},
    {"remainder": "black ball"}], {parseArray: true, total: 400})

// parseArray must be true. If not, we'd have a collection of four objects
// with equal probability to be chosen. Setting total to 400 here means that
// the pool will consist of 100 of each type of ball. Without setting the total,
// the pool would consist of one type of each ball.
```

#### `array`:

The array can either be a collection of discrete choices (like the `sixSidedDie` example), or a description of the
probability state using ratios, percents, or the `remainder` identifier (like in the `urn` example) or whole numbers.
Right now, whole numbers cannot be mixed with ratios or percents and cannot also have a `remainder` object in the same
array. To describe the state in the second way, the `parseArray` option must be `true` when calling the constructor.

#### `options`:

Currently, there are three accepted options: `parseArray: boolean`, `usePool: boolean` and `total: number`. Setting
`parseArray` to `true` will cause the Probility constructor to interpret the array as an array of objects describing the
amount of a given choice. It is `false` by default, which will cause the constructor to read the array as a collection
of discrete objects with equal probabilities.

`usePool : false` will skip the pool initialization and cause the `chooseFomPool()` method to return an error. Because
of the different implementations of `chooseWithSample()` and `chooseFromPool()`, the best option will be based on each
use case: In general, `usePool: true`  is a better option for collections with many evenly -distributed choices, e.g.
representing a deck of playing cards. `usePool: false` is a better option for collections with fewer and
non-evenly-distributed choices, e.g. an urn with a two colors of balls with a constantly-changing ratio between them.
The `choose()` method will detect which of the two choose implementations to use based on this option.

`total` can be set to a number representing the total number of options in a state description array (i.e., a parsed
array). It will **not** override the totals if whole numbers are used; it is useful when describing a collection with
ratios and percents that will later need choices added or removed. A high total will correlate to a large pool, so space
concerns may factor into it's usefulness for your use case.

### `Probility.frequencyTest(callback, n)`

Static. Calls the callback `n`  times and returns a new Map of the results mapped to the number of times the result
occurred out of `n`. The values of the Map are Rational Numbers, an included class:

```javascript
const {Probility} = require('Probility')

const d6 = new SixSidedDie();

Probility.frequencyTest(() => d6.roll(), 6000)

//  Map(6) {
//    6 => RationalNumber { numerator: 1019, denominator: 6000 },
//    1 => RationalNumber { numerator: 1012, denominator: 6000 },
//    5 => RationalNumber { numerator: 1040, denominator: 6000 },
//    3 => RationalNumber { numerator: 952, denominator: 6000 },
//    2 => RationalNumber { numerator: 1020, denominator: 6000 },
//    4 => RationalNumber { numerator: 957, denominator: 6000 }
// }

Probility.frequencyTest(() => {
    return d6.roll() % 2 === 0 ? "Even" : "Odd"
}, 6000)

// Map(2) {
//     'Odd' => RationalNumber { numerator: 2986, denominator: 6000 },
//     'Even' => RationalNumber { numerator: 3014, denominator: 6000 }
// }
```

### `Probility.frequencyEnumeration(array)`

Static. Returns a mapping of all possible outcomes to their actual probability. It is meant to be used with
Probility's `. enumerate()` method.

```javascript
const {Probility} = require("Probility");

Probility.frequencyEnumeration(() => {
    return d6.enumerate((roll1) => {
        return d6.enumerate((roll2) => roll1 + roll2)
    })
});

// Map(11) {
//   2 => RationalNumber { numerator: 1, denominator: 36 },
//   3 => RationalNumber { numerator: 2, denominator: 36 },
//   4 => RationalNumber { numerator: 3, denominator: 36 },
//   5 => RationalNumber { numerator: 4, denominator: 36 },
//   6 => RationalNumber { numerator: 5, denominator: 36 },
//   7 => RationalNumber { numerator: 6, denominator: 36 },
//   8 => RationalNumber { numerator: 5, denominator: 36 },
//   9 => RationalNumber { numerator: 4, denominator: 36 },
//   10 => RationalNumber { numerator: 3, denominator: 36 },
//   11 => RationalNumber { numerator: 2, denominator: 36 },
//   12 => RationalNumber { numerator: 1, denominator: 36 }
// }

Probility.frequencyEnumeration(() => {
    return d6.enumerate((roll1) => {
        return d6.enumerate((roll2) => (roll1 + roll2) % 2 === 0 ? "Even" : "Odd")
    })
});

// Map(2) {
//     'Even' => RationalNumber { numerator: 18, denominator: 36 },
//     'Odd' => RationalNumber { numerator: 18, denominator: 36 }
// }
```

### `instance.numUniqueChoices`

Returns the number of unique choices in a Probility instance.

```javascript
const d6 = new Probility([1, 2, 3, 4, 5, 6]);
d6.numUniqueChoices // 6
```

### `instance.possibleChoices`

Returns an array of the unique choices in a Probility instances.

```javascript
const weightedD6 = new Probility([1, 2, 3, 4, 5, 6, 6, 6, 6, 6])
weightedD6.possibleChoices // [1,2,3,4,5,6]
```

### `instance.numTotalChoices`

Returns the number of total choices.

```javascript
const weightedD6 = new Probility([1, 2, 3, 4, 5, 6, 6, 6, 6, 6])
weightedD6.numTotalChoices // 10
```

### `instance.choose()`

Returns a choice based on the probabilities of the choices in the collection. Will call `chooseFromPool()` or
`chooseFromSample()` based on how the instance was created.

```javascript
const weightedD6 = new Probility([1, 2, 3, 4, 5, 6, 6, 6, 6, 6])
const coin = new Probility([{"1/2": "heads"}, {"1/2": "tails"}], {parseArray: true, usePool: false});

coin.choose() // 'heads' -- calls chooseFromSample()
weightedD6.choose() // 6 -- calls chooseFromPool()
```

### `instance.initPool()`

Initializes an instance's pool. Called internally, but can be used to force a pool when an instance was not created with
one.

```javascript
const coin = new Probility([{"1/2": "heads"}, {"1/2": "tails"}], {parseArray: true, usePool: false});
coin.chooseFromPool(); // throws an error
coin.initPool();
coin.chooseFromPool() // "heads"
```

### `instance.add(choice, num)`

Returns the Probility instance. Adds a number `num` of choice to the possible choices and reinitializes the pool, if
using one.

```javascript
const d6 = new Probility([1, 2, 3, 4, 5, 6])
d6.add(7, 1);
d6.possibleChoices // [1,2,3,4,5,6,7]
```

### `instance.addOne(choice)`

Shorthand for `instance.add(choice, 1)`

### `instance.remove(predicateCallback, num)`

Returns the Probility instance. iterates over the array and removes up to `num` choices that return `true` from
`predicateCallback(choice)`.

```javascript
const smallDeck = new Probility(["1H", "6D", "JS", "KS"]);
smallDeck.remove(card => card === "JS", 1);
smallDeck.possibleChoices // ["1H", "6D", "KS"]

// Removing non-specific items:

const slipsOfPaper = new Probility([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
slipsOfPaper.remove(paper => paper % 2 === 0, 3)
slipsOfPaper.possibleChoices // [1,3,5,7,8,9,10,11,12]
```

### `instance.listAllProbabilities()`

Returns a `Map` of the probabilities of the unique choices.

```javascript
const slipsOfPaper = new Probility([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
slipsOfPaper.listAllProbabilities()
// Map(12) {
//   1 => '1 / 12',
//   2 => '1 / 12',
//   3 => '1 / 12',
//   4 => '1 / 12',
//   5 => '1 / 12',
//   6 => '1 / 12',
//   7 => '1 / 12',
//   8 => '1 / 12',
//   9 => '1 / 12',
//   10 => '1 / 12',
//   11 => '1 / 12',
//   12 => '1 / 12'
}
```

### `instance.singleChoiceProbability(choice)`

Returns a `RationalNumber` representing the probability of the given choice from the instance.

```javascript
const weightedDie = new Probility([1, 2, 3, 4, 4, 4, 5, 6])
weightedDie.singleChoiceProbability(4).toString() // "3 / 8"
```

### `instance.probabilityOf(predicateCallback)`

Returns a `RationalNumber` representing the probability that a choice will return `true` from `predicateCallback
(choice)`. In other words, the number of choices that return `true` over the total number of choices.

```javascript
const slipsOfPaper = new Probility([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
slipsOfPaper.probabilityOf(paper => paper % 2 === 0).simplify().toString() // "1 / 2"
```

### `instance.getRandomChoice()`

Returns a random choice from the collection of unique choices in the collection. With this method, all unique choices
have an equal probability of being chosen.

```javascript
const slipsOfPaper = new Probility([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
slipsOfPaper.getRandomChoice() // 10
```

### `instance.getRandomNumberFromTotal()`

Returns a random number between 0 and the total number of all choices in a collection (exclusive).

```javascript
const bigUrn = new Probility([{"50%": "White Ball"}, {"50%": "Black Ball"}], {parseArray; true, total: 4000})
bigUrn.getRandomNumberFromTotal() // 3320
```

### `instance.getRandomNumberFromUnique()`

Returns a random number between 0 and the number of unique choices in a collection (exclusive).

```javascript
const bigUrn = new Probility([{"50%": "White Ball"}, {"50%": "Black Ball"}], {parseArray; true, total: 4000})
bigUrn.getRandomNumberFromUnique() // 1
```

### `instance.enumerate(callback)`

Returns an array of values returned from calling the callback with each value. Under the hood, this
uses `Array. flatMap`, so they can be easily chained. (Though of course, enumerating can become resource-hungry quickly;
it's essentially permuting all possible choices with each call to this method.)

```javascript
const d6 = new Probility([1, 2, 3, 4, 5, 6]);
d6.enumerate(roll => {
    return roll
})
// [1,2,3,4,5,6]

d6.enumerate(roll1 => {
    return d6.enumerate(roll2 => {
        return roll1 + roll2
    })
})
//[2,  3,  4, 5, 6,  7,  3,  4, 5, 6,  7,  8, 4, 5,  6,  7,  8,  9,
// 5,  6,  7, 8, 9, 10,  6,  7, 8, 9, 10, 11, 7, 8,  9, 10, 11, 12 ]

```