import React, { Component } from 'react';
import { connect } from 'react-redux';

import Paper from '@material-ui/core/Paper';

class ProductInfo extends Component {
  componentDidMount() {}

  render() {
    const styles = {
      paper: {},
    };
    return (
      <Paper>
        <ul>
          {this.props.products.map((product, idx) => (
            <li key={idx}>
              <ul>
                {Object.keys(product)
                  .filter((key) => product[key])
                  .map((key) => (
                    <li key={key}>
                      {key}:{product[key]}
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      </Paper>
    );
  }
}

const mapState = (state) => {
  return {
    products: state.product.bcData.barcodeData.products,
  };
};

const mapDispatch = (dispatch) => {
  return {};
};

export default connect(mapState, mapDispatch)(ProductInfo);
