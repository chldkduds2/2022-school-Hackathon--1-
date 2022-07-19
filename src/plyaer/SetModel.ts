import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls"
import { Camera } from '../core';


export default class SetModel{
    private _camera:THREE.Camera;
    private _divContainer:HTMLElement;

    constructor(scene:THREE.Scene,camera:THREE.Camera,divContainer:HTMLElement){
        this._camera = camera;
        this._divContainer=divContainer

        const loader = new GLTFLoader();
        loader.load('assets/scene.gltf',gltf => {
            scene.add(gltf.scene)
        },u => console.log(u), e => console.log(e))


        this._setupControl();
    }

    _setupControl(){
        new PointerLockControls(this._camera, this._divContainer)
    }
}