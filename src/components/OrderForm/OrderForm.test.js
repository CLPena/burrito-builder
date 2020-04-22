import React from "react";
import OrderForm from "./OrderForm";
import { render, fireEvent } from "@testing-library/react";
import { createStore } from "redux";
import "@testing-library/jest-dom";
import rootReducer from "../../reducers";
import { Provider } from "react-redux";

describe("Order Form", () => {
  let store;
  let utils;

  beforeEach(() => {
    store = createStore(rootReducer);

    utils = render(
      <Provider store={store}>
        <OrderForm />
      </Provider>
    );
  });

  it("Can be filled out with a name and selected ingredients", () => {
    const store = createStore(rootReducer);
    const { getByTestId, getByText, getByPlaceholderText } = utils;

    fireEvent.change(getByPlaceholderText("Name"), {
      target: { value: "Cristina" },
    });
    fireEvent.click(getByTestId("beans"))
    fireEvent.click(getByText("Submit Order"))
    expect(getByPlaceholderText("Name").value).toBe('')
  });
});
