import { element } from '../../../utils/html-utils.js';
import imageGridItem from './image-grid-item.js';
import newGrid from '../../../utils/grid.js';
import { removeChildNodes } from '../../../utils/html-utils.js';

export default function inst() {
  let imageGrid = imageGridElement();
  return Object.freeze({
    get element() {
      return imageGrid
    },
    clear() {
      removeChildNodes(imageGrid);
    },
    display(images) {
      this.clear();
      let grid = newGrid(4);

      images
        .map(imageGridItem)
        .forEach(gridItem => {
          let { x, y } = grid.position(gridItem.w, gridItem.h);
          gridItem.position(x, y);
          displayItem(gridItem);
        });
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