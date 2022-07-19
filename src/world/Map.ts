import * as THREE from 'three'
export default class Map{
    private body:Array<number>
    private size:THREE.Vector3
    private delta:number
    constructor(
        body:Array<number>,
        size:THREE.Vector3
    ) {
        this.body = body
        this.size = size
        this.delta = this.size.x * this.size.y
    }
    public get(posistion:THREE.Vector3):number {
        return this.body[
            posistion.z * this.delta + 
            posistion.y * this.size.x + 
            posistion.x]
    }
}