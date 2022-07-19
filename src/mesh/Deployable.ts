import * as THREE from 'three'
import { Material, Vector3 } from 'three';

export default interface Deployable {
    _mesh:THREE.Mesh;
    // x,y,z 가 객체로 들어옴
    // meterial이나 meterial array이나 null 이 들어옴
    render(scene:THREE.Scene):void
}