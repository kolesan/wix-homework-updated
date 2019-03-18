import staticDb from '../resources/static-images-db.js';

export default function inst() {
  return Object.freeze({
    get id() {
      return "static";
    },
    search(query) {
      let images = staticDb.filter(image => image.title.toUpperCase().includes(query.toUpperCase()))
        .map(image => ({
          id: image.id,
          title: image.title,
          url: image.url
        }));
      return Promise.resolve(images);
    }
  });
}
