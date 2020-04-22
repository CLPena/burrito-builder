import React, { Component } from "react";
import { connect } from "react-redux";
import { postOrder } from "../../apiCalls";
import { addOrder } from "../../actions/index";

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: "",
      ingredients: [],
    };
  }

  handleNameChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  checkFields = () => {
    if (this.state.ingredients.length === 0 || this.state.name === "") {
      alert("You need a name and at least one ingredient to submit an order!");
    } else {
      let newOrder = {
        name: this.state.name,
        ingredients: this.state.ingredients,
      };
      postOrder(newOrder).then((order) => {
        this.props.addOrder(this.props.orders, newOrder);
      });
    }
  };

  handleIngredientChange = (e) => {
    e.preventDefault();
    this.setState({ ingredients: [...this.state.ingredients, e.target.name] });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.checkFields();
    this.clearInputs();
  };

  clearInputs = () => {
    this.setState({ name: "", ingredients: [] });
  };

  render() {
    const possibleIngredients = [
      "beans",
      "steak",
      "carnitas",
      "sofritas",
      "lettuce",
      "queso fresco",
      "pico de gallo",
      "hot sauce",
      "guacamole",
      "jalapenos",
      "cilantro",
      "sour cream",
    ];
    const ingredientButtons = possibleIngredients.map((ingredient) => {
      return (
        <button
          key={ingredient}
          name={ingredient}
          onClick={(e) => this.handleIngredientChange(e)}
        >
          {ingredient}
        </button>
      );
    });

    return (
      <form>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={this.state.name}
          onChange={(e) => this.handleNameChange(e)}
        />

        {ingredientButtons}

        <p>Order: {this.state.ingredients.join(", ") || "Nothing selected"}</p>

        <button onClick={(e) => this.handleSubmit(e)}>Submit Order</button>
      </form>
    );
  }
}

const mapStateToProps = ({ orders }) => ({
  orders,
});

const mapDispatchToProps = (dispatch) => ({
  addOrder: (newOrder) => dispatch(addOrder(newOrder)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);
