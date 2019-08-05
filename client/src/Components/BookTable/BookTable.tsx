import * as React from 'react';
import { IBook } from '../../../../interfaces/IBook';
import './BookTable.css';

export interface BookTableProps {
  books: Array<IBook>;
  setDisplayed: Function;
}

export const BookTable: React.SFC<BookTableProps> = ({
  books,
  setDisplayed
}) => {
  return (
    <>
      {books.map((b, i) => {
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
