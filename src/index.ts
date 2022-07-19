import * as THREE from 'three'
import * as Core from './core'
import axios from 'axios'
import World from './world'
import SetModel from "./player/SetModel"

export const container = document.getElementById('three-js container')!

const camera = new Core.Camera(75, window.innerWidth / window.innerHeight)
const renderer = new Core.Renderer(window.innerWidth, window.innerHeight, container)
const scene = new Core.Scene()
const light = new Core.Light()

const model = new SetModel(scene,camera,container)

light.addLight(scene)

;(function main() {
    requestAnimationFrame(main)
    model.update()
    renderer.render(scene, camera)
})()

axios.get('/dormitory.json')
.then((response) => {
    const world:World = new World(response.data)
    world.loadAsync().then(() => {
        world.render(scene)
        console.log("END")
    })
})
.catch(error => {
    console.log(error)
})