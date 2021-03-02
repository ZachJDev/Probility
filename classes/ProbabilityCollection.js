module.exports = class ProbabilityCollection {
    constructor(object, totalNumber) {
        this.value = object;
        this.totalNumber = totalNumber;
    }

    increment(n = 1) {
        this.totalNumber += n;
        return this;
    }
}
