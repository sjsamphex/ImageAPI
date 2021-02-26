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
        <h3 className="recalled">
          {' '}
          &#128169; Ah shit there's at least one recall &#128169;
        </h3>
        <ul>
          {results.map((result, idx) => (
            <ul key={idx}>
              <li>Report Date: {result.report_date}</li>
              <li>FDA Product Description: {result.product_description}</li>
              <li>Reported Reason for Recall: {result.reason_for_recall}</li>
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
