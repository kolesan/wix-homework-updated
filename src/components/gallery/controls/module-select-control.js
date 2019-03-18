import { element, textNode } from '../../../utils/html-utils.js';

export default function inst(onSelectionChange) {
  let moduleSelectControl = selectElement(onSelectionChange,
    {k: "Static DB", v: "static"},
    {k: "Flickr", v: "flickr"}
  );
  let label = labelElement("Source", moduleSelectControl);
  return Object.freeze({
    get value() {
      return moduleSelectControl.value;
    },
    get element() {
      return label;
    }
  });
}

function labelElement(text, child) {
  return element({
    tag: "label",
    classes: "gallery__controls__item gallery__controls__input label",
    children: [
      textNode(text),
      child
    ]
  })
}

function selectElement(onSelectionChange, ...options) {
  return element({
    tag: "select",
    classes: "gallery__controls__input input",
    children: options.map(option),
    listeners: {
      input: onSelectionChange
    }
  })
}

function option({k, v}) {
  return element({
    tag: "option",
    classes: "gallery__controls__input option",
    text: k,
    attributes: {
      value: v
    }
  })
}