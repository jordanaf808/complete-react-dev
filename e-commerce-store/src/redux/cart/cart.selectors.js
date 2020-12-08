import { createSelector } from 'reselect';

// output selector uses createSelector to build itself

// input selector. function that gets whole state and returns a 'slice' of it
const selectCart = (state) => state.cart;

// first argument takes array of input selectors, second argument is a function that
// returns a value from the selectors. because we used 'createSelector()' it is now
// a 'memoized' selector.
export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
      0
    )
);
