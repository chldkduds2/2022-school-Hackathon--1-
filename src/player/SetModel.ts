import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls"
import { Camera } from '../core';


export default class SetModel{
    private _camera:THREE.Camera;
    private _divContainer:HTMLElement;
    private _modal:HTMLElement
    private pointerLockControl

    private _state = [false,false,false,false,false,false]


    constructor(scene:THREE.Scene,camera:THREE.Camera,divContainer:HTMLElement){
        this._camera = camera;
        this._divContainer=divContainer
        this._modal = document.getElementById('modal')!
        this.pointerLockControl = new PointerLockControls(this._camera, this._divContainer)


        this._modal?.addEventListener('click', () => {
            this.pointerLockControl.lock()
        })
        this.pointerLockControl.addEventListener( 'lock', () => {
            this._modal.style.display = 'none'
        });
        this.pointerLockControl.addEventListener( 'unlock', () => {
            this._modal.style.display = ''
        });

        const loader = new GLTFLoader();
        loader.load('assets/scene.gltf',gltf => {
            scene.add(gltf.scene)
        },u => console.log(u), e => console.log(e))


        window.addEventListener("keydown",(e) => {
            this.changeState(e.keyCode)
        })
        
        window.addEventListener("keyup",(e) => {
            this.changeState(e.keyCode)
        })

        
    }


    changeState(keyCode:number){
        if (keyCode == 119 || keyCode == 87 ){ // w
            this._state[0] = !(this._state[0])
        } 
        if (keyCode == 65 || keyCode == 97){ // a
            this._state[1] = !(this._state[1])
        }
        if (keyCode == 68 || keyCode == 100){// d
            this._state[2] = !(this._state[2])
        }
        if (keyCode == 83 || keyCode == 115){//s
            this._state[3] = !(this._state[3])
        }
        if (keyCode == 32){
            this._state[4] = !(this._state[4]) // space
        } 
        if (keyCode == 16){ // shitf
            this._state[5] = !(this._state[5])
        }
    }


    update(){
        const state = this._state;
        if (state[0]){
            this.pointerLockControl.moveForward(1)
        }
        if (state[1]){
            this.pointerLockControl.moveRight(-1)
        }
        if (state[2]){
            this.pointerLockControl.moveRight(1)
        }
        if (state[3]){
            this.pointerLockControl.moveForward(-1)
        }
        if (state[4]){
            this._camera.position.y += 1
        }
        if (state[5]){
            this._camera.position.y -= 1
        }
    }

}