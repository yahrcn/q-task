import React from "react";
import * as THREE from "three";
import Models from "../models";
import { connect } from "react-redux";
import { setData, setId } from "../redux/actions";

const mapStateToProps = (store) => ({
  data: store.data,
  currentId: store.currentId,
});

const mapDispatchToProps = (dispatch) => ({
  setData(data) {
    dispatch(setData(data));
  },
  setId(data) {
    dispatch(setId(data));
  },
});

class Main extends React.Component {
  threejs = React.createRef();
  locations = {};
  downPointer = {};
  lon = 0;
  lat = 0;
  mouseDownLon;
  mouseDownLat;
  phi = 0;
  theta = 0;
  radius = 10;
  dragFactor = 0.125;
  isUserInteracting = false;

  async componentDidMount() {
    fetch("data.json")
      .then((res) => res.json())
      .then((result) => this.props.setData(result));

    document.addEventListener("mousedown", this.onDocumentMouseDown, false);
    document.addEventListener("mousemove", this.onDocumentMouseMove, false);
    document.addEventListener("mouseup", this.onDocumentMouseUp, false);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.target = new THREE.Vector3(0, 0, 0);
    this.renderer = new THREE.WebGLRenderer();

    this.light = new THREE.PointLight(0xff0000, 0.8);
    this.light.position.set(0, 10, 10);
    this.scene.add(this.light);

    this.sphere = new Models.Sphere({ app: this });
    await this.sphere.init(0);
    this.scene.add(this.sphere.mesh);

    // this.sphereOther = new Models.Sphere({ app: this, data: this.props.data });
    // await this.sphereOther.init();
    // this.sphereOther.mesh.position.z = -10;
    // this.scene.add(this.sphereOther.mesh);
    this.animate();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.threejs.current.appendChild(this.renderer.domElement);
  }

  onDocumentMouseDown = (event) => {
    this.downPointer.x = event.clientX;
    this.downPointer.y = event.clientY;
    this.isUserInteracting = true;
    this.mouseDownLat = this.lat;
    this.mouseDownLon = this.lon;
  };

  onDocumentMouseMove = (event) => {
    if (this.isUserInteracting) {
      this.lon =
        (this.downPointer.x - event.clientX) * this.dragFactor +
        this.mouseDownLon;
      this.lat =
        (event.clientY - this.downPointer.y) * this.dragFactor +
        this.mouseDownLat;
    }
  };

  onDocumentMouseUp = (event) => {
    this.downPointer.x = undefined;
    this.downPointer.y = undefined;
    this.isUserInteracting = false;
  };

  animate = () => {
    requestAnimationFrame(this.animate);

    this.lat = Math.max(-85, Math.min(85, this.lat));
    this.phi = THREE.Math.degToRad(90 - this.lat);
    this.theta = THREE.Math.degToRad(this.lon);

    this.camera.target.x =
      this.radius * Math.sin(this.phi) * Math.cos(this.theta);
    this.camera.target.y = this.radius * Math.cos(this.phi);
    this.camera.target.z =
      this.radius * Math.sin(this.phi) * Math.sin(this.theta);
    this.radius = Math.hypot(
      this.camera.target.x,
      this.camera.target.y,
      this.camera.target.z
    );
    this.camera.lookAt(this.camera.target);

    this.renderer.render(this.scene, this.camera);
  };

  render() {
    return <div className="page" ref={this.threejs}></div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
