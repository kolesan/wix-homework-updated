import { element } from '../../../utils/html-utils.js';
import { dimensions } from '../../../utils/utils.js';

export default function inst(image) {
  let imageGridItem = imageGridItemElement(image);
  let dimensions = determineItemDimensions(image);
  return Object.freeze({
    get element() {
      return imageGridItem;
    },
    get w() {
      return dimensions.w;
    },
    get h() {
      return dimensions.h;
    },
    position(x, y) {
      const { w, h } = dimensions;
      imageGridItem.style.gridRowStart = y + 1;
      imageGridItem.style.gridColumnStart = x + 1;
      imageGridItem.style.gridRowEnd = y + h + 1;
      imageGridItem.style.gridColumnEnd = x + w + 1;
    }
  });
}

function determineItemDimensions(image) {
  const distance = 300;
  let { width, height } = image;
  let dimensionsDiff = width - height;

  if (dimensionsDiff > distance) {
    return dimensions({w: 2, h: 1});
  } else if (dimensionsDiff < -distance) {
    return dimensions({w: 1, h: 2});
  }

  return dimensions({w: 1, h: 1});
}

function imageGridItemElement(image) {
  return element({
    tag: "div",
    classes: "image_grid__item",
    children: [
      imageElement(image.url),
      titleElement(image.title)
    ]
  });
}

function imageElement(url) {
  return element({
    tag: 'img',
    classes: "image_grid__item__img",
    attributes: {
      src: url
    }
  });
}

function titleElement(text) {
  return element({
    tag: 'div',
    classes: "image_grid__item__title",
    text: text
  });
}