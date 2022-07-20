import * as THREE from 'three'

class Camera extends THREE.PerspectiveCamera{
	constructor (FOV: number, size: number) {
		super(FOV, size, 1, 1000)
		// this.position.y = 15
		// this.position.x = -5
		// this.position.z = 100
		// this.position.y = 17
		// this.position.z = 100
		// this.position.x = 100
		this.position.y = 34
		this.position.z = 144
		this.position.x = 188
		this.fov = 50
		this.near = 0.05
		this.far = 500
		this.lookAt(0, 0, 100)
		
		this.updateProjectionMatrix()
	}
}
export default Camera