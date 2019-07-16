const fetch = require('node-fetch');
const apiKey = process.env.API_KEY;

module.exports = app => {
  app.post('/api/search', async (req, res) => {
    const books = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${
        req.body.text
      }&key=${apiKey}`
    )
      .then(response => response.json())
      .catch(err => console.log(err));
    const modeledBooks = books.items.map(b => {
      return {
        author: b.volumeInfo.authors[0],
        title: b.volumeInfo.title,
        subtitle: b.volumeInfo.subtitle,
        description: b.volumeInfo.description,
        thumbnail: b.volumeInfo.imageLinks
          ? b.volumeInfo.imageLinks.thumbnail
          : null,
        link: b.volumeInfo.infoLink,
        ISBN: b.volumeInfo.industryIdentifiers.find(t => t.type === 'ISBN_13')
          ? b.volumeInfo.industryIdentifiers.find(t => t.type === 'ISBN_13')
              .identifier
          : null
      };
    });
    res.json({
      books: modeledBooks
    });
  });
};
