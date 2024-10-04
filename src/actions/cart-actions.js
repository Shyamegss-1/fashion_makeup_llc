import { actionCreator } from "redux-action-creator";

export const ADD_ITEM = "ADD_ITEM"
export const ADD_ITEM_ACTION = actionCreator(ADD_ITEM)

export const REMOVE_ITEM = "REMOVE_ITEM"
export const REMOVE_ITEM_ACTION = actionCreator(REMOVE_ITEM)

export const CLEAR_CART = "CLEAR_CART"
export const CLEAR_CART_ACTION = actionCreator(CLEAR_CART)

export const DELETE_ITEM = "DELETE_ITEM"
export const DELETE_ITEM_ACTION = actionCreator(DELETE_ITEM)

export const INCREASE_QUANTITY = "INCREASE_QUANTITY"
export const INCREASE_QUANTITY_ACTION = actionCreator(INCREASE_QUANTITY)

export const ADD_ALL =  "ADD_ALL"
export const ADD_ALL_ACTION = actionCreator(ADD_ALL)
