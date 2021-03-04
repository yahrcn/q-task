import React from "react";
import * as THREE from "three";
import Models from "../models";
import { connect } from "react-redux";
import { setData, setId, setTooltip, setMouse } from "../redux/actions";
import TWEEN from "@tweenjs/tween.js";

const mapStateToProps = (store) => ({
  data: store.data,
  currentId: store.currentId,
  tooltip: store.tooltip,
  mouse: store.mouse,
});

const mapDispatchToProps = (dispatch) => ({
  setData(data) {
    dispatch(setData(data));
  },
  setId(id) {
    dispatch(setId(id));
  },
  setTooltip(text) {
    dispatch(setTooltip(text));
  },
  setMouse(mouse) {
    dispatch(setMouse(mouse));
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
  arrows = [];
  isUserInteracting = false;
  inAnimation = false;
  detectClick = false;
  mouse = new THREE.Vector2();

  async componentDidMount() {
    let result = await fetch("/data.json").then((res) => res.json());
    this.props.setData(result);

    document.addEventListener("mousedown", this.onDocumentMouseDown, false);
    document.addEventListener("mousemove", this.onDocumentMouseMove, false);
    document.addEventListener("mouseup", this.onDocumentMouseUp, false);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf0f0f0);
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.target = new THREE.Vector3(0, 0, 0);
    this.renderer = new THREE.WebGLRenderer();
    this.raycaster = new THREE.Raycaster();

    this.light = new THREE.PointLight(0xff0000, 0.8);
    this.light.position.set(0, 10, 10);
    this.scene.add(this.light);

    this.sphere = new Models.Sphere({ app: this });
    this.props.setId(0);
    await this.sphere.init(this.props.currentId);
    this.sphere.mesh.name = "main";
    this.scene.add(this.sphere.mesh);

    this.sphereOther = new Models.Sphere({ app: this });
    await this.sphereOther.init(0, 0);
    this.sphereOther.mesh.name = "other";
    this.sphereOther.mesh.position.z = -10;
    this.scene.add(this.sphereOther.mesh);

    this.sphere.changeTo(0);
    this.animate();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.threejs.current.appendChild(this.renderer.domElement);
  }

  onDocumentMouseDown = (event) => {
    this.downPointer.x = event.clientX;
    this.downPointer.y = event.clientY;
    this.isUserInteracting = true;
    this.detectClick = true;
    this.mouseDownLat = this.lat;
    this.mouseDownLon = this.lon;
  };

  onDocumentMouseMove = (event) => {
    this.detectClick = false;
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    this.props.setMouse({
      left: event.clientX + 20,
      top: event.clientY,
    });

    let arrow = this.detectMouseOnArrow();
    if (arrow) {
      if (this.props.tooltip !== arrow.object.description) {
        this.props.setTooltip(arrow.object.description);
      }
    } else this.props.setTooltip("");

    if (this.isUserInteracting && !this.inAnimation) {
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
    let arrow = this.detectMouseOnArrow();
    if (arrow && this.detectClick) {
      this.cameraToMarker(arrow);
      this.inAnimation = true;
    }
    this.isUserInteracting = false;
  };

  getDirection = (currentCoords, siblingCoords) => {
    const directionVector = {
      x: siblingCoords.x - currentCoords.x,
      y: siblingCoords.y - currentCoords.y,
      z: siblingCoords.z - currentCoords.z,
    };
    const directionVectorLength = Math.hypot(
      directionVector.x,
      directionVector.y,
      directionVector.z
    );
    return {
      x: directionVector.x / directionVectorLength,
      y: directionVector.y / directionVectorLength,
      z: directionVector.z / directionVectorLength,
    };
  };

  detectMouseOnArrow = () => {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    let intersects = this.raycaster.intersectObjects(this.scene.children);
    if (intersects && intersects.length) {
      let arrow = intersects.find(({ object: { name } }) => name === "arrow");
      if (arrow) return arrow;
    }
    return false;
  };

  cameraToMarker = (arrow) => {
    this.props.setTooltip("");
    this.arrows.forEach((arrow) => {
      this.scene.remove(arrow.mesh);
    });
    this.arrows = [];

    const siblingData = this.props.data.find(
      ({ id }) => id === arrow.object.arrowId
    );
    const currentData = this.props.data.find(
      ({ id }) => id === this.props.currentId
    );
    const direction = this.getDirection(currentData.coords, siblingData.coords);
    const newCoords = {
      x: direction.x,
      y: direction.y,
      z: direction.z,
    };
    this.camera.target.x = newCoords.x;
    this.camera.target.y = 0;
    this.camera.target.z = newCoords.z;
    this.radius = Math.hypot(newCoords.x, newCoords.y, newCoords.z);
    this.phi = Math.acos(newCoords.y / this.radius);
    this.theta = Math.atan2(newCoords.z, newCoords.x);
    this.lon = THREE.Math.radToDeg(this.theta);
    this.lat = 90 - THREE.Math.radToDeg(this.phi);

    this.sphereOther.mesh.position.set(newCoords.x, newCoords.y, newCoords.z);
    this.sphereOther.changeTo(arrow.object.arrowId, false);

    let settings = {
      x: this.sphereOther.mesh.position.x,
      y: this.sphereOther.mesh.position.y,
      z: this.sphereOther.mesh.position.z,
      opacityMain: 1,
      opacityOther: 0,
    };

    setTimeout(() => {
      new TWEEN.Tween(settings)
        .to(
          {
            x: this.sphere.mesh.position.x,
            y: this.sphere.mesh.position.y,
            z: this.sphere.mesh.position.z,
            opacityMain: 0,
            opacityOther: 1,
          },
          700
        )
        .onUpdate(() => {
          this.sphereOther.mesh.material.opacity = settings.opacityOther;
          this.sphereOther.mesh.position.set(
            settings.x,
            settings.y,
            settings.z
          );
          this.sphere.mesh.material.opacity = settings.opacityMain;
        })
        .easing(TWEEN.Easing.Quadratic.Out)
        .start()
        .onComplete(() => {
          this.sphere.changeTo(arrow.object.arrowId);
          this.sphereOther.mesh.position.set(0, 0, -10);
          this.sphereOther.mesh.material.opacity = 0;
          this.sphere.mesh.material.opacity = 1;
          this.inAnimation = false;
        });
    }, 700);
  };

  animate = (time) => {
    TWEEN.update(time);
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
    return (
      <>
        <div className="page" ref={this.threejs}></div>
        {this.props.tooltip && (
          <div
            className="tooltip"
            style={{ left: this.props.mouse.left, top: this.props.mouse.top }}
          >
            {this.props.tooltip}
          </div>
        )}
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
