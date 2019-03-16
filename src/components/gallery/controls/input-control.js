import { element, textNode } from '../../../utils/HtmlUtils.js';

export default function inst(label) {
  let element = inputControlElement(label);
  return Object.freeze({
    get element() {
      return element;
    }
  });
}

function inputControlElement(label) {
  return element({
    tag: "label",
    classes: "gallery__controls__item gallery__controls__input label",
    children: [
      textNode(label),
      element({
        tag: "input",
        classes: "gallery__controls__input input"
      })
    ]
  })
}
