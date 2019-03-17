import galleryComponent from './components/gallery/gallery.js';
import galleryMiddleware from './services/gallery-middleware.js';
import imageFinder from './services/image-finder.js';

let gallery = galleryComponent(galleryMiddleware(imageFinder()));
document.body.appendChild(gallery.element);