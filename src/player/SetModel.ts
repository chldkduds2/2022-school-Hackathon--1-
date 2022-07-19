import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls"


export default class SetModel{
    private _camera:THREE.Camera;
    private _divContainer:HTMLElement;
    private _modal:HTMLElement
    private pointerLockControl

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

    }
}