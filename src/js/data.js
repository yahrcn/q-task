import pano_1 from "../locations/pano_1.png";
import pano_2 from "../locations/pano_2.png";
import pano_2_1 from "../locations/pano_2_1.png";
import pano_2_2 from "../locations/pano_2_2.png";
import pano_2_2_1 from "../locations/pano_2_2_1.png";
import pano_3 from "../locations/pano_3.png";
import pano_4 from "../locations/pano_4.png";
import pano_4_1 from "../locations/pano_4_1.png";

export const data = [
  {
    id: 0,
    path: pano_1,
    coords: {
      x: 0,
      y: 0,
      z: 0,
    },
    desctiption: "центр перекрестка",
    siblings: [1, 2, 3],
  },
  {
    id: 1,
    path: pano_2,
    coords: {
      x: 1,
      y: 0,
      z: 0,
    },
    desctiption: "у пекарни",
    siblings: [0, 5],
    direction: 130,
  },
  {
    id: 2,
    path: pano_3,
    coords: {
      x: 1.5,
      y: 0,
      z: 1,
    },
    desctiption: "возле рекламы",
    siblings: [0],
    direction: 90,
  },
  {
    id: 3,
    path: pano_4,
    coords: {
      x: -1,
      y: 0,
      z: 0,
    },
    desctiption: "напротив пекарни",
    siblings: [0, 7],
  },
  {
    id: 5,
    path: pano_2_2,
    coords: {
      x: 1,
      y: 0,
      z: -10,
    },
    desctiption: "слева от пекарни",
    siblings: [1, 6],
    direction: 90,
  },
  {
    id: 6,
    path: pano_2_2_1,
    coords: {
      x: 1,
      y: 0,
      z: -20,
    },
    desctiption: "еще левее пекарни",
    siblings: [5],
    direction: 90,
  },
  {
    id: 7,
    path: pano_4_1,
    coords: {
      x: -2,
      y: 0,
      z: 0,
    },
    desctiption: "еще дальше от пекарни",
    siblings: [3],
  },
];

export default data;
