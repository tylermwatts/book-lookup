import express = require('express');

const api = (app: express.Application) => {
  const fetch = require('node-fetch');
  const apiKey = process.env.API_KEY;
  app.post(
    '/api/search',
    async (req: express.Request, res: express.Response) => {
      const books = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${
          req.body.text
        }&key=${apiKey}`
      )
        .then((response: Response) => response.json())
        .catch((err: Error) => console.log(err));
      const modeledBooks = books.items.map(
        (b: {
          volumeInfo: {
            authors?: string[];
            title: string;
            subtitle?: string;
            description: string;
            imageLinks: { thumbnail: string };
            infoLink: string;
            industryIdentifiers?: [{ type: string; identifier: string }];
          };
        }) => {
          return {
            author:
              b.volumeInfo.authors !== undefined ? b.volumeInfo.authors[0] : '',
            title: b.volumeInfo.title,
            subtitle: b.volumeInfo.subtitle,
            description: b.volumeInfo.description,
            thumbnail: b.volumeInfo.imageLinks
              ? b.volumeInfo.imageLinks.thumbnail
              : null,
            link: b.volumeInfo.infoLink,
            ISBN: {
              ISBN_10: b.volumeInfo.industryIdentifiers
                ? b.volumeInfo.industryIdentifiers.find(
                    (t: { type: string }) => t.type === 'ISBN_10'
                  )
                  ? b.volumeInfo.industryIdentifiers.find(
                      (t: { type: string }) => t.type === 'ISBN_10'
                    )!.identifier
                  : ''
                : '',
              ISBN_13: b.volumeInfo.industryIdentifiers
                ? b.volumeInfo.industryIdentifiers.find(
                    (t: { type: string }) => t.type === 'ISBN_13'
                  )
                  ? b.volumeInfo.industryIdentifiers.find(
                      (t: { type: string }) => t.type === 'ISBN_13'
                    )!.identifier
                  : ''
                : ''
            }
          };
        }
      );
      res.json({
        books: modeledBooks
      });
    }
  );
};

export default api;
