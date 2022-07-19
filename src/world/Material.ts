import * as THREE from "three"
export default class Material {
    
    // TEST extends Material | 
    public code:number
    public name:string
    public origin:string
    private structure: strObj
    private material: THREE.Material | Array<THREE.Material> | null = null
    private static loadedTexture:Map<string, THREE.Texture> = new Map()
    private static readonly textureExtension:string = '.png'
    private static readonly textureDirectory:string = '/texture/assets/minecraft/textures/'
    private static readonly textureLoader = new THREE.TextureLoader()
    private static readonly block:Array<string> = [
        "south",
        "north",
        "up",
        "down",
        "west",
        "east",
    ]
    private static readonly cross:Array<string> = [
        "south",
        "north",
    ]
    constructor (
        code:number,
        name:string,
        structure:any
    ) {
        this.code = code
        this.name = name
        this.origin = structure.length > 1 ? Material.removeString(structure[structure.length - 2].parent, "minecraft:").substring(6) : ''
        this.structure = Material.joinTexture(structure)
    }
    public setMaterial():Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                for (let element in this.structure.textures) {
                    if(this.structure.textures[element][0] == "#") {
                        this.structure.textures[element] = this.structure.textures[this.structure.textures[element].substring(1)]
                    }
                    this.structure.textures[element] = Material.removeString(this.structure.textures[element], "minecraft:")
                }
                let textureArray
                switch (origin) {
                    case "cross": textureArray = Material.cross; break;
                    default: textureArray = Material.block
                }
                textureArray.forEach(element => {
                    if(this.structure.elements[0].faces[element].texture[0] == '#') {
                        this.structure.elements[0].faces[element].texture 
                        = this.structure.textures[this.structure.elements[0].faces[element].texture.substring(1)]
                    }
                })
                Promise.all(
                    textureArray.map(element => 
                        this.getMeshBasicMaterial(this.structure.elements[0].faces[element].texture))
                ).then((result) => {
                    this.material = result
                    resolve()
                })
            }
            catch(e) {
                this.material = null
                resolve()
            }
        })
    }
    private async getMeshBasicMaterial(texture: string):Promise<THREE.MeshBasicMaterial> {
        const loadedTexture = await this.loadTexture(Material.removeString(texture, "minecraft:"))
        return new THREE.MeshBasicMaterial({
            map: loadedTexture,
            transparent: true,
            color: new THREE.Color(1, 1, 1)
        })
    }
    public async loadTexture(texture: string):Promise<THREE.Texture> {
        if(Material.loadedTexture.has(texture)) {
            return Material.loadedTexture.get(texture)!.clone()
        }
        else {
            const temp = await Material.textureLoader.loadAsync(Material.setDirectiry(texture))
            Material.loadedTexture.set(texture, temp)
            return temp
        }
    }
    private static joinTexture(structure:any):strObj {
        let allTexture:strObj = {
            textures: {},
            elements: {}
        }
        structure.forEach((element: any) => {
            allTexture.textures = { ...allTexture.textures, ...element.textures }
            allTexture.elements = { ...allTexture.elements, ...element.elements }
        })
        return Material.copyObj(allTexture)
    }


    private static setDirectiry(name:string):string {
        return Material.textureDirectory + name + Material.textureExtension
    }
    private static removeString(original:string, remove:string) {
        if(original == undefined) { return '' }
        return original.replace(remove, "") == undefined ? original : original.replace(remove, "")
    }
    private static copyObj(obj:any) {
        const result:any = {};
        for (let key in obj) {
          if (typeof obj[key] === 'object') {
            result[key] = Material.copyObj(obj[key]);
          } else {
            result[key] = obj[key];
          }
        }
        return result;
    }
}

interface strObj {
    [key: string]: any
}