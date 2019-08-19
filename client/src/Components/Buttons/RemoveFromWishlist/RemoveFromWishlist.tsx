import * as React from 'react';
import { Book } from '../../../../classes/Book';

export interface RemoveFromWishlistProps {
  removeFromWishlist: Function;
  setDisplayed: Function;
  displayed: Book;
  wishlist: Array<Book>;
}

export const RemoveFromWishlist: React.SFC<RemoveFromWishlistProps> = ({
  removeFromWishlist,
  setDisplayed,
  displayed,
  wishlist
}) => {
  return (
    <button
      onClick={() => {
        removeFromWishlist(displayed);
        setDisplayed(wishlist[0] || null);
      }}
    >
      Remove from wishlist
    </button>
  );
};
