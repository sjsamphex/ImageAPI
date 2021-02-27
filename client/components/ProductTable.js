import React from 'react';
import { connect } from 'react-redux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { fetchProducts } from '../store/allProducts';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

class ProductTable extends React.Component {
  componentDidMount() {
    this.props.fetchProducts();
  }
  render() {
    const styles = {
      Table: {
        minWidth: 650,
        height: 200,
        overflowY: 'auto',
      },
      Row: {},
      Cell: {
        width: 130,
      },
    };

    return (
      <Container>
        <Paper variant="elevation" elevation={24}>
          <TableContainer>
            <Table stickyHeader style={styles.Table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Barcode</TableCell>
                  <TableCell align="left">Product Name</TableCell>
                  <TableCell align="left">Brand/Company</TableCell>
                  <TableCell align="right"># Recalls</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.barcode}</TableCell>
                    <TableCell component="th" scope="row">
                      {product.product_name}
                    </TableCell>
                    <TableCell align="left">
                      {product.brand ||
                        product.brand_owner ||
                        product.brands ||
                        product.company}
                    </TableCell>
                    <TableCell align="right">
                      {product.recalls.length}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    );
  }
} //end class

const mapState = (state) => {
  return {
    products: state.allProducts.products
      .filter((p) => p.status)
      .map((bc) => {
        let product = bc.barcodeData.product;
        product.recalls = bc.recalls;
        product.barcode = bc.barcode;
        return product;
      }),
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
  };
};

export default connect(mapState, mapDispatch)(ProductTable);
