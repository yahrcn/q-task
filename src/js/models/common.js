import { Mesh } from "three";

export default class Common {
  createMesh = (geometry, material) => new Mesh(geometry, material);
}
