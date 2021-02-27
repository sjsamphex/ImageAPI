import React, { Component } from 'react';
import { connect } from 'react-redux';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class RecallInfo extends Component {
  render() {
    const styles = {
      paper: {
        margin: '1rem',
      },
    };
    const { results } = this.props;
    console.log(results);
    return (
      <Paper variant="elevation" elevation={24} style={styles.paper}>
        <center>
          <h3 className="recalled">
            {' '}
            &#128169; Ah shit there's {results.length} recall(s) &#128169;
          </h3>
        </center>
        {/* <ul>
          {results.map((result, idx) => (
            <ul key={idx}>
              <li>Report Date: {result.report_date}</li>
              <li>FDA Product Description: {result.product_description}</li>
              <li>Reported Reason for Recall: {result.reason_for_recall}</li>
            </ul>
          ))}
        </ul> */}
        <TableContainer>
          <Table stickyHeader style={styles.Table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Report Date</TableCell>
                <TableCell align="left">FDA Product Description</TableCell>
                <TableCell align="right">Reported Reason for Recall</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((result, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    {result.report_date.replace(
                      /(\d{4})(\d{2})(\d{2})/g,
                      '$1-$2-$3'
                    )}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {result.product_description}
                  </TableCell>
                  <TableCell align="right">
                    {result.reason_for_recall}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
