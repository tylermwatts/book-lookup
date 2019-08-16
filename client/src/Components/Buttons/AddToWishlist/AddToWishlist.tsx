import * as React from 'react';
import { Book } from '../../../../classes/Book';

export interface AddToWishlistProps {
  book: Book;
  addToWishlist: Function;
}

export const AddToWishlist: React.SFC<AddToWishlistProps> = ({
  book,
  addToWishlist
}) => {
  return (
    <button onClick={() => addToWishlist(book)}>Add to my wishlist</button>
  );
};
