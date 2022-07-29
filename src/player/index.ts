import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'
import Checker from './Checker'
import World from '../world'
import { Vector2 } from 'three'

export default class SetModel {
    public pos:THREE.Vector3
    private _camera: THREE.Camera
    private _divContainer: HTMLElement
    private _modal: HTMLElement
    private _chatting : HTMLElement

    private pointerLockControl

    private _state = [false, false, false, false, false, false]

    private _model: THREE.Group = new THREE.Group()

    private _scene:THREE.Scene;

    private counter = 0;
    private checker:Checker



    // x 를 - 했을 때 나가기
    // x 를 + 했을 때 들어가기
    // 46, 4, 116
    // 38, 127, 3
    // 46, 139, 3
    // 38, 140, 3
    // 46, 150, 3
    // 38, 153, 3

    private chatPosition = [[46, 4, 116],[38, 4, 127],[46, 4, 139],[38, 4, 140],[46, 4, 150],[38, 4, 153]]

    constructor(
        scene: THREE.Scene, 
        camera: THREE.Camera, 
        divContainer: HTMLElement,
        world:World
    ) {
        this._scene = scene
        this._camera = camera
        this._divContainer = divContainer
        this._modal = document.getElementById('modal')!
        this._chatting = document.getElementById('chatting')!

        this.pointerLockControl = new PointerLockControls(this._camera, this._divContainer)
        this.checker = new Checker(world)
        const loader = new GLTFLoader()
        this.pos = new THREE.Vector3(0, 17, 1)

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
            console.log(e.key)
            if(e.key == "q" && this._chatting!.style.display == "block") {
                this._chatting!.style.display = "none"
                this.pointerLockControl.lock()
                this._camera.position.set(42, 4, 100)
            }
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
    }




    update() {
        const state = this._state

        // true가 2개 이상일 때 속도 변경
        const speed = state.filter(e => true === e).length > 1 ? 0.1 : 0.2;

        const collusion:Array<boolean> = this.checker.update(this._camera.position)
        // console.log(collusion)

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
        if (state[4] && collusion[4]) {
            this._camera.position.y += speed
        }
        if (collusion[5]){
            this._camera.position.y -= 0.1
        }

        


        this.pos = this._camera.position

        // moveForward이기 때문에 x,z 는 비교해서 처리
        if (!collusion[0]){
            this._camera.position.x -= speed
        } 
        if (!collusion[1]){
            this._camera.position.x += speed
        }
        if (!collusion[2]){
            this._camera.position.z -= speed
        }
        if (!collusion[3]){
            this._camera.position.z += speed
        }
        
        this._model.position.x = this._camera.position.x
        this._model.position.y = this._camera.position.y - 1
        this._model.position.z = this._camera.position.z;

        // console.log(this._camera.position)

        // 카메라 위치로 방 입장 확인
        // console.log("x",Math.round(this._camera.position.x))
        // console.log("y",Math.round(this._camera.position.y))
        // console.log("z",Math.round(this._camera.position.z))
        
        this.chatPosition.map((item) => {
            if (Math.round(this._camera.position.x) == item[0] &&
            Math.round(this._camera.position.y) == item[1] && 
            Math.round(this._camera.position.z) == item[2]){
                
                console.log("문앞임")
                this.pointerLockControl.unlock()
                document.getElementById("chatting")!.style.display = "block"

            }
        })


    }
}
