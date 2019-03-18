import galleryComponent from './components/gallery/gallery.js';
import galleryMiddleware from './services/gallery-middleware.js';
import staticSearchModule from './services/static-search-module.js';
import flickrSearchModule from './services/flickr-search-module.js';
import imageFinder from './services/image-finder.js';

let gallery = galleryComponent(
  galleryMiddleware(
    imageFinder(
      staticSearchModule(),
      flickrSearchModule()
    )
  )
);
document.body.appendChild(gallery.element);