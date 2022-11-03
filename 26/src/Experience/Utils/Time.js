import EventEmitter from "./EventEmitter";

class Time extends EventEmitter {

    constructor () {
        super()

        //Setup
        this.start = Date.now()
        this.current = this.start
        this.elapsedTime = 0
        this.delta = 16

        window.requestAnimationFrame( () => {
            this.tick()
        })

    }

    tick() {

        let currentTime = Date.now() 
        this.delta = currentTime - this.current
        this.current = currentTime
        this.elapsedTime = this.current - this.start

        this.trigger('tick')
        
        window.requestAnimationFrame( () => {
            this.tick()
        })
    }

}

export default Time