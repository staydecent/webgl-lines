// node refs and globals
var video = document.querySelector('video');
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var localMediaStream = null;
var once = true;

setTimeout(function() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  once = false;
}, 2000);

// webcam
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

// scene, camera, render
var scene = new THREE.Scene();
var clearScene = function() {
  var objsToRemove = scene.children;
  var index = 0;
  objsToRemove.forEach(function(object) {
    if (index++ === 1) return;
    scene.remove(object);
  });
};

var aspect = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
camera.position.z = 500;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

