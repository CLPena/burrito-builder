export const orders = (state = [], action) => {
  switch (action.type) {
    case "SET_ORDERS":
      return action.orders;
    case "ADD_ORDER":
      return [...action.orders, action.order];
    default:
      return state;
  }
};
