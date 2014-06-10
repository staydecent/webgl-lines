;(function drawLoop(){
  requestAnimFrame(drawLoop);
  draw();
  update();
})();

var increaseZ = true;
var increaseY = true;

var imageData, imageReady = false;


// use this for keyboard controls etc.
// -- we copy the webcam frame to our other canvas
function update() {
  clearScene(); // clears last scenes lines

  // if webcam is streaming to <video>
  if (localMediaStream) {
    // each frame, capture <video> to <canvas>
    ctx.drawImage(video, 0, 0, video.clientWidth, video.clientHeight);

    var image = ctx.getImageData(0, 0, video.clientWidth, video.clientHeight);
    var data = image.data;

    for (var i = 0; i < data.length; i += 4) {
      var r = data[i];
      var g = data[i+1];
      var b = data[i+2];
      // CIE luminance for the RGB
      // The human eye is bad at seeing red and blue, so we de-emphasize them.
      var v = 0.2126*r + 0.7152*g + 0.0722*b;
      data[i] = data[i+1] = data[i+2] = v;
    }

    // overwrite original image with grayscale/dimmed version
    ctx.putImageData(image, 0, 0);
    imageData = ctx.getImageData(0, 0, image.width, image.height);
    imageReady = true;
  }
}

// draw yer shit
function draw() {
  // draw lines when image is ready
  if (imageReady) {
    imageReady = false;

    var lineMaterial = new THREE.LineBasicMaterial({ color: 0xffee00 });
    var spacing = 2;

    // 1 line for every 10 pixels of image height
    for (var y = 0; y <= imageData.height; y=y+spacing) {
      var lineGeometry = new THREE.Geometry();
      lineGeometry.vertices = [];

      // 1 vertice for every 10 pixels of width
      for (var x = 0; x<=imageData.width; x=x+spacing) {
        var colour = getPixel(imageData, x, y);
        lineGeometry.vertices.push(
          new THREE.Vector3(x - (imageData.width / 2), y - (imageData.height / 2), colour.g));
      }

      var line = new THREE.Line(lineGeometry, lineMaterial);
      scene.add(line);
    }
  }

  // render
  renderer.render(scene, camera);
}
