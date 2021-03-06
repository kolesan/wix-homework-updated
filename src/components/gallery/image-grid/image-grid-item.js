import { element } from '../../../utils/html-utils.js';
import { dimensions as newDimensions } from '../../../utils/utils.js';
const { curry, pipe } = require('../../../utils/functional-utils');

export default function inst(image) {
  let imageGridItem = imageGridItemElement(image);

  pipe(image,
    determineItemDimensions,
    positionItem
  );

  markSuperLongTitledItem(image, imageGridItem);

  return Object.freeze({
    get element() {
      return imageGridItem;
    },
  });

  function positionItem({w, h}) {
    imageGridItem.style.gridRowEnd = `span ${h}`;
    imageGridItem.style.gridColumnEnd = `span ${w}`;
  }
}

function determineItemDimensions(image) {
  return pipe(newDimensions({w: 1, h: 1}),
    curry(sideRatioAdjust, image),
    curry(longWordInTitleAdjust, image),
    curry(longTitleAdjust, image)
  );
}

function markSuperLongTitledItem(image, imageGridItem) {
  if (image.title.length > 25) {
    imageGridItem.classList.add("super_long_titled");
  }
}


function sideRatioAdjust(dimensions, image) {
  let { width, height } = image;
  let ratio = width / height;
  if (ratio > 1.3) {
    return newDimensions({w: 2, h: dimensions.h});
  } else if (ratio < 0.7) {
    return newDimensions({w: dimensions.w, h: 2});
  }
  return Object.assign({}, dimensions);
}

function longWordInTitleAdjust(dimensions, image) {
  if (image.title.split(" ").some(word => word.length > 7)) {
    return newDimensions({ w: 2, h: dimensions.h });
  }
  return Object.assign({}, dimensions);
}

function longTitleAdjust(dimensions, image) {
  if (image.title.length > 15) {
    return newDimensions({ w: 2, h: 2 });
  }
  return Object.assign({}, dimensions);
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