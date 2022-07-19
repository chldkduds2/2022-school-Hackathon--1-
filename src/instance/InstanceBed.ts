// import { BoxGeometry, BufferGeometry, Material } from "three";
// import * as THREE from 'three'
// export default class InstanceBed {
//     public readonly code: number
//     private material:Material | Array<Material>
//     private amount:number
//     private mesh
//     private static geometry:THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1)
//     private count = 0;
//     private opction:Map<string, string> = new Map()
//     constructor(
//         code: number,
//         material:Material | Array<Material> | null | undefined,
//         amount:number,
//         opction:string
//     ) {
//         this.code = code
//         this.material = material == null ? new THREE.MeshStandardMaterial({ color: 0xFF00FF }) : material
//         this.amount = amount + 1
//         opction.substring(1, opction.length - 2).split(',').forEach((element) => {
//             const temp = element.split('=')
//             this.opction.set(temp[0], temp[1])
//         })
//         this.mesh = new THREE.InstancedMesh( InstanceBox.geometry, this.material, this.amount );
//     }

//     render(pos:THREE.Vector3, scene:THREE.Scene) {
//         const matrix = new THREE.Matrix4();
//         matrix.setPosition( pos.x, pos.y, pos.z );
//         this.mesh.setMatrixAt( this.count, matrix );
//         this.count++
//         scene.add( this.mesh )
//     }
// }