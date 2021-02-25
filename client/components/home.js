import React from 'react';
import { connect } from 'react-redux';
import BarcodeScannerComponent from 'react-webcam-barcode-scanner';
import { setBarcode } from '../store/product';
import ProductInfo from './ProductInfo';
import RecallInfo from './RecallInfo';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { email } = props.state.auth;
  const [data, setData] = React.useState('Not Found');
  const [scan, setScan] = React.useState(false);
  async function onUpdate(err, result) {
    if (result) {
      setData(result.text);
      // console.log(result);
    }
  }
  const product = props.state.product;
  if (product.bcData.fdaData) {
    // console.log(product.bcData.fdaData.results[0]);
  }
  return (
    <div>
      <h2>Welcome, {email}</h2>
      <h2>You may need to accept camera permissions :)</h2>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setScan(!scan)}
      >
        Toggle the Scanner!
      </Button>
      <Container>
        {scan && (
          <BarcodeScannerComponent
            width={'50%'}
            // height={250}
            onUpdate={(err, result) => {
              onUpdate(err, result);
            }}
          />
        )}
      </Container>

      <p>Barcode Number scanned: {data}</p>

      <br />
      {data && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setScan(false);
            props.setBarcode(data);
          }}
        >
          Look this up!!
        </Button>
      )}

      {props.state.product.bcData.barcodeData && <ProductInfo />}

      <br />
      {props.state.product.bcData.fdaData ? (
        <RecallInfo />
      ) : (
        'no recalls found yet'
      )}

      <div className="staging">
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => onUpdate('', { text: '0853584002201' })}
        >
          Staging: Fake Barcode if Camera fails
        </Button>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    state,
  };
};

const mapDispatch = (dispatch) => {
  return {
    setBarcode: (bc) => dispatch(setBarcode(bc)),
  };
};

export default connect(mapState, mapDispatch)(Home);
