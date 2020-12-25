import * as THREE from './three.module.js'
import { OrbitControls } from './OrbitControls.js'

export class Chart3D {
    constructor(){
        this.color = 0
        this.colors = [new THREE.Color(0.4, 1, 0.3), new THREE.Color(1, 0.2, 0.3), new THREE.Color(0.4, 0.2, 1)]
        this.points = []
        this.scene = new THREE.Scene()
        this.scene.background = new THREE.Color(0.2, 0.2, 0.4);
        // use group to center whole graph. points 0,0,0 are bottom left, 100,100,100 are top
        this.group = new THREE.Group()
        this.scene.add(this.group)
        this.group.position.x = -50
        this.group.position.z = -50
        this.group.position.y = -50

        // camera FOV 60
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.camera.position.z = 130
        this.camera.position.y = 40
        this.camera.position.x = 80

        this.renderer = new THREE.WebGLRenderer()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(this.renderer.domElement)

        const light = new THREE.AmbientLight(0x404040) // soft white light
        this.scene.add(light)

        const spotLight = new THREE.SpotLight(0xffffff)
        spotLight.position.set(100, 1000, 100)
        this.scene.add(spotLight)

        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        
        // box behind chart - todo add texture
        this.createOuterBox()

        // start frame animation for rotation
        this.animate()
    }

    // 0,0,0 is de hoek onderin de kubus het verst van de camera
    // todo change color afterwards! 
    createOuterBox() {
        // plane, facing THREE.FrontSide, BackSide, DoubleSide
        const geometry = new THREE.PlaneGeometry(100, 100, 4, 4)
        const material = new THREE.MeshStandardMaterial({ color: 0x666666, side: THREE.FrontSide })

        const bottom = new THREE.Mesh(geometry, material)
        bottom.rotation.x = THREE.Math.degToRad(-90)
        bottom.position.x = 50
        bottom.position.z = 50

        const back = new THREE.Mesh(geometry, material)
        back.position.x = 50
        back.position.y = 50

        const right = new THREE.Mesh(geometry, material)
        right.rotation.y = THREE.Math.degToRad(-90)
        right.position.x = 100
        right.position.z = 50
        right.position.y = 50

        const left = new THREE.Mesh(geometry, material)
        left.rotation.y = THREE.Math.degToRad(90)
        left.position.y = 50
        left.position.z = 50

        this.group.add(left)
        this.group.add(right)
        this.group.add(back)
        this.group.add(bottom)
    }

    // add one array
    addData(data){
        for (let i = 0; i < data.length; i++) {
            let d = data[i]
            this.addPoint(d[0], d[1], d[2])
        }
        this.color++
    }

    // expects an array with multiple arrays (clusters) - each cluster will get its own color
    addClusters(clusters){
        for(let c of clusters){
            this.addData(c)
        }
    }

    // remove all points
    clearGraph(){
        for(let p of this.points){
            this.group.remove(p)
        }
        this.points = []
    }
    
    addPoint(x, y, z) {

        // https://threejs.org/docs/#api/en/geometries/SphereGeometry
        const geometry = new THREE.SphereGeometry(0.8, 4, 4)
        const material = new THREE.MeshStandardMaterial({ color: this.colors[this.color] })  // r g b between 0 and 1!!
        const sphere = new THREE.Mesh(geometry, material)
        this.group.add(sphere)
        this.points.push(sphere)
        
        sphere.position.x = x
        sphere.position.y = y
        sphere.position.z = z
        
        
        // this.points[0].material.color.setRGB(1, 0, 0) // 0 to 1
        
    }

    animate(){
        this.renderer.render(this.scene, this.camera)
        requestAnimationFrame(() => this.animate())
    }
}



// links
/*
http://localhost/tutorials2020/threejs-datatable/
https://threejs.org/docs/#api/en/lights/SpotLight
https://threejs.org/editor/
https://threejs.org/docs/#api/en/geometries/PlaneGeometry
https://threejs.org/docs/#api/en/math/Sphere
https://threejs.org/docs/#examples/en/controls/OrbitControls
https://threejs.org/docs/#api/en/materials/Material.side
https://threejs.org/docs/#api/en/objects/Group
https://threejs.org/docs/#api/en/math/Color


https://github.com/mljs/kmeans
https://mljs.github.io/kmeans/
https://github.com/mljs/ml

*/
