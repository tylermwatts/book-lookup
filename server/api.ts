import express = require('express');
import { IVolume } from '../interfaces/IVolume';
import { Book } from './../classes/Book';

export type IndustryIdentifier = {
  type: string;
};

const api = (app: express.Application) => {
  const fetch = require('node-fetch');
  const apiKey = process.env.API_KEY;
  app.post(
    `/api/search`,
    async (req: express.Request, res: express.Response) => {
      const books = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${
          req.body.text
        }&key=${apiKey}`
      )
        .then((response: Response) => response.json())
        .catch((err: Error) => console.log(err));
      const modeledBooks: Array<Book> = books.items
        .filter(
          (a: IVolume) =>
            a.volumeInfo.authors &&
            a.volumeInfo.industryIdentifiers &&
            a.volumeInfo.industryIdentifiers.find(
              (i: IndustryIdentifier) =>
                i.type === 'ISBN_10' || i.type === 'ISBN_13'
            )
        )
        .map((b: IVolume) => new Book(b));
      res.json({
        books: modeledBooks
      });
    }
  );
};

export default api;
