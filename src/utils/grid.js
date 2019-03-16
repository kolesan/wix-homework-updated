import { isNormalPositiveNumber } from './math-utils.js';
import optional from './optional.js';
import { arrayOfSize } from './utils.js';

export default function inst(gridWidth = 2) {
  validateGrid(gridWidth);

  let grid = createEmptyGrid(gridWidth, 1);

  return Object.freeze({
    position(w, h) {
      validateItem(w, h, gridWidth);

      return findSpotThatCanFit(w, h)
        .ifPresent(spot => {
          occupy(spot.x, spot.y, w, h);
          return spot;
        })
        .orElse(() => {
          throw Error("Should not happen with an endless grid");
        });
    }
  });

  function gridHeight() {
    return grid.length;
  }

  function findSpotThatCanFit(w, h) {
    return findCell({
      x: 0,
      y: 0,
      w: gridWidth,
      h: gridHeight() + 1,
      predicate: (x, y) => canFit(x, y, w, h)
    });
  }

  function canFit(x, y, w, h) {
    return findCell({x, y, w, h,
      predicate: isOccupiedOrOutside
    }).isEmpty();
  }
  function isOccupiedOrOutside(x, y) {
    let row = grid[y];
    return row !== undefined && !row[x];
  }

  function occupy(x, y, w, h) {
    forEachCell({x, y, w, h,
      fn: occupyCell
    });
  }
  function occupyCell(x, y) {
    if (grid[y] === undefined) {
      grid[y] = newRow(gridWidth);
    }

    grid[y][x] = false;
  }
}

function newRow(w) {
  return arrayOfSize(w, true);
}

function createEmptyGrid(w, h) {
  let rows = [];
  for(let i = 0; i < h; i++) {
    rows.push(newRow(w));
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



function validateGrid(w) {
  if (!isNormalPositiveNumber(w)) {
    throw Error(`Invalid grid dimensions ${{w}}`);
  }
}

function validateItem(w, h, gridWidth) {
  if (w > gridWidth) {
    throw Error(`Item with dimensions ${{w, h}} won't fit on a grid with width ${{w: gridWidth}}`);
  }
}