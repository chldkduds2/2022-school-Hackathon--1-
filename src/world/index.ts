import * as THREE from 'three'
import MaterialInfo from './Material'
import MapInfo from './Map'
import DeployBox from '../mesh/DeployBox'
import { Instance } from './InstanceBox'
import Deployable from '../mesh/Deployable'

import empty from '../material/empty'
export default class World {
    public worldInfo:any
    public map:MapInfo
    public materialInfo:Map<number, MaterialInfo> = new Map()
    public palette:Map<number, string>
    private size:THREE.Vector3
    private datas:Map<string, Object> = new Map()
    private instances:Map<number, Instance> = new Map()
    private blocks:Array<Deployable> = new Array()
    constructor(
        worldInfo:any
    ) {
        this.worldInfo = worldInfo
        this.size = new THREE.Vector3(this.worldInfo.width, this.worldInfo.length, this.worldInfo.height)
        this.map = new MapInfo(
            this.worldInfo.blockData, 
            this.size
        )
        this.palette = new Map(worldInfo.palette)
        this.datas = new Map(this.worldInfo.info)
        
    }
    public loadAsync():Promise<void> {
        return new Promise((resolve, reject) => {
            Promise.all(this.worldInfo.palette.map(async (element:any) => {
                this.materialInfo.set(element[0], new MaterialInfo(element[0], element[1].name, this.loadTextureStructure('block/' + this.removeOpction(element[1].name))))
                await this.materialInfo.get(element[0])?.setMaterial()
            })).then(() => {
                this.worldInfo.palette.forEach((element: any) => {
                    if(element[1].count > 4 && !empty.includes(this.removeOpction(element[1].name))) 
                        this.instances.set(element[0], new Instance(element[0], this.materialInfo.get(element[0])?.material, element[1].count))
                })
                resolve()
            })
        })
    }
    public render(scene:THREE.Scene):void {
        let counter = 0
        for(let z = 0; z < this.size.z; z++) {
            for(let y = 0; y < this.size.y; y++) {
                for(let x = 0; x < this.size.x; x++) {
                    const pos = new THREE.Vector3(x, y, z)
                    const color:number = this.map.get(pos)
                    const info = this.materialInfo.get(color)
                    if(!empty.includes(info!.name)) {
                        if(info!.name.includes("bed")) {
                            console.log(info!.name)
                        }
                        if(this.instances.has(color)) {
                            this.instances.get(color)?.render(new THREE.Vector3(x, z + 1, y), scene)
                        }
                        else {
                            this.blocks[counter] = new DeployBox(new THREE.Vector3(x, z + 1, y), info!.material)
                            this.blocks[counter].render(scene)
                            counter++
                        }
                    }
                }
            }
        }
    }
    private loadData(fileName:string): any {
        return this.datas.get(fileName)
    }
    private loadTextureStructure(fileName: string):Array<any> {
        let array = new Array()
        let load = this.loadData(fileName)
        array.push(load)
        try {
            while(array.at(-1).parent != undefined) {
                let parent = array.at(-1).parent
                parent = this.removeString(parent, "minecraft:")
                let load = this.loadData(parent)
                array.push(load)
            }
        }
        catch(e) {
            
        }
        return array
    }
    private removeString(original:string, remove:string) {
        if(original == undefined) {
            return ''
        }
        return original.replace(remove, "") == undefined ? original : original.replace(remove, "")
    }
    private removeOpction(name:string):string {
        return    name.substring(0, name.indexOf('[')) == '' 
                ? name 
                : name.substring(0, name.indexOf('['))
    }
}