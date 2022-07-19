import * as THREE from 'three'
import MaterialInfo from './Material'
import MapInfo from './Map'
import DeployBox from '../mesh/DeployBox'
export default class World {
    public worldInfo:any
    public map:MapInfo
    public materialInfo:Map<number, MaterialInfo> = new Map()
    public palette:Map<number, string>
    private datas:Map<string, Object> = new Map()
    constructor(
        worldInfo:any
    ) {
        this.worldInfo = worldInfo
        this.map = new MapInfo(
            this.worldInfo.blockData, 
            new THREE.Vector3(this.worldInfo.width, this.worldInfo.length, this.worldInfo.height))
        this.palette = new Map(worldInfo.palette)
        this.datas = new Map(this.worldInfo.info)
        console.log(this.worldInfo)
    }
    public loadAsync():Promise<void> {
        return new Promise((resolve, reject) => {
            Promise.all(this.worldInfo.palette.map(async (element:any) => {
                this.materialInfo.set(element[0], new MaterialInfo(element[0], element[1].name, this.loadTextureStructure('block/' + this.removeOpction(element[1].name))))
                await this.materialInfo.get(element[0])?.setMaterial()
            })).then(() => {resolve()})
        })
    }
    public render(scene:THREE.Scene):void {
        console.log(this.materialInfo.get(0))
        const box = new DeployBox(new THREE.Vector3(0, 0, 0), this.materialInfo.get(0)!.material)
        box.render(scene)
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