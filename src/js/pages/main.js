import React from "react";
import * as THREE from "three";
import Models from "../models";

export default class Main extends React.Component {
  locations = {};
  async componentDidMount() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.renderer = new THREE.WebGLRenderer();
    this.light = new THREE.PointLight(0xff0000, 0.8);
    this.light.position.set(0, 10, 10);
    this.scene.add(this.light);

    this.sphere = new Models.Sphere({ app: this });
    await this.sphere.init();
    this.scene.add(this.sphere.mesh);

    this.sphereOther = new Models.Sphere({ app: this });
    await this.sphereOther.init();
    this.sphereOther.mesh.position.z = -10;
    this.scene.add(this.sphereOther.mesh);
    this.camera.position.z = 1;

    this.animate = () => {
      requestAnimationFrame(this.animate);
      this.renderer.render(this.scene, this.camera);
    };
    this.animate();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("threejs").appendChild(this.renderer.domElement);
  }
  render() {
    return <div className="page" id="threejs"></div>;
  }
}
