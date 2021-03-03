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

  init = async (id = 0) => {
    return new Promise((resolve) => {
      this.location = new Location({
        path: this.data[id].path,
        ...this.data[id],
      });
      this.location.load().then((texture) => {
        this.geometry = new THREE.SphereGeometry(1, 32, 32);
        this.material = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.DoubleSide,
        });
        this.mesh = this.createMesh(this.geometry, this.material);
        this.mesh.scale.set(-1, 1, -1);
        this.location.siblings = this.data[id].siblings;
        this.location.app = this.app;
        this.location.id = id;
        if (this.data[id].direction) {
          this.mesh.rotation.y = THREE.MathUtils.degToRad(
            this.data[id].direction
          );
        }
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
