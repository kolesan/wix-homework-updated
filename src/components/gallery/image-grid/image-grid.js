import { element, removeChildNodes } from '../../../utils/html-utils.js';
import imageGridItem from './image-grid-item.js';

export default function inst() {
  let element = imageGridElement();

  return Object.freeze({
    get element() {
      return element
    },
    display(images) {
      clear();
      images.map(imageGridItem)
        .forEach(displayItem);
    }
  });

  function clear() {
    removeChildNodes(element);
  }

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