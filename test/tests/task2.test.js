import newImageFinder from '../../src/services/image-finder.js';

describe('Task 2 - Search Modules', () => {

  const imageFinder = newImageFinder();

  it('throw error for unknown module', () => {
    expect(() =>
      imageFinder.search('dog', 'notARealModuleId')
    ).toThrow();
  });

});