window.getPixel = getPixel

function getPixel (imagedata, x, y) {
  y = imagedata.height - y
  x = imagedata.width - x
  var position = (x + imagedata.width * y) * 4
  var data = imagedata.data
  return {
    r: data[position],
    g: data[position + 1],
    b: data[position + 2],
    a: data[position + 3]
  }
}
