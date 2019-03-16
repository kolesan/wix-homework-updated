import { element } from '../../utils/html-utils.js';
import searchControlComponent from './controls/search-control.js';
import galleryControls from './controls/controls.js';
import galleryImageGrid from './image-grid/image-grid.js';
import staticDb from '../../resources/static-images-db.js';

export default function inst(imageFinder) {
  let searchControl = searchControlComponent(
    event => imageGrid.display(imageFinder.search(event.target.value).images)
  );
  let controls = galleryControls(searchControl);
  let imageGrid = galleryImageGrid();

  let element = galleryElement(controls.element, imageGrid.element);

  imageGrid.display(staticDb);

  return Object.freeze({
    get element() {
      return element;
    }
  });
}

function galleryElement(...children) {
  return element({
    tag: "div",
    classes: "gallery",
    children
  });
}