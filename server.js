const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT;
const apiKey = process.env.API_KEY;

const app = express();
app.use(bodyParser.json());

app.post('/api/title', async (req, res) => {
  const book = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${
      req.body.text
    }&key=${apiKey}`
  )
    .then(response => response.json())
    .catch(err => console.log(err));
  res.json({
    author: book.items[0].volumeInfo.authors[0],
    title: book.items[0].volumeInfo.subtitle
      ? book.items[0].volumeInfo.title +
        ': ' +
        book.items[0].volumeInfo.subtitle
      : book.items[0].volumeInfo.title,
    description: book.items[0].volumeInfo.description,
    thumbnail: book.items[0].volumeInfo.imageLinks.thumbnail,
    link: book.items[0].volumeInfo.infoLink,
    ISBN: book.items[0].volumeInfo.industryIdentifiers[0].identifier
  });
});

app.listen(port || 3001, () => {
  console.log(`Server running on http://localhost:${port} ...`);
});
