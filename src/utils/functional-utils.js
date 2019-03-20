function pipe(startingValue, ...functions) {
  return functions.reduce((v, fn) => fn(v), startingValue);
}

function curry(fn, ...curried) {
  return function(...args) {
    return fn(...args, ...curried);
  }
}

function curryLeft(fn, ...curried) {
  return function(...args) {
    return fn(...curried, ...args);
  }
}

function tap(fn) {
  return function(...args) {
    if (args.length > 1) {
      console.error("More than one argument traveling through pipeline. Arguments after first one will be ignored");
    }
    fn(...args);
    return args[0];
  }
}



module.exports = {
  pipe,
  curry,
  curryLeft,
  tap
};