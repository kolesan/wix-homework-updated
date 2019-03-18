import inputControlComponent from './input-control.js'

export default function inst(onInput) {
  let searchControl = inputControlComponent("search", onInput);
  return Object.freeze({
    get value() {
      return searchControl.value;
    },
    get element() {
      return searchControl.element;
    }
  });
}
