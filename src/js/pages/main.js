import React from "react";
import * as THREE from "three";
import Models from "../models";
import { connect } from "react-redux";
import { setData } from "../redux/actions";

const mapStateToProps = (store) => ({
  data: store.data,
});

const mapDispatchToProps = (dispatch) => ({
  setData(data) {
    dispatch(setData(data));
  },
});

class Main extends React.Component {
  locations = {};
  async componentDidMount() {
    fetch("data.json")
      .then((res) => res.json())
      .then((result) => this.props.setData(result));
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

    this.sphere = new Models.Sphere({ app: this, data: this.props.data });
    await this.sphere.init();
    this.scene.add(this.sphere.mesh);

    this.sphereOther = new Models.Sphere({ app: this, data: this.props.data });
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
    console.log(this.props);
    return <div className="page" id="threejs"></div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
