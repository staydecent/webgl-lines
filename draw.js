;(function drawLoop(){
    requestAnimFrame(drawLoop)
    draw()
    update()
})()

var increaseZ = true
var increaseY = true

// use this for keyboard controls etc.
function update() {
}

// draw yer shit
function draw() {
    // loop camera position
    if (camera.position.z > 980) increaseZ = false
    if (camera.position.z < 20)  increaseZ = true

    if (camera.position.z < 1000 && increaseZ) {
        camera.position.z = camera.position.z + 10
    }

    if (camera.position.z > 0 && !increaseZ) {
        camera.position.z = camera.position.z - 10
    }

    // draw lines when image is ready
    if (imageReady) {
        imageReady = false

        // 1 line for every 10 pixels of image height
        for (var y = 0; y <= imageData.height; y=y+10) {
            var lineGeometry = new THREE.Geometry()
            lineGeometry.vertices = []

            // 1 vertice for every 10 pixels of width
            for (var x = 0; x<=imageData.width; x=x+10) {
                var colour = getPixel(imageData, x, y)
                lineGeometry.vertices.push(new THREE.Vector3(x - (imageData.width / 2), y - (imageData.height / 2), colour.r))
            }

            var line = new THREE.Line(lineGeometry, lineMaterial)
            scene.add(line)
        }
    }

    // render
    renderer.render(scene, camera)
}