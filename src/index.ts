import * as THREE from 'three'
import * as Core from './core'
import axios from 'axios'
import World from './world'
import SetModel from "./player"

export const container = document.getElementById('three-js container')!



axios.get('/core.json')
.then((response) => {
    const world:World = new World(response.data)
    console.log(response.data)
    world.loadAsync().then(() => {
        const camera = new Core.Camera(75, window.innerWidth / window.innerHeight)
        const renderer = new Core.Renderer(window.innerWidth, window.innerHeight, container)
        const scene = new Core.Scene()
        const light = new Core.Light()
        const model = new SetModel(scene,camera,container,world)
        light.addLight(scene)

        ;(function main() {
            requestAnimationFrame(main)
            model.update()
            renderer.render(scene, camera)
        })()
        
        world.render(scene)
        console.log("END")
    })
})
.catch(error => {
    console.log(error)
})