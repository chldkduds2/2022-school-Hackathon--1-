import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'

export default class SetModel {
    private _camera: THREE.Camera
    private _divContainer: HTMLElement
    private _modal: HTMLElement
    private pointerLockControl

    private _state = [false, false, false, false, false, false]

    private _model: THREE.Group = new THREE.Group()

    private _scene:THREE.Scene;

    constructor(scene: THREE.Scene, camera: THREE.Camera, divContainer: HTMLElement) {
        // 레이케스터
        this._scene = scene
        this._camera = camera
        this._divContainer = divContainer
        this._modal = document.getElementById('modal')!
        this.pointerLockControl = new PointerLockControls(this._camera, this._divContainer)

        const loader = new GLTFLoader()
        // loader.load(
        //     'assets/scene.gltf',
        //     (gltf) => {
        //         gltf.scene.scale.x = 0.1
        //         gltf.scene.scale.y = 0.1
        //         gltf.scene.scale.z = 0.1

        //         scene.add(gltf.scene)
        //         // gltf.scene.position.z = -50

        //         this._model = gltf.scene
        //     },
        //     (u) => console.log(u),
        //     (e) => console.log(e)
        // )

        this._modal?.addEventListener('click', () => {
            this.pointerLockControl.lock()
        })
        this.pointerLockControl.addEventListener('lock', () => {
            this._modal.style.display = 'none'
        })
        this.pointerLockControl.addEventListener('unlock', () => {
            this._modal.style.display = ''
        })

        window.addEventListener('keydown', (e) => {
            this.changeTrue(e.keyCode)
        })

        window.addEventListener('keyup', (e) => {
            this.changeFalse(e.keyCode)
        })


    }

    changeTrue(keyCode:number){
        if (keyCode == 119 || keyCode == 87){
            this._state[0] = true;
        }
        if (keyCode == 65 || keyCode == 97) {
            this._state[1] = true;
        }
        if (keyCode == 68 || keyCode == 100) {
            this._state[2] = true;
        }
        if (keyCode == 83 || keyCode == 115) {
            this._state[3] = true;
        }
        if (keyCode == 32) {
            this._state[4] = true;
        }
        if (keyCode == 16) {
            this._state[5] = true;
        }
    }

    changeFalse(keyCode:number){
        if (keyCode == 119 || keyCode == 87){
            this._state[0] = false;
        }
        if (keyCode == 65 || keyCode == 97) {
            this._state[1] = false;
        }
        if (keyCode == 68 || keyCode == 100) {
            this._state[2] = false;
        }
        if (keyCode == 83 || keyCode == 115) {
            this._state[3] = false;
        }
        if (keyCode == 32) {
            this._state[4] = false;
        }
        if (keyCode == 16) {
            this._state[5] = false;
        }
    }




    update() {
        const state = this._state

        // true가 2개 이상일 때 속도 변경
        const speed = state.filter(e => true === e).length > 1 ? 0.2 : 0.5;
        

        if (state[0]) {
            this.pointerLockControl.moveForward(speed)
        }
        if (state[1]) {
            this.pointerLockControl.moveRight(-speed)
        }
        if (state[2]) {
            this.pointerLockControl.moveRight(speed)
        }
        if (state[3]) {
            this.pointerLockControl.moveForward(-speed)
        }
        if (state[4]) {
            this._camera.position.y += speed
        }
        if (state[5]) {
            this._camera.position.y -= speed
        }

        this._model.position.x = this._camera.position.x
        this._model.position.y = this._camera.position.y - 1
        this._model.position.z = this._camera.position.z;


    }
}
