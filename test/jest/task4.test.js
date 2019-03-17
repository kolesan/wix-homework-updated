import newImageFinder from '../../src/services/image-finder.js';

const description = `
    <p>Add functionality to your <code>search()</code> to be able to accept requests from multiple galleries and
       route the search results to the appropriate gallery instance.
    </p>
    <li>
      <p><strong>Bonus</strong> - Add a second functioning gallery</p>
    </li>
  `;

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