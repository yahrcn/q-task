import * as THREE from "three";

export default class Common {
  createMesh = (geometry, material) => new THREE.Mesh(geometry, material);
}
