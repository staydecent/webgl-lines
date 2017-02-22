window.getImageData = function (image) {
  var canvas = document.createElement('canvas')
  canvas.width = image.width
  canvas.height = image.height

  var context = canvas.getContext('2d')
  context.drawImage(image, 0, 0)

  return context.getImageData(0, 0, image.width, image.height)
}

window.getPixel = function (imagedata, x, y) {
  var position = (x + imagedata.width * y) * 4
  var data = imagedata.data
  return {
    r: data[position],
    g: data[position + 1],
    b: data[position + 2],
    a: data[position + 3]
  }
}
