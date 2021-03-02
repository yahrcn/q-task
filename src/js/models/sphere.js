import * as THREE from "three";
import Common from "./common";
import Location from "./location";

export default class Sphere extends Common {
  constructor(props) {
    super(props);
    this.app = props.app;
    this.data = props.app.props.data;
    this.setId = props.setId;
  }

  init = async (id) => {
    console.log(this.app.props.data);
    return new Promise((resolve) => {
      this.location = new Location({ path: "locations/pano_1.png" });
      this.location.load().then((texture) => {
        this.geometry = new THREE.SphereGeometry(1, 32, 32);
        this.material = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.DoubleSide,
        });
        this.mesh = this.createMesh(this.geometry, this.material);
        this.location.siblings = this.app.props.data[0].siblings;
        this.location.app = this.app;
        this.location.setArrows();
        resolve(this);
      });
    });
  };

  changeTo = async (index) => {
    let nextLocation = this.app.locations[index];
    let _data = this.app.props.data[index];
    if (!nextLocation) {
      nextLocation = this.app.locations[index] = new Location({
        app: this.app,
        ..._data,
      });
    }

    if (!nextLocation.texture) {
      await nextLocation.load();
    }

    this.mesh.material.map = nextLocation.texture;
    nextLocation.setArrows();
  };
}
