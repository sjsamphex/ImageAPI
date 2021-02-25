import React, { Component } from 'react';
import { connect } from 'react-redux';

import Paper from '@material-ui/core/Paper';

class ProductInfo extends Component {
  render() {
    if (!this.props.product) {
      return null;
    }
    const styles = {
      paper: {},
    };
    return (
      <Paper>
        <ul>
          <li>{this.props.product.brands}</li>
          <li>{this.props.product.product_name}</li>
        </ul>
      </Paper>
    );
  }
}

const mapState = (state) => {
  return {
    product: state.product.bcData.barcodeData.product,
  };
};

const mapDispatch = (dispatch) => {
  return {};
};

export default connect(mapState, mapDispatch)(ProductInfo);
