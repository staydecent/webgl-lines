/* globals THREE */

// renderer
var renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.getElementById('container').appendChild(renderer.domElement)

// scene, plane
var scene = new THREE.Scene()
var imageData
var imageReady = false
var planeTexture = THREE.ImageUtils.loadTexture('gibson.jpg', new THREE.UVMapping(), function (e) {
  imageData = window.getImageData(planeTexture.image)
  imageReady = true
})
var planeMaterial = new THREE.MeshBasicMaterial({ map: planeTexture })
var planeGeometry = new THREE.PlaneGeometry(592, 396)
var plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.position.z = -1

// camera
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000)
camera.position.set(0, -150, 600)
camera.lookAt(plane.position)

// lights
var pointLight = new THREE.PointLight(0xcc00ff)
pointLight.position.set(0, 150, 100)

// lines!
var lineMaterial = new THREE.LineBasicMaterial({color: 0x0000ff, linewidth: 5})

// add to the scene!
scene.add(camera)
// scene.add(plane)
scene.add(pointLight)

// Render atleast once
renderer.render(scene, camera)

;(function drawLoop () {
  window.requestAnimFrame(drawLoop)
  draw()
  update()
})()

var increaseZ = true

// use this for keyboard controls etc.
function update () {
}

// draw yer shit
function draw () {
  // loop camera position
  if (camera.position.z > 980) increaseZ = false
  if (camera.position.z < 20) increaseZ = true

  if (camera.position.z < 1000 && increaseZ) {
    camera.position.z = camera.position.z + 5
  }

  if (camera.position.z > 0 && !increaseZ) {
    camera.position.z = camera.position.z - 5
  }

  // draw lines when image is ready
  if (imageReady) {
    imageReady = false

    // 1 line for every 10 pixels of image height
    for (var y = 0; y <= imageData.height; y = y + 10) {
      var lineGeometry = new THREE.Geometry()
      lineGeometry.vertices = []

      // 1 vertice for every 10 pixels of width
      for (var x = 0; x <= imageData.width; x = x + 10) {
        var colour = window.getPixel(imageData, x, y)
        lineGeometry.vertices.push(new THREE.Vector3(x - (imageData.width / 2), y - (imageData.height / 2), colour.r / 2))
      }

      var line = new THREE.Line(lineGeometry, lineMaterial)
      scene.add(line)
    }
  }

  // render
  renderer.render(scene, camera)
}
