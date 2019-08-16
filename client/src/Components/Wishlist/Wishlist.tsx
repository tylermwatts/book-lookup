import * as React from 'react';
import { Spring } from 'react-spring/renderprops';
import { IBook } from '../../../../interfaces/IBook';
import { BookTable } from '../BookTable';
import { TitleDisplay } from '../TitleDisplay';

export interface WishlistProps {
  wishlist: Array<IBook>;
  removeFromWishlist: Function;
}

export const Wishlist: React.SFC<WishlistProps> = ({
  wishlist,
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
                <TitleDisplay
                  book={displayed}
                  setDisplayed={setDisplayed}
                  removeBookFromWishlist={removeFromWishlist}
                />
                <div className="table-container">
                  <table>
                    <tbody>
                      <tr className="tr">
                        <th className="th">Title</th>
                        <th className="th">Author</th>
                      </tr>
                      <BookTable books={wishlist} setDisplayed={setDisplayed} />
                    </tbody>
                  </table>
                </div>
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
