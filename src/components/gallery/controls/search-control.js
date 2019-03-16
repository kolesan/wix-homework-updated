import { decorateElement } from '../../../utils/HtmlUtils.js';
import inputControlComponent from './input-control.js'

export default function inst() {
  let element = searchControlElement("search");
  return Object.freeze({
    get element() {
      return element;
    }
  });
}

function searchControlElement(label) {
  let inputControl = inputControlComponent(label);
  return inputControl.element;
}
