import React, { useState } from 'react';

const SearchField = ({ searchBooks }) => {
  const [text, setText] = useState('');

  const handleChange = e => {
    setText(e.target.value);
  };

  const handleSubmit = e => {
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
