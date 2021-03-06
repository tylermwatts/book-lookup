import * as React from 'react';
import './SearchField.css';

export interface SearchFieldProps {
  searchBooks: Function;
}

export const SearchField: React.SFC<SearchFieldProps> = ({ searchBooks }) => {
  const [text, setText] = React.useState('');
  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setText(e.currentTarget.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    searchBooks(text);
    setText('');
  };
  return (
    <div className="searchbar-container">
      <form onSubmit={handleSubmit}>
        <label>{'Search: '}</label>
        <input type="text" onChange={handleChange} value={text} />
        {text && <input type="submit" value="Search" />}
      </form>
    </div>
  );
};
