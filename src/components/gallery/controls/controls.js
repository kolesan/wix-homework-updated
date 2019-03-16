import { element } from '../../../utils/HtmlUtils.js';
import searchControlComponent from './search-control.js';

export default function inst() {
  let element = galleryControlsElement();
  return Object.freeze({
    get element() {
      return element;
    }
  });
}

function galleryControlsElement() {
  let searchControl = searchControlComponent("search");

  return element({
    tag: "div",
    classes: "gallery__controls",
    children: [
      searchControl.element,
      logo(),
    ]
  })
}

function logo() {
  return element({
    tag: "img",
    classes: "wix_logo",
    attributes: {
      src: "../../resources/images/wix-white-horizontal-winking.svg"
    }
  })
}