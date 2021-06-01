export default class Clock {
    constructor() {
        this.time = [0, 0, 0, 0, 0, 0,]
        this.timeMax = [59, 23, 6, 3, 11, Infinity,]
        this.alarms = []
    }

    update() {
        for (let i = 0; i < this.time.length; i++) {
            if (this.time[i] === this.timeMax[i]) this.time[i] = 0
            else {
                this.time[i]++
                break
            }
        }
        for (let i = 0; i < this.alarms.length; i++) {
            if (JSON.stringify(this.alarms[i].time) !== JSON.stringify(this.time)) continue
            this.alarms[i].fn(this.alarms[i].parameter)
            this.alarms.splice(i, 1)
        }
    }

    setAlarm(time, fn, parameter) {
        let alarm = []
        for (let i = 0; i < this.time.length; i++) {
            if ((this.time[i] + time[i]) > this.timeMax[i]) {
                const res = (this.timeMax[i] + 1) - this.time[i]
                alarm[i] = time[i] - res
                time[i + 1]++
            }
            else alarm[i] = time[i] + this.time[i]
        }
        this.alarms.push({time: alarm, fn, parameter})
    }
}
