import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export default class Dummy {
    public pos:THREE.Vector3
    private _model: THREE.Group = new THREE.Group()
    private name:string

    constructor(
        scene: THREE.Scene, 
        name:string
    ) {
        const loader = new GLTFLoader()
        this.pos = new THREE.Vector3(0, 17, 1)
        this.name = name
        loader.load(
            'assets/scene.gltf',
            (gltf) => {
                gltf.scene.scale.x = 0.1
                gltf.scene.scale.y = 0.1
                gltf.scene.scale.z = 0.1
                scene.add(gltf.scene)
                this._model = gltf.scene
                this._model.position.set(1, 10, 1)
                
            },
            (u) => console.log(u),
            (e) => console.log(e)
        )
    }
    update(pos:THREE.Vector3) {
        this._model.position.set(pos.x, pos.y, pos.z)
    }
}
