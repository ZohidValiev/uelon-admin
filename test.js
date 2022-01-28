
const { createAtom, autorun } = require("mobx")
// import { createAtom, autorun } from "mobx"


class Clock {
    atom
    intervalHandler
    currentDateTime

    constructor() {
        this.atom = createAtom(
            "Clock",
            () => {
                console.log("Clock onBecomeObserved")
                this.startTicking()
            },
            () => {
                console.log("Clock onBecomeUbobserved")
                this.stopTicking()
            }   
        )
    }

    getTime() {
        if (this.atom.reportObserved()) {
            console.log("Clock getTime currentDateTime")
            return this.currentDateTime
        } else {
            console.log("Clock getTime new Date()")
            return new Date()
        }
    }

    tick() {
        console.log("Clock tick()")
        this.currentDateTime = new Date()
        this.atom.reportChanged()
    }

    startTicking() {
        this.tick()
        this.intervalHandler = setInterval(() => {
            this.tick()
        }, 100)
    }

    stopTicking() {
        clearInterval(this.intervalHandler)
        this.intervalHandler = null
    }

}

const clock = new Clock()
const dispose = autorun(() => {
    console.log(clock.getTime())
})
// dispose()