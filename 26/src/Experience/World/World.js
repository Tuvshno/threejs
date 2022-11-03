import Experience from "../Experience"
import Environment from './Enviroment'
import Floor from './Floor'
import Fox from './Fox'

class World {

    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        //When Resources are ready
        this.resources.on('ready', () => {
            // Setup
            this.floor = new Floor()
            this.fox = new Fox()
            this.environment = new Environment()
        })


    }

    update() {
        if (this.fox)
            this.fox.update()
    }
}

export default World