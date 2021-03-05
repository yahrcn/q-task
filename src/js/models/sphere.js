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

  init = async (id = 0, opacity = 1) => {
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
          wireframe: false,
          transparent: true,
          opacity: opacity,
        });
        this.mesh = this.createMesh(this.geometry, this.material);
        this.mesh.scale.set(-1, 1, -1);
        this.location.siblings = this.data[id].siblings;
        this.location.siblings.forEach((key) => {
          let location = this.app.locations[key];
          if (!location) {
            location = this.app.locations[key] = new Location({
              app: this.app,
              ...this.data[key],
            });
          }

          if (!location.texture) {
            location.load();
          }
        });
        this.location.app = this.app;
        this.location.id = id;
        if (this.data[id].direction) {
          this.mesh.rotation.y = THREE.MathUtils.degToRad(
            this.data[id].direction
          );
        }
        resolve(this);
      });
    });
  };

  changeTo = async (index, needArrows = true) => {
    let location = this.app.locations[index];
    if (!location) {
      location = this.app.locations[index] = new Location({
        app: this.app,
        ...this.data[index],
      });
    }

    if (!location.texture) {
      await location.load();
    }

    this.mesh.material.map = location.texture;
    this.app.props.setId(index);
    this.mesh.rotation.y = THREE.MathUtils.degToRad(location.direction);
    if (needArrows)
      location.setArrows().then((result) => (this.app.arrows = result));
  };
}
