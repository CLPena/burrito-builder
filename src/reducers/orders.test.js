import { orders } from "./orders";

describe("Orders Reducers Test", () => {
  it("should return the initial state", () => {
    const expected = [];
    const result = orders(undefined, {});
    expect(result).toEqual(expected);
  });

  it("should return all orders if type is SET_ORDERS", () => {
    const initialState = [];
    const expected = [{ name: "First Order" }, { name: "Second Order" }];
    const action = {
      type: "SET_ORDERS",
      orders: [{ name: "First Order" }, { name: "Second Order" }],
    };
    const result = orders(initialState, action);

    expect(result).toEqual(expected);
  });

  it("should add an order to orders array if type is ADD_ORDER", () => {
    const initialState = [{ name: "First Order" }];

    const expected = [{ name: "First Order" }, { name: "Second Order" }];

    const action = {
      type: "ADD_ORDER",
      orders: initialState,
      order: { name: "Second Order" },
    };

    const result = orders(initialState, action);

    expect(result).toEqual(expected);
  })
});
