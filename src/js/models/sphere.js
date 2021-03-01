import * as THREE from "three";
import Common from "./common";
import Location from "./location";

export default class Sphere extends Common {
  constructor(props) {
    super(props);
    this.app = props.app;
    this.data = props.data;
  }

  init = async () => {
    console.log(this);
    return new Promise((resolve) => {
      this.location = new Location({ path: "locations/pano_1.png" });
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
