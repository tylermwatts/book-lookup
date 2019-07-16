import * as React from 'react';

export interface SearchFieldProps {
  searchBooks: Function;
}

const SearchField: React.SFC<SearchFieldProps> = ({ searchBooks }) => {
  const [text, setText] = React.useState('');
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchBooks(text);
    setText('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>{'Search by title and/or author: '}</label>
      <input type="text" onChange={handleChange} value={text} />
      {text && <input type="submit" value="Search" />}
    </form>
  );
};

export default SearchField;
