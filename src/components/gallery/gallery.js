import { element } from '../../utils/html-utils.js';
import moduleSelectControlComponent from './controls/module-select-control.js';
import searchControlComponent from './controls/search-control.js';
import galleryControls from './controls/controls.js';
import galleryImageGrid from './image-grid/image-grid.js';
import staticDb from '../../resources/static-images-db.js';

export default function inst(middleware) {
  let moduleSelectControl = moduleSelectControlComponent(event => {
    console.log("Selection changed", searchControl.value, event.target.value);
    triggerSearch(searchControl.value, event.target.value);
  });
  let searchControl = searchControlComponent(event => {
    triggerSearch(event.target.value, moduleSelectControl.value);
  });
  let controls = galleryControls(moduleSelectControl.element, searchControl.element);
  let imageGrid = galleryImageGrid();

  let element = galleryElement(controls.element, imageGrid.element);

  display(staticDb);

  return Object.freeze({
    get element() {
      return element;
    }
  });

  function triggerSearch(query, moduleId) {
    search(query, moduleId)
      .then(result => display(result.images))
      .catch(err => console.warn("Error while searching for photos: ", err));
  }

  function search(query, moduleId) {
    return query ? middleware.search(query, moduleId) : Promise.resolve({images: staticDb});
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