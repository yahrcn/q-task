import * as THREE from "three";
import Common from "./common";

export default class Arrow extends Common {
  description;
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

    this.mesh.description = siblingsData.description;
    const direction = this.app.getDirection(
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
}
