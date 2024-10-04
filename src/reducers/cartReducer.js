import { ADD_ITEM, REMOVE_ITEM, INCREASE_QUANTITY, CLEAR_CART, DELETE_ITEM, ADD_ALL } from '../actions/cart-actions';

const intitaState = {
  items: [],
  totalItem: 0,
  totalAmount: 0,
};

const sumItems = (items) => {
  let sum = 0;
  items.forEach(function (item) {
    let calculation = Math.trunc(item.totalPrice);
    sum += calculation;
  });
  return sum;
};

const cartReducer = (state = intitaState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (!existingItem) {
        state.totalItem++;
        let cart = {
          id: action.payload.id,
          name: action.payload.title,
          image: action.payload.image,
          totalPrice: action.payload.price,
        };
        state.items.push(cart);
      }

      return {
        ...state,
        totalAmount: sumItems(state.items),
      };
    // case INCREASE_QUANTITY:
    //   let ids = action.payload;
    //   const existingItemsos = state.items.find((e) => e.id == ids);
    //   existingItemsos.totalPrice = existingItemsos.quantity * existingItemsos.price;
    //   existingItemsos.quantity++;
    //   return {
    //     ...state,
    //   };
    // case REMOVE_ITEM:
    //   let id = action.payload;
    //   const existingItems = state.items.find((e) => e.id == id);
    //   existingItems.totalPrice = existingItems.totalPrice - existingItems.price;
    //   existingItems.quantity--;
    //   if (existingItems.quantity === 0) {
    //     state.totalItem--;
    //     state.items = state.items.filter((e) => e.id !== id);
    //   }
    //   return {
    //     ...state,
    //   };
    case DELETE_ITEM:
      let id_ = action.payload;
      state.totalItem--;
      state.items = state.items.filter((e) => e.id !== id_);
      return {
        ...state,
        totalAmount: sumItems(state.items),
      };
    // case ADD_ALL:
    // const existingItemsoss = action.payload.F((e) => e.id )
    // for (let x of action.payload) {
    //   let existingItem = state.items.find((e) => e.id == x.id);
    //   if (!existingItem) {
    //     return {
    //       ...state,
    //       items: [...state.items, ...action.payload],
    //       totalItem: state.totalItem + action.payload.length,
    //     };
    //   } else if (existingItem) {
    //     return {
    //       ...state,
    //       items: state.items,
    //       totalItem: state.totalItem,
    //     };
    //   }
    // }

    // case CLEAR_CART:
    //   return {
    //     ...state,
    //     totalItem: 0,
    //     items: [],
    //   };
    default:
      return state;
  }
};

export default cartReducer;
