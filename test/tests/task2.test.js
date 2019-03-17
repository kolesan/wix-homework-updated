import newImageFinder from '../../src/services/image-finder.js';

describe('Task 2 - Search Modules', () => {

  const imageFinder = newImageFinder();

  test('image finder throws error for unknown module', () => {
    expect(() =>
      imageFinder.search('dog', 'notARealModuleId')
    ).toThrow();
  });

});