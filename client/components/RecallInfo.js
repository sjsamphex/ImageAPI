import React, { Component } from 'react';
import { connect } from 'react-redux';

import Paper from '@material-ui/core/Paper';

class RecallInfo extends Component {
  render() {
    const styles = {
      paper: {},
    };
    const { results } = this.props;
    console.log(results);
    return (
      <Paper>
        <h3>Ah shit there was a recall</h3>
        <ul>
          {results.map((result, idx) => (
            <ul key={idx}>
              <li>{result.product_description}</li>
              <li>{result.reason_for_recall}</li>
            </ul>
          ))}
        </ul>
      </Paper>
    );
  }
}

const mapState = (state) => {
  return {
    results: state.product.bcData.fdaData.results,
  };
};

const mapDispatch = (dispatch) => {
  return {};
};

export default connect(mapState, mapDispatch)(RecallInfo);
