import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export default class SetModel{
    constructor(scene:THREE.Scene){
        const loader = new GLTFLoader();
        loader.load('assets/scene.gltf',gltf => scene.add(gltf.scene),u => console.log(u), e => console.log(e))
    }
}