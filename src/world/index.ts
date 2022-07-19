import * as THREE from 'three'
import MaterialInfo from './Material'
import MapInfo from './Map'
export default class World {
    public worldInfo:any
    public map:MapInfo
    public palette:Map<number, MaterialInfo> = new Map()
    constructor(
        worldInfo:any
    ) {
        this.worldInfo = worldInfo
        this.map = new MapInfo(
            this.worldInfo.blockData, 
            new THREE.Vector3(this.worldInfo.width, this.worldInfo.length, this.worldInfo.height))
        console.log(worldInfo.palette)
        console.log(worldInfo)
    }
}