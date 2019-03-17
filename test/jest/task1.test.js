import newImageFinder from '../../src/services/image-finder.js';

describe('Task 1 - ImageFinder static data search', () => {
  
  const description =`
    <p>Modify <code>ImageFinder.search()</code> to search the title field of items in the global variable <code>DATA.staticImagesDb</code>. You may view the data in "static-images-db.js"</p>' +
       <p>Items which <strong>contain</strong> the search query in the <code>title</code> field should be included.</p>
          <p>Example: The query "veg" should return the following:</p>
           <pre>
           {<br/>
               query:"veg", <br/>
               images:[ <br/>
                   { <br/>
                       id: "OE8CVzFzzh;5_sTOzzBihQ--a", <br/>
                       url: "http://static.wix.com/media/9f980c8bd27279a71406c1bb10916190.wix_mp", <br/>
                       title: "veggies" <br/>
                   }, <br/>
                   { <br/>
                       id: "PxtCbLD6RKrRyGGyKdwJ5w--a", <br/>
                       url: "http://static.wix.com/media/a0cb4084e9c514ae7ca42143fbedf84a.wix_mp", <br/>
                       title: "veggies 2" <br/>
                   } <br/>
               ] <br/>
           }
           </pre>
      <li>Return results in the above format</li>
      <li>Do not change <code>Gallery</code> for <u>this task</u></li>`;

  const imageFinder = newImageFinder();

  it(`returns a query object which has a property 'query' == original search query`, () => {
    const result = imageFinder.search('dog');

    expect(result.query).toBe('dog');
  });

  it(`returns a query object which has a property 'images' == array of image objects '[{id, url, title}...]'`, () => {
    const result = imageFinder.search('dog');

    expect(result.images).toEqual([
      {
        id: 'vHmdG5nncVmJQNaMyeqR6w--a',
        url: 'http://static.wix.com/media/cc9d8bc0f8b1a5338ee79d9eb155d1c4.wix_mp',
        title: 'small dogs'
      },
      {
        id: 'AtYPWBjL5BMVxob0OfmLQg--a',
        url: 'http://static.wix.com/media/fb376dd2473759bbb248dc4f1b23730e.wix_mp',
        title: 'dogfood'},
      {
        id: 'dORmr6W5WoH_M48WWcUuQw--a',
        url: 'http://static.wix.com/media/85252fdf939e9b37fa16d1f3b2d197e9.wix_mp',
        title: 'dog run'},
      {
        id: 'gyFHUTuQUJamSHp3VNiJpw--a',
        url: 'http://static.wix.com/media/16f9f8e6e00718d108a8889351874fb4.wix_mp',
        title: 'book dog'},
      {
        id: 't2SVVJ_a0ESmUC0CVRpGZQ--a',
        url: 'http://static.wix.com/media/7f093ca6c9945ebb918772e55cd7b89f.wix_mp',
        title: 'office dog'
      }
    ]);
  });
});