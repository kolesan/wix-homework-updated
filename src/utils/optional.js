export default function optional(v) {
  return Object.freeze({
    ifPresent(fn) {
      return orable(v, fn);
    },
    isEmpty() {
      return !exists(v);
    }
  });
}

function orable(v, fn) {
  return Object.freeze({
    orElse(elseFn) {
      return exists(v) ? fn(v) : elseFn();
    },
    orElseReturn(otherValue) {
      return exists(v) ? fn(v) : otherValue;
    }
  });
}

function exists(v) {
  return v !== undefined;
}