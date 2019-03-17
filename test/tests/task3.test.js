import newImageFinder from '../../src/services/image-finder.js';

describe('Task 3 - Async Flickr Module', () => {

  const imageFinder = newImageFinder();

  it('returns a proper result object with query and images properties', () => {
    let results = imageFinder.search('dog', 'flickr');

    expect(results.query).toBe('dog');

    expect(results.images instanceof Array, 'check that results.images is an Array').toBeTruthy();

    expect(results.images.length).toBe(100);

    expect(results.images.slice(0, 2)).toEqual([
      {
        id: expect.any(String),
        url: expect.any(String),
        title: expect.any(String)
      },
      {
        id: expect.any(String),
        url: expect.any(String),
        title: expect.any(String)
      }
    ])
  });
});