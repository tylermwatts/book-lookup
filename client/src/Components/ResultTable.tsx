import * as React from 'react';
import { BookList } from '../types/BookList';

export interface ResultTableProps {
  bookList: BookList;
  setDisplayed: Function;
}

const styles = {
  tr: {
    cursor: 'pointer'
  },
  td: {
    border: '1px solid black'
  },
  th: {
    border: '1px solid black'
  }
};

const ResultTable: React.SFC<ResultTableProps> = ({
  bookList,
  setDisplayed
}) => {
  return bookList[0] ? (
    <table>
      <tbody>
        <tr style={styles.tr}>
          <th style={styles.th}>First Result</th>
          <th style={styles.th}>Author</th>
        </tr>
        <tr style={styles.tr} onClick={() => setDisplayed(bookList[0])}>
          <td style={styles.td}>{bookList[0].title}</td>
          <td style={styles.td}>{bookList[0].author}</td>
        </tr>
        <tr style={styles.tr}>
          <th style={styles.th}>Other possible matches</th>
          <th style={styles.th}>Author</th>
        </tr>
        {bookList
          .filter(t => t !== bookList[0])
          .map((b, i) => {
            return (
              <tr
                style={styles.tr}
                key={b.title + i}
                onClick={() => setDisplayed(b)}
              >
                <td style={styles.td}>{b.title}</td>
                <td style={styles.td}>{b.author}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  ) : (
    <table />
  );
};

export default ResultTable;
