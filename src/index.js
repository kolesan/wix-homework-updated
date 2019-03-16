import galleryComponent from './components/gallery/gallery.js';
import imageFinder from './services/image-finder.js';

let gallery = galleryComponent(imageFinder());
document.body.appendChild(gallery.element);