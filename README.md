# Probility

Probility is a WIP progress library that aims to provide an easy-to-understand interface for creating probability
distributions and generating data from those distributions.

Probility provides both a class to interface with data collections and a set of functions to generate practical tests of
outcomes and theoretical enumerations of expected outcomes for complex probability rules.

To see the current power of Probility, please check out the "Examples" folder and run the sample code in Node. Example
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

The main class for Probility collections. Best used by extending or wrapping in a different class:

```Javascript
const {Probility} = require('Probility')

class SixSidedDie extends Probility {
    constructor() {
        super([1, 2, 3, 4, 5, 6])
    }

    roll() {
        return this.chooseFromPool()
    }

...
}

// OR //
class SixSidedDie {
    constructor(faces = [1, 2, 3, 4, 5, 6]) {
        this.prob = new Probility(faces) // Access all the Probility methods in the prob property
    }

    roll() {
        return this.prob.chooseFromPool()
    }

...
}

// creating a new instance with an array describing the state:

const urn = new Probility([{"25%": "red ball"}, {"25%": "green ball"},
    {"1/4": "purple ball"},
    {"remainder": "black ball"}], {parseArray: true})

// Parse array must be true. If not, we'd have a collection of three objects
// with equal probability to be chosen.
```

#### `array`:

The array can either be a collection of discrete choices (like the `sixSidedDie` example), or a description of the
probability state using ratios, percents, or the `remainder` identifier (like in the `urn` example) or whole numbers.
Whole numbers cannot be mixed with ratios or percents and cannot also have a `remainder` object in the same array. To
describe the state in the second way, the `parseArray` option must be `true` when calling the constructor.

#### `options`:

Currently, there are two accepted options: `parseArray: boolean` and `usePool: boolean`. Setting `parseArray` to true
will cause the Probility constructor to interpret the array as an array of objects, each of which describe the amount of
a given choice. It is `false` by default, which will cause the constructor to read the array as a collection of discrete
objects.

`usePool : false` will skip any pool initialization and cause the `chooseFomPool()` method to return an error. This is
useful when dealing with very large collections of objects that have different probabilities of being chosen. In most
cases, `usePool` can be left as `true`; it's only downside is the size of the created array, and the speed gained
from `chooseFromPool()` is usually worth it.

### `frequencyTest(callback, n)`

Calls the callback `n`  times and returns a new Map of the results mapped to the number of times the result occurred out
of `n`. The values of the Map are Rational Numbers, an included class:

```javascript
const {frequencyTest} = require('Probility')

const d6 = new SixSidedDie();

frequencyTest(() => d6.roll(), 6000)

//  Map(6) {
//    6 => RationalNumber { numerator: 1019, denominator: 6000 },
//    1 => RationalNumber { numerator: 1012, denominator: 6000 },
//    5 => RationalNumber { numerator: 1040, denominator: 6000 },
//    3 => RationalNumber { numerator: 952, denominator: 6000 },
//    2 => RationalNumber { numerator: 1020, denominator: 6000 },
//    4 => RationalNumber { numerator: 957, denominator: 6000 }
// }

frequencyTest(() => {
    return d6.roll() % 2 === 0 ? "Even" : "Odd"
}, 6000)

// Map(2) {
//     'Odd' => RationalNumber { numerator: 2986, denominator: 6000 },
//     'Even' => RationalNumber { numerator: 3014, denominator: 6000 }
// }
```

### frequencyEnumeration(array)

Returns a mapping of all possible outcomes to their actual probability. It is meant to be used with
Probility's `. enumerate()` method.

```javascript
const {frequencyEnumeration} = require("Probility");

frequencyEnumeration(() => {
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

frequencyEnumeration(() => {
    return d6.enumerate((roll1) => {
        return d6.enumerate((roll2) => (roll1 + roll2) % 2 === 0 ? "Even" : "Odd")
    })
});

// Map(2) {
//     'Even' => RationalNumber { numerator: 18, denominator: 36 },
//     'Odd' => RationalNumber { numerator: 18, denominator: 36 }
// }
```
