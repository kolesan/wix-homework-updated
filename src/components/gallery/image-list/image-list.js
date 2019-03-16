export default function inst() {
  let imageList = imageListElement();
  return Object.freeze({
    get element() {
      imageList.element
    }
  });
}

function imageListElement() {

}