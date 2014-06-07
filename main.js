// renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
$('#main').append(renderer.domElement);

// records webcam, outputting to <video>
var video = document.querySelector('video');
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var localMediaStream = null;
var once = true;


setTimeout(function() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  once = false;
}, 4000);

var errorCallback = function(e) {
  console.log('Reeeejected!', e);
};
var vgaConstraints = {
  video: {
    mandatory: {
      maxWidth: 480,
      maxHeight: 360
    }
  }
};
navigator.webkitGetUserMedia(vgaConstraints, function(stream) {
  video.src = window.URL.createObjectURL(stream);
  localMediaStream = stream;
}, errorCallback);

// scene, plane
var scene = new THREE.Scene();
var clearScene = function() {
  var objsToRemove = scene.children;
  var index = 0;
  objsToRemove.forEach(function(object) {
    if (index++ === 1) return;
    scene.remove(object);
  });
};


// camera
var width = window.innerWidth;
var height = window.innerHeight;
var camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );

camera.position.set(0, -150, 600);

// lights
var pointLight = new THREE.PointLight(0xcc00ff);
pointLight.position.set(0, 150, 100);

// lines!
var lineMaterial = new THREE.LineBasicMaterial({ color: 0xffee00 });

// add to the scene!
scene.add(camera);
scene.add(pointLight);

// Render atleast once
renderer.render(scene, camera);
