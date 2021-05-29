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
        for (let i = 0; i < this.time.length; i++) {
            if (this.time[i] + time[i] > this.timeMax[i]) {
                const res = (this.timeMax[i] + 1) - this.time[i]
                alarm[i] = time[i] - res
                time[i + 1]++
            }
            else alarm[i] = time[i]
        }
        this.alarms.push(alarm)
    }
}
