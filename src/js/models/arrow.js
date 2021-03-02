import * as THREE from "three";
import Common from "./common";

export default class Arrow extends Common {
  constructor(props) {
    super(props);
    this.app = props.app;
    this.id = props.id;
    this.createTriangle();
  }

  createTriangle = () => {
    this.triangleShape = new THREE.Shape()
      .moveTo(0, 0)
      .lineTo(-0.25, 0.5)
      .lineTo(0.25, 0.5)
      .lineTo(0, 0);

    this.extrudeSettings = { depth: 0.03, bevelEnabled: false };
    this.geometry = new THREE.ExtrudeBufferGeometry(
      this.triangleShape,
      this.extrudeSettings
    );
    this.material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    this.mesh = this.createMesh(this.geometry, this.material);
    this.mesh.position.set(0, -0.5, 0);
    this.mesh.rotation.x = -1.6;
  };
}
