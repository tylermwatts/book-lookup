import * as React from 'react';
import { BookTable } from '../BookTable';
import { Book } from '../../../classes/Book';
import './ResultTable.css';

export interface ResultTableProps {
  bookList: Array<Book>;
  setDisplayed: Function;
}

export const ResultTable: React.SFC<ResultTableProps> = ({
  bookList,
  setDisplayed
}) => {
  return bookList[0] ? (
    <div className="table-container">
      <table>
        <tbody>
          <tr>
            <th className="th">First Result</th>
            <th className="th">Author</th>
          </tr>
          <tr className="tr" onClick={() => setDisplayed(bookList[0])}>
            <td className="td">{bookList[0].title}</td>
            <td className="td">{bookList[0].author}</td>
          </tr>
          <tr>
            <th className="th">Other possible matches</th>
            <th className="th">Author</th>
          </tr>
          <BookTable
            books={bookList.filter((b: Book) => b !== bookList[0])}
            setDisplayed={setDisplayed}
          />
        </tbody>
      </table>
    </div>
  ) : (
      <table />
    );
};
