import { element, removeChildNodes } from '../../../utils/html-utils.js';
import imageGridItem from './image-grid-item.js';
import newGrid from '../../../utils/grid.js';

export default function inst() {
  let element = imageGridElement();
  return Object.freeze({
    get element() {
      return element
    },
    clear() {
      removeChildNodes(element);
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
    element.appendChild(item.element);
  }
}


function imageGridElement() {
  return element({
    tag: "div",
    classes: "image_grid"
  })
}