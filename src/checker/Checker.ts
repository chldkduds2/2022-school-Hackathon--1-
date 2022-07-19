import * as THREE from 'three'

export default class Checker {
    
    leftSideChecker = new THREE.Raycaster()
    rightSideChecker = new THREE.Raycaster()
    frontSideChecker= new THREE.Raycaster()
    backSideChecker = new THREE.Raycaster()
    topSideChecker = new THREE.Raycaster()
    bottomSideChecker = new THREE.Raycaster()

    constructor(){
    
    }

}