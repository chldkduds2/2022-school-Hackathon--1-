import { BoxGeometry, BufferGeometry, Material, QuadraticBezierCurve } from "three";
import * as THREE from 'three'
export default class InstanceLadder {
    private material:Material
    private amount:number
    private mesh
    private static geometry:THREE.PlaneGeometry = new THREE.PlaneGeometry(1, 1)
    private count = 0;
    constructor(
        amount:number,
    ) {
        this.amount = amount + 1
        console.log(this.amount)
        const textureLoader = new THREE.TextureLoader()
        const texture = textureLoader.load("/texture/assets/minecraft/textures/block/ladder.png")
        texture.magFilter = THREE.NearestFilter
        this.material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide
        })
        this.material
        this.mesh = new THREE.InstancedMesh( InstanceLadder.geometry, this.material, this.amount );
    }

    render(pos:THREE.Vector3, option:string, scene:THREE.Scene) {
        const optionMap = new Map()
        option.split(',').forEach((element) => {
            const temp = element.split('=')
            optionMap.set(temp[0], temp[1])
        })
        // console.log(optionMap.get("facing"))
        const matrix = new THREE.Matrix4();
        matrix.setPosition( pos.x, pos.y, pos.z + 0.2);
        this.mesh.setMatrixAt( this.count, matrix );
        this.count++
        scene.add( this.mesh )
    }
}