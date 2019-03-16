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

      let grid = newGrid(3, images.length);

      for(let item of gridItemComponents) {
        let position = grid.position(item.w, item.h);
        let { x, y } = position;

        if (x === undefined) {
          console.error("Can not fit all items on the grid");
          break;
        }

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