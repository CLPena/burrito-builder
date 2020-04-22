import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";

import { render, waitFor, fireEvent, cleanup } from "@testing-library/react";
import { createStore } from "redux";
import rootReducer from "../../reducers";
import "@testing-library/jest-dom";
import { getOrders, postOrder } from "../../apiCalls.js";

jest.mock("../../apiCalls.js");

describe("App", () => {
  let store;
  let utils;

  beforeEach(() => {
    getOrders.mockResolvedValueOnce({
      orders: [
        { name: "First Order", id: 1, ingredients: ["beans", "rice"] },
        {
          name: "Second Order",
          id: 2,
          ingredients: ["sour cream", "sofritas", "pico de gallo"],
        },
      ],
    });

    store = createStore(rootReducer);

    utils = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  afterEach(cleanup);

  it("When the app loads we should see all orders", async () => {
    const { getByText } = utils;
    const order = await waitFor(() => getByText("First Order"));
    expect(order).toBeInTheDocument();
  });

  it("When the app loads we should see an order form", async () => {
    const { getByText } = utils;
    const form = await waitFor(() => getByText("Order: Nothing selected"));
    expect(form).toBeInTheDocument();
  });

  it("Should be able to enter a name and select ingredients", () => {
    const { getByText, getByTestId, getByPlaceholderText } = utils;

    fireEvent.change(getByPlaceholderText("Name"), {
      target: { value: "Cristina" },
    });

    fireEvent.click(getByTestId("beans"));
    expect(getByTestId("Cristina")).toBeInTheDocument();
    expect(getByText("Order: beans")).toBeInTheDocument();
  });

  it("should  be able to submit a list of ingredients", () => {
    const { getByTestId, getByText } = utils
    fireEvent.click(getByTestId("beans"));
    expect(getByText("Order: beans")).toBeInTheDocument();
    fireEvent.click(getByText("Submit Order"));
    expect(getByText("Order: Nothing selected")).toBeInTheDocument();
  });

  // it("should be able to submit a new order", async () => {
  //
  //   postOrder.mockResolvedValueOnce({
  //     orders: [
  //       { name: "First Order", id: 1, ingredients: ["beans", "rice"] },
  //       {
  //         name: "Second Order",
  //         id: 2,
  //         ingredients: ["sour cream", "sofritas", "pico de gallo"],
  //       },
  //     ],
  //     newOrder: {}
  //   });
  //   const newOrder = await waitFor(() => getByText("Cristina"));
  //   expect(newOrder).toBeInTheDocument();
  // });

  // it("Should be able to submit a new order", async () => {
  //   const { getByText, getByTestId, getByPlaceholderText } = utils;
  //
  //   fireEvent.change(getByPlaceholderText("Name"), {
  //     target: { value: "Cristina" },
  //   });
  //
  //   fireEvent.click(getByTestId("beans"));
  //   expect(getByTestId("Cristina")).toBeInTheDocument();
  //   expect(getByText("Order: beans")).toBeInTheDocument();
  //
  //   postOrder.mockResolvedValueOnce({
  //     orders: [
  //       { name: "First Order", id: 1, ingredients: ["beans", "rice"] },
  //       {
  //         name: "Second Order",
  //         id: 2,
  //         ingredients: ["sour cream", "sofritas", "pico de gallo"],
  //       },
  //     ],
  //     newOrder: { name: "Cristina", ingredients: "beans" },
  //   });
  //
  //   getOrders.mockResolvedValueOnce([
  //     { name: "First Order", id: 1, ingredients: ["beans", "rice"] },
  //     {
  //       name: "Second Order",
  //       id: 2,
  //       ingredients: ["sour cream", "sofritas", "pico de gallo"],
  //     },
  //     { name: "Cristina", id: 3, ingredients: "beans" },
  //   ]);
  //   const newOrder = await waitFor(() => getByText("Cristina"));
  //
  //   expect(getByText("Cristina")).toBeInTheDocument();
  // });
});
