export function pipe(startingValue, ...functions) {
  return functions.reduce((v, fn) => fn(v), startingValue);
}

export function curry(fn, ...curried) {
  return function(...args) {
    return fn(...args, ...curried);
  }
}