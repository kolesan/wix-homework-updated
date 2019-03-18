import { element } from '../../../utils/html-utils.js';

export default function inst(...children) {
  let element = galleryControlsElement(...children);
  return Object.freeze({
    get element() {
      return element;
    }
  });
}

function galleryControlsElement(...children) {
  return element({
    tag: "div",
    classes: "gallery__controls",
    children: [
      ...children,
      logo(),
    ]
  })
}

function logo() {
  return element({
    tag: "a",
    classes: "gallery__controls__item wix_logo",
    attributes: {
      href: "https://wix.com",
      target: "_blank"
    },
    children: [
      element({
        tag: "img",
        classes: "wix_logo__image",
        attributes: {
          src: "../../resources/images/wix-white-horizontal-winking.svg"
        }
      })
    ]
  });
}