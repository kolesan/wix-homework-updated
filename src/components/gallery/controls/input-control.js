import { element, textNode } from '../../../utils/html-utils.js';

export default function inst(label, onInput) {
  let element = inputControlElement(label, onInput);
  return Object.freeze({
    get element() {
      return element;
    }
  });
}

function inputControlElement(label, onInput) {
  return element({
    tag: "label",
    classes: "gallery__controls__item gallery__controls__input label",
    listeners: {
      input: onInput
    },
    children: [
      textNode(label),
      element({
        tag: "input",
        classes: "gallery__controls__input input"
      })
    ]
  })
}
