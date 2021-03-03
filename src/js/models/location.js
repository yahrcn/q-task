import * as THREE from "three";
import Arrow from "./arrow";

export default class Location {
  constructor(props) {
    this.path = props.path;
    this.app = props.app;
    this.id = props.id;
    this.siblings = props.siblings;
    this.arrows = {};
    this.direction = 0;
    if (props.direction) {
      this.direction = props.direction;
    }
  }

  load = () => {
    return new Promise((resolve) => {
      new THREE.TextureLoader().load(this.path, (texture) => {
        this.texture = texture;
        resolve(texture);
      });
    });
  };

  setArrows = () => {
    return new Promise((resolve) => {
      let arrows = {};
      resolve(
        this.siblings.map((id) => {
          arrows[id] = new Arrow({ id, app: this.app });
          arrows[id].mesh.name = "arrow";
          this.app.scene.add(arrows[id].mesh);
          this.arrows = arrows;
          return arrows[id];
        })
      );
    });
  };
}
