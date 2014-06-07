function getImageData(image) {
  var canvas = document.createElement( 'canvas' );
  canvas.width = image.width;
  canvas.height = image.height;

  var context = canvas.getContext( '2d' );
  context.drawImage( image, 0, 0 );

  return context.getImageData( 0, 0, image.width, image.height );
}

function getPixel(imagedata, x, y) {
  var position = ( x + imagedata.width * y ) * 4, data = imagedata.data;
  return { r: data[ position ], g: data[ position + 1 ], b: data[ position + 2 ], a: data[ position + 3 ] };
}

function drawGrayscaleImage(context, imageObj) {
  context.drawImage(imageObj, 0, 0, imageObj.clientWidth, imageObj.clientHeight);

  var imageData = context.getImageData(0, 0, imageObj.width, imageObj.height);
  var data = imageData.data;

  for (var i = 0; i < data.length; i += 4) {
    var brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
    // red
    data[i] = brightness;
    // green
    data[i + 1] = brightness;
    // blue
    data[i + 2] = brightness;
  }

  // overwrite original image
  context.putImageData(imageData, 0, 0);
}
