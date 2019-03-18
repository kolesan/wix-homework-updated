import { element, textNode } from '../../../utils/html-utils.js';

export default function inst(text, onInput) {
  let input = inputElement(onInput);
  let label = labelElement(text, input);
  return Object.freeze({
    get value() {
      return input.value;
    },
    get element() {
      return label;
    }
  });
}

function labelElement(text, input) {
  return element({
    tag: "label",
    classes: "gallery__controls__item gallery__controls__input label",
    children: [
      textNode(text),
      input
    ]
  })
}

function inputElement(onInput) {
  return element({
    tag: "input",
    classes: "gallery__controls__input input",
    listeners: {
      input: onInput
    },
  });
}