import * as THREE from "three";
import Common from "./common";
import Location from "./location";
import data from "../data";

export default class Sphere extends Common {
  constructor(props) {
    super(props);
    this.app = props.app;
  }

  init = async () => {
    return new Promise((resolve) => {
      this.location = new Location({ path: data[0].path });
      this.location.load().then((texture) => {
        this.geometry = new THREE.SphereGeometry(1, 32, 32);
        this.material = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.DoubleSide,
        });
        this.mesh = this.createMesh(this.geometry, this.material);
        this.location.setArrows(this.app);
        resolve(this);
      });
    });
  };
}
