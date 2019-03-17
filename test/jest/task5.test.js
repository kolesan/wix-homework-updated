import newImageFinder from '../../src/services/image-finder.js';

const description = `
  <p>
     Now that <code>search()</code> return results asynchronously,
     it might cause unwanted old results to be returned before or <strong>after</strong> newer queries.
     Change <code>search()</code> so that it will cancel previous searches when a new query is executed.
  </p>
`;

describe('Task 5 - Nuts & Bolts', function(){

  const imageFinder = newImageFinder();

  it('ignores older requests if they arrive after the newer ones', function(){
    // let results = [];
    //
    // imageFinder.search('dog', 'flickr')
    //   .then(finderResult => results = finderResult);
    // imageFinder.search('cat', 'flickr')
    //   .then(finderResult => results = finderResult);
    //
    // expect(gallery._onSearchResultReady.callCount).toBe(1);
    // expect(results.query).toBe('cat');
  });
});