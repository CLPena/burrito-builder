import * as actions from ".";

describe("Actions Tests", () => {
  it("should have a type of SET_ORDERS and correct payload", () => {
    const order1 = { name: "First Order" };
    const order2 = { name: "Second Order" };

    const expectedAction = {
      type: "SET_ORDERS",
      orders: [order1, order2],
    };
    const result = actions.setOrders([order1, order2]);

    expect(result).toEqual(expectedAction);
  });

  it("should have a type of ADD_ORDER and correct payload", () => {
    const order = { name: "First Order" };

    const expectedAction = {
      type: "ADD_ORDER",
      orders: [],
      order: order,
    };
    const result = actions.addOrder([], order);

    expect(result).toEqual(expectedAction);
  });
});
