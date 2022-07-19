import * as THREE from 'three'
import { Material, Vector3 } from 'three'
import Deployable from './Deployable'

export default class DeployGeomerty implements Deployable {
    public _mesh: THREE.Mesh

    constructor(position: THREE.Vector3, material: THREE.Material | THREE.Material[] | null) {
        const geometry = new THREE.BoxGeometry(1, 1, 1)

        // null일 때 변경
        if (material === null) {
            material = new THREE.MeshPhongMaterial({ color: 0x44a88 })
        }
        const mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(position.x,position.y,position.z)
        this._mesh = mesh
    }

    render(scene: THREE.Scene): void {
        scene.add(this._mesh)
    }
}
