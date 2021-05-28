export default class Clock {
    constructor() {
        this.time = [0, 0, 0, 0, 0, 0,]
        this.timeMax = [59, 23, 6, 3, 11, Infinity,]
        this.alarms = []
    }

    update() {
        for (let i = 0; i < this.time.length; i++) {
            if (this.time[i] === this.timeMax[i]) this.time[i] = 0
            else return this.time[i]++
        }
        this.alarms
    }

    setAlarm(time, who) {
        let alarm = []
        let carryOver = 0
        for (let i = 0; i < this.time.length; i++) {
            if (this.time[i] + time[i] >= this.timeMax[i]) {
                alarm[i] = (this.time[i] + time[i]) - this.timeMax[i]
                carryOver = 1
            }
            else alarm[i] = time[i]
        }
        this.alarms.push(alarm)
    }
}
