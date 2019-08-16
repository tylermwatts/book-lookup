import * as React from 'react';
import './BookTable.css';
import { Book } from '../../../../classes/Book';

export interface BookTableProps {
  books: Array<Book>;
  setDisplayed: Function;
}

export const BookTable: React.SFC<BookTableProps> = ({
  books,
  setDisplayed
}) => {
  return (
    <>
      {books.map((b: Book, i: number) => {
        return (
          <tr className="tr" key={b.title + i} onClick={() => setDisplayed(b)}>
            <td className="td">{b.title}</td>
            <td className="td">{b.author}</td>
          </tr>
        );
      })}
    </>
  );
};
