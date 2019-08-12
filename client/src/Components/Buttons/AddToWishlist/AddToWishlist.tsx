import * as React from 'react';
import { IBook } from '../../../../../interfaces/IBook';

export interface AddToWishlistProps {
  book: IBook;
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
