export const setOrders = (orders) => ({
  type: "SET_ORDERS",
  orders,
});

export const addOrder = (orders, order) => ({
  type: "ADD_ORDER",
  orders,
  order,
});
