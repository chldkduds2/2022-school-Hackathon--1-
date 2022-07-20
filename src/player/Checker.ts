import * as THREE from 'three'
import { Vector3 } from 'three'
import World from '../world'
import empty from '../material/empty'
export default class Checker {
    // private gap:number =
    private world:World
    constructor(world:World){
        this.world = world
        // console.log(this.world.worldInfo.palette)
    }
    public update(pos:THREE.Vector3):Array<boolean> {
        // pos = new THREE.Vector3(pos.x, pos.z, Math.floor(pos.y))
        pos = new THREE.Vector3(Math.round(pos.x), Math.round(pos.z), Math.round(pos.y))

        console.log(pos)

        return [
            this.possable(this.world.map.get(new Vector3(pos.x+1, pos.y, pos.z-1))),
            this.possable(this.world.map.get(new Vector3(pos.x-1, pos.y, pos.z-1))),
            this.possable(this.world.map.get(new Vector3(pos.x, pos.y + 1, pos.z-1))),
            this.possable(this.world.map.get(new Vector3(pos.x, pos.y - 1, pos.z-1))),
            this.possable(this.world.map.get(new Vector3(pos.x, pos.y, pos.z + 1))),
            this.possable(this.world.map.get(new Vector3(pos.x, pos.y, pos.z - 2)))
            // this.possable(this.world.map.get(new Vector3(Math.floor(pos.x+0.2), Math.floor(pos.y), pos.z-1))),
            // this.possable(this.world.map.get(new Vector3(Math.floor(pos.x-0.2), Math.floor(pos.y), pos.z-1))),
            // this.possable(this.world.map.get(new Vector3(Math.floor(pos.x), Math.floor(pos.y + 0.2), pos.z-1))),
            // this.possable(this.world.map.get(new Vector3(Math.floor(pos.x), Math.floor(pos.y - 0.2), pos.z-1))),
            // this.possable(this.world.map.get(new Vector3(Math.floor(pos.x), Math.floor(pos.y), pos.z + 1))),
            // this.possable(this.world.map.get(new Vector3(Math.floor(pos.x), Math.floor(pos.y), pos.z - 2)))
        ]
    }
    private possable(code:number) {
        return empty.includes(this.world.worldInfo.palette[code][1].name)
    }
}