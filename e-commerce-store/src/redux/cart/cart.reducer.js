import CartActionTypes from "./cart.types";

// add value of cartItems into our initial-state of our reducer
const INITIAL_STATE = {
  hidden: true,
  cartItems: [],
};

// create cart.action to get item type and payload.
// Add this action 'case' to our cart-reducer to listen for.
// When called it will return the existing state, and the cartItems
// array, where we spread the existing items and add the new item(s)
// payload to it.
const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden,
      };
    //
    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        // combine old cart items with new cart-items in this payload.
        cartItems: [...state.cartItems, action.payload],
      };
    default:
      return state;
  }
};

export default cartReducer;
