import { element } from '../../utils/html-utils.js';
import searchControlComponent from './controls/search-control.js';
import galleryControls from './controls/controls.js';
import galleryImageGrid from './image-grid/image-grid.js';
import staticDb from '../../resources/static-images-db.js';

export default function inst(imageFinder) {
  let searchControl = searchControlComponent(
    event => display(search(event.target.value))
  );
  let controls = galleryControls(searchControl);
  let imageGrid = galleryImageGrid();

  let element = galleryElement(controls.element, imageGrid.element);

  display(staticDb);

  return Object.freeze({
    get element() {
      return element;
    }
  });

  function search(query) {
    return query ? imageFinder.search(query).images : staticDb;
  }

  function display(images) {
    imageGrid.display(images);
  }
}

function galleryElement(...children) {
  return element({
    tag: "div",
    classes: "gallery",
    children
  });
}