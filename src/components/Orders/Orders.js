import React, { Component } from 'react';
import './Orders.css';
import { connect } from 'react-redux';
import { setOrders } from '../../actions';
import { getOrders } from '../../apiCalls';

export class Orders extends Component {
  constructor(props) {
    super();
  }
}

const mapStateToProps = ({ orders }) => ({
  orders
});

const mapDispatchToProps = dispatch => ({
    setOrders: (orders) => dispatch(setOrders(orders))
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
