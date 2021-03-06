const Probility = require('../../classes/Probility')

const createDieErrorMsg = (dieType, expected, given) =>
    `incorrect number of faces for ${dieType}. Expected ${expected}, given ${given}`

class Die {
    constructor(faces) {
        this.prob = new Probility(faces)
    }

    roll() {
        return this.prob.choose()
    }

    slowRoll() {
        return this.prob.chooseWithSample()
    }

    enumerate(funct) {
        return this.prob.enumerate(funct)
    }

}

class Coin extends Die {
    constructor(faces = ["heads", "tails"]) {
        if (faces.length !== 2) throw new Error(createDieErrorMsg("coin", 2, faces.length))
        super(faces);
    }

    flip() {
        return this.prob.choose()
    }
}

class D6 extends Die {
    constructor(faces = [1, 2, 3, 4, 5, 6]) {
        if (faces.length !== 6) throw new Error(createDieErrorMsg("D6", 6, faces.length))
        super(faces);
    }
}

module.exports.Die = Die
module.exports.D6 = D6
module.exports.Coin = Coin

