import newImageFinder from '../../src/services/image-finder.js';

describe('Task 4 - Multiple requests', () => {

  const imageFinder = newImageFinder();

  it('accepts multiple requests and', () => {
    let result1 = imageFinder.search('dog', 'flickr');
    let result2 = imageFinder.search('cat', 'flickr');

    expect(result1.query).toBe('dog');
    expect(result2.query).toBe('cat');
    expect(result1.images).not.toEqual(result2.images);
  });
});