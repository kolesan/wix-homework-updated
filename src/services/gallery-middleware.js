export default function inst(imageFinder) {
  return Object.freeze({
    search(query) {
      return imageFinder.search(query);
    }
  });
}