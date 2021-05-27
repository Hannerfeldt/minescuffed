export default class Clock {
    constructor() {
        this.time = [0, 0, 0, 0, 0, 0,]
        this.timeMax = [59, 23, 6, 3, 11, Infinity,]
    }

    update() {
        for (let i = 0; i < this.time.length; i++) {
            if (this.time[i] === this.timeMax[i]) this.time[i] = 0
            else return this.time[i]++
        }
    }
}
