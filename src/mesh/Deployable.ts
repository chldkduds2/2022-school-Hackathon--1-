import * as THREE from 'three'
export default interface Deployable {
    mesh:THREE.Mesh;
    constructor():void
    render(secne:THREE.Scene):void
}