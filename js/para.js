/*
 * Copyright (c) 2019 para.js George Kontus
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

	//Setup AFrame
 
	AFRAME.registerComponent('cannon-ball', {
 init: function() {

  var markerEl = document.getElementById("cannonMarker");

  var sceneView = document.querySelector('a-scene');
  sceneView.addEventListener("click", function(e) {

   if (markerEl.object3D.visible === false) {
    return;
   }
   
   var cannonPos = markerEl.getAttribute('position');
   var cannonRot = markerEl.getAttribute('rotation');
   var v = new THREE.Vector3();
   var speed = 17;
   
    //Setting up cannon
   
   var cannonSetPos = document.getElementById("cannon");
   var cannonSetRot = document.getElementById("cannon");
   cannonSetPos.setAttribute('position', cannonPos);
   cannonSetRot.setAttribute('rotation', cannonRot);
   
   //Create new entity 
   
   var cannonBall = document.createElement('a-entity');
   cannonBall.setAttribute('id', 'cannonBall');
   cannonBall.setAttribute('velocity', v);
   cannonBall.setAttribute('position', cannonPos);
   cannonBall.setAttribute('geometry', 'primitive: sphere; radius: 0.25');
   cannonBall.setAttribute('dynamic-body', 'mass: 1');
   var scene = document.querySelector('a-scene');
   scene.appendChild(cannonBall);
   
   //Parabolic Curve
   
   v.x = Math.sin(cannonRot.y * Math.PI / 180) * Math.cos(cannonRot.x * Math.PI / 180) * -speed;
   
   v.y = Math.sin(cannonRot.x * Math.PI / 180) * speed;
   
   v.z = Math.cos(cannonRot.y * Math.PI / 180) * Math.cos(cannonRot.x * Math.PI / 180) * -speed;

  

  })
 }
});

	//Setup Effects

AFRAME.registerComponent('CollisionEffects', {
 init: function() {

 
  var targetElement = document.getElementById('target');
	//collider
  targetElement.addEventListener('collide', function(e) {
   if (e.detail.body.el.id === 'cannonBall') {

    var effect = document.createElement('a-entity');
    var position = e.detail.body.el.getAttribute('position');
    effect.setAttribute('position', position);
    effect.setAttribute('particle-system', 'color:#FFF,#44CC00;particleCount:500;duration:0.2;');
    var scene = document.querySelector('a-scene');
    scene.appendChild(effect);
	
	
	
   };
  });
 }
});