import { isNormalPositiveNumber } from './math-utils.js';
import optional from './optional.js';
import { arrayOfSize } from './utils.js';

export default function inst(gridWidth = 2, gridHeight = 100) {
  validateGrid(gridWidth, gridHeight);

  let grid = createEmptyGrid(gridWidth, gridHeight);

  return Object.freeze({
    position(w, h) {
      validateItem(w, h, gridWidth, gridHeight);

      return findSpotThatCanFit(w, h)
        .ifPresent(spot => {
          occupy(spot.x, spot.y, w, h);
          console.log(grid);
          return spot;
        })
        .orElseReturn({});
    }
  });

  function findSpotThatCanFit(w, h) {
    return findCell({
      x: 0,
      y: 0,
      w: gridWidth,
      h: gridHeight,
      predicate: (x, y) => canFit(x, y, w, h)
    });
  }

  function canFit(x, y, w, h) {
    return findCell({x, y, w, h,
      predicate: isOccupiedOrOutside
    }).isEmpty();
  }
  function isOccupiedOrOutside(x, y) {
    return !grid[y][x];
  }

  function occupy(x, y, w, h) {
    forEachCell({x, y, w, h,
      fn: occupyCell
    });
  }
  function occupyCell(x, y) {
    grid[y][x] = false;
  }
}



function createEmptyGrid(w, h) {
  let rows = [];
  for(let i = 0; i < h; i++) {
    rows.push(arrayOfSize(w, true));
  }
  return rows;
}

function forEachCell({x, y, w, h, fn}) {
  for(let j = y; j < h + y; j++) {
    for(let i = x; i < w + x; i++) {
      fn(i, j);
    }
  }
}

function findCell({x, y, w, h, predicate}) {
  for(let j = y; j < h + y; j++) {
    for(let i = x; i < w + x; i++) {
      if (predicate(i, j)) {
        return optional({ x: i, y: j });
      }
    }
  }
  return optional();
}



function validateGrid(w, h) {
  if (!isNormalPositiveNumber(w) || !isNormalPositiveNumber(h)) {
    throw Error(`Invalid grid dimensions ${{w, h}}`);
  }
}

function validateItem(w, h, gridWidth, gridHeight) {
  if (w > gridWidth || h > gridHeight) {
    throw Error(`Item with dimensions ${{w, h}} won't fit on a grid ${{w: gridWidth, h: gridHeight}}`);
  }
}