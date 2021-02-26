import React from "react";
import * as THREE from "three";

export default class Main extends React.Component {
  componentDidMount() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("threejs").appendChild(renderer.domElement);

    const planeGeometry = new THREE.PlaneGeometry(35, 35);
    const planeMaterial = new THREE.MeshBasicMaterial({
      color: 0x0000ff,
      side: THREE.DoubleSide,
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.y = -5;
    plane.rotation.x = -1.1;
    plane.rotation.z = -0.5;
    scene.add(plane);

    const sphereGeometry = new THREE.SphereGeometry(6, 30, 30);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.z = 10;
    sphere.rotation.x = 0.3;
    scene.add(sphere);

    camera.position.z = 40;

    const animate = function () {
      requestAnimationFrame(animate);

      sphere.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();
  }
  render() {
    return <div className="page" id="threejs"></div>;
  }
}
