import newImageFinder from '../../src/services/image-finder.js';

const description = `
     <p>Modify your implementation of <code>ImageFinder</code> to include a way of adding <strong>search modules</strong>.
        Each module accepts a search query and returns the search results in the same format as task 1.</p>
     <p>Move your search functionality of DATA.staticImagesDb into its own module - name it 'static'.</p>
     <p><code>ImageFinder</code> should throw an exception for unknown modules.</p>
     <p>Add the static module to the global imageFinder instance.</p>
     <p>Change <code>Gallery.doSearch()</code> to use your new <code>ImageFinder</code> implementation -
        it should now accept query and module id:<br/><code>gallery.doSearch(query, moduleId)</code>.</p>
  `;

describe('Task 2 - Search Modules', () => {

  const imageFinder = newImageFinder();

  it('throw error for unknown module', () => {
    expect(() =>
      imageFinder.search('dog', 'notARealModuleId')
    ).toThrow();
  });

});