// renderer
var renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
$('#container').append(renderer.domElement)

// scene, plane
var scene = new THREE.Scene()
var imageData, imageReady = false
var planeTexture = new THREE.ImageUtils.loadTexture('gibson.jpg', new THREE.UVMapping(), function(e){ 
    imageData = getImageData(planeTexture.image)
    imageReady = true
})
var planeMaterial = new THREE.MeshBasicMaterial({ map: planeTexture })
var planeGeometry = new THREE.PlaneGeometry(592, 396)
var plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.position.z = -1

// camera
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.set(0, -150, 600)
camera.lookAt(plane.position)

// lights
var pointLight = new THREE.PointLight(0xcc00ff)
pointLight.position.set(0, 150, 100)

// lines!
var lineMaterial = new THREE.LineBasicMaterial({ color: 0xffee00 })

// add to the scene!
scene.add(camera)
// scene.add(plane)
scene.add(pointLight)

// Render atleast once
renderer.render(scene, camera)