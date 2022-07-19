// import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// const scene = new THREE.Scene()

// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
// camera.position.z = 2

// const renderer = new THREE.WebGLRenderer()
// renderer.setSize(window.innerWidth, window.innerHeight)
// document.body.appendChild(renderer.domElement)

// const controls = new OrbitControls(camera, renderer.domElement)

// const geometry = new THREE.BoxGeometry()
// const material = new THREE.MeshBasicMaterial({
//     color: 0x00ff00,
//     wireframe: true,
// })

// const cube = new THREE.Mesh(geometry, material)
// scene.add(cube)

// window.addEventListener('resize', onWindowResize, false)
// function onWindowResize() {
//     camera.aspect = window.innerWidth / window.innerHeight
//     camera.updateProjectionMatrix()
//     renderer.setSize(window.innerWidth, window.innerHeight)
//     render()
// }

// function animate() {
//     requestAnimationFrame(animate)

//     cube.rotation.x += 0.01
//     cube.rotation.y += 0.01

//     controls.update()

//     render()
// }

// function render() {
//     renderer.render(scene, camera)
// }
// animate()


import * as THREE from 'three'
import * as Core from './core'
import axios from 'axios'
import World from './world'

export const container = document.getElementById('three-js container')!

const camera = new Core.Camera(75, window.innerWidth / window.innerHeight)
const renderer = new Core.Renderer(window.innerWidth, window.innerHeight, container)
const scene = new Core.Scene()
const light = new Core.Light()
light.addLight(scene)

;(function main() {
    requestAnimationFrame(main)
    renderer.render(scene, camera)
})()

axios.get('/dormitory.json')
.then((response) => {
    const world:World = new World(response.data)
    world.loadAsync().then(() => {
        world.render(scene)
    })
})
.catch(error => {
    console.log(error)
})

// const bedrock = new BedRock()
// bedrock.render(scene)
// axios.get('/dormitory.json')
// .then((response) => {
//     const world:World = new World(response.data, 16)
//     world.render(scene)
// })
// .catch(error => {
//     console.log(error)
// })
// ;(function main() {
//     requestAnimationFrame(main)
//     player.update()
//     renderer.render(scene, camera)
// })()