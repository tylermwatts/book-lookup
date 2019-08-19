import * as React from 'react';
import { Book } from '../../../classes/Book';
import { BookTable } from '../BookTable';

export interface BookTableContainerProps {
  ownedBooks: Array<Book>;
  setDisplayed: Function;
}

export const BookTableContainer: React.SFC<BookTableContainerProps> = ({
  ownedBooks,
  setDisplayed
}) => {
  return (
    <div className="table-container">
      <table>
        <tbody>
          <tr className="tr">
            <th className="th">Title</th>
            <th className="th">Author</th>
          </tr>
          <BookTable books={ownedBooks} setDisplayed={setDisplayed} />
        </tbody>
      </table>
    </div>
  );
};
