import * as THREE from 'three'
import Camera from './Camera'
import Renderer from './Renderer'
import Resources from './Utils/Resources'
import Sizes from "./Utils/sizes"
import Time from "./Utils/Time"
import World from './World/World'
import sources from './sources'
import Debug from './Utils/Debug'

let instance = null

class Experience {
    constructor(canvas) {

        if (instance)
            return instance

        instance = this

        //Global Access
        window.experience = this

        //Options
        this.canvas = canvas

        //Setup
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()

        //Event Triggers
        this.sizes.on('resize', () => {
            this.resize()
        })

        this.time.on('tick', () => {
            this.update()
        })
    }

    resize() {
        this.camera.resize()
        this.renderer.resize()
    }

    update() {
        this.camera.update()
        this.world.update()
        this.renderer.update()
    }

    destroy() {
        this.sizes.off('resize')
        this.time.off('tick')

        //Traverse
        this.scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.geometry.dispose()

                for (const key in child.material) {
                    const value = child.material(key)

                    if (value && typeof value.dispose === 'function') {
                        value.dispose()
                    }
                }
            }
        })
        this.camera.controls.dispose()
        this.renderer.instance.dispose()
        if (this.debug.active)
            this.debug.ui.dispose()
    }
}

export default Experience