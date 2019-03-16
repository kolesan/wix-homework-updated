import { element } from '../../../utils/html-utils.js';
import imageGridItem from './image-grid-item.js';
import newGrid from '../../../utils/grid.js';

export default function inst() {
  let imageGrid = imageGridElement();
  return Object.freeze({
    get element() {
      return imageGrid
    },
    display(images) {
      let gridItemComponents = images.map(imageGridItem);

      let grid = newGrid(3);

      for(let item of gridItemComponents) {
        let { x, y } = grid.position(item.w, item.h);
        item.position(x, y);
        displayItem(item);
      }
    }
  });

  function displayItem(item) {
    imageGrid.appendChild(item.element);
  }
}


function imageGridElement() {
  return element({
    tag: "div",
    classes: "image_grid"
  })
}