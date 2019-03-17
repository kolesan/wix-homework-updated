import newImageFinder from '../../src/services/image-finder.js';

const desription = `
      <p>
        Add a flickr search module to the system using the following credentials:<br/>
        <code>Flickr API<br/>
              api_key: 'b394136d5dde8d9d0d4f8fc6685386e2'
        </code>
      </p>
      <p>
        <li>Don't reduce flickr results amount (100)</li>
        <li><strong>Bonus</strong> - Add a drop down menu in gallery to select a search module (static / flickr).</li>
      </p>
  `;

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