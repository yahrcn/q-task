import * as THREE from "three";
import Common from "./common";

export default class Arrow extends Common {
  constructor(props) {
    super(props);
    this.app = props.app;
    this.id = props.id;
    this.data = props.app.props.data;
    this.currentId = props.app.props.currentId;
    this.createTriangle();
  }

  createTriangle = () => {
    this.triangleShape = new THREE.Shape()
      .moveTo(0, 0)
      .lineTo(0.05, 0.2)
      .lineTo(-0.05, 0.2)
      .lineTo(0, 0);
    this.extrudeSettings = { depth: 0.01, bevelEnabled: false };
    this.geometry = new THREE.ExtrudeBufferGeometry(
      this.triangleShape,
      this.extrudeSettings
    );
    this.material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    this.mesh = this.createMesh(this.geometry, this.material);

    let currentData = this.data[this.currentId];
    let siblings = this.data[this.currentId].siblings;
    let siblingsData = this.data[siblings[siblings.indexOf(this.id)]];

    const direction = this.getDirection(
      currentData.coords,
      siblingsData.coords
    );

    this.mesh.position.set(
      direction.x * 0.65,
      direction.y - 0.3,
      direction.z * 0.65
    );
    this.mesh.lookAt(direction.x, direction.y, direction.z);
    this.mesh.rotateX(THREE.Math.degToRad(-45));
  };

  getDirection(currentCoords, siblingCoords) {
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
  }
}
