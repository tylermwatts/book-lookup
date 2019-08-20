import * as React from 'react';
import { Spring } from 'react-spring/renderprops';
import { Book } from '../../../classes/Book';
import { BookTableContainer } from '../BookTableContainer';
import { AddToLibrary } from '../Buttons/AddToLibrary';
import { RemoveFromWishlist } from '../Buttons/RemoveFromWishlist';
import { TitleDisplay } from '../TitleDisplay';

export interface WishlistProps {
  wishlist: Array<Book>;
  addToOwned: Function;
  removeFromWishlist: Function;
}

export const Wishlist: React.SFC<WishlistProps> = ({
  wishlist,
  addToOwned,
  removeFromWishlist
}) => {
  const [displayed, setDisplayed] = React.useState(wishlist[0] || null);
  React.useEffect(() => {
    setDisplayed(wishlist[0]);
  }, [wishlist]);
  return (
    <Spring
      to={{ opacity: 1 }}
      from={{ opacity: 0 }}
      config={{ duration: 300 }}
    >
      {props => (
        <div style={props} className="background">
          <div className="background-container">
            <h1 style={{ textDecoration: 'underline' }}>My wishlist</h1>
            {displayed ? (
              <>
                <TitleDisplay book={displayed}>
                  <AddToLibrary book={displayed} addToLibrary={addToOwned} />
                  <br />
                  <RemoveFromWishlist
                    removeFromWishlist={removeFromWishlist}
                    setDisplayed={setDisplayed}
                    displayed={displayed}
                    wishlist={wishlist}
                  />
                </TitleDisplay>
                <BookTableContainer
                  ownedBooks={wishlist}
                  setDisplayed={setDisplayed}
                />
              </>
            ) : (
              <div>
                No books in your wishlist. Search for books to add them to your
                wishlist.
              </div>
            )}
          </div>
        </div>
      )}
    </Spring>
  );
};
