import * as THREE from "three";
import Arrow from "./arrow";

export default class Location {
  constructor(props) {
    this.path = props.path;
    this.app = props.app;
    this.id = props.id;
    this.siblings = props.siblings;
    this.arrows = {};
  }

  load = () => {
    return new Promise((resolve) => {
      new THREE.TextureLoader().load(this.path, (texture) => {
        this.texture = texture;
        resolve(texture);
      });
    });
  };

  setArrows = (app) => {
    this.arrows = {};
    return new Promise((resolve) => {
      this.arrows[0] = new Arrow();
      app.scene.add(this.arrows[0].mesh);
      resolve();
    });
  };
}
