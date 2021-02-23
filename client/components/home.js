import React from 'react';
import { connect } from 'react-redux';
import BarcodeScannerComponent from 'react-webcam-barcode-scanner';
import { setBarcode } from '../store/product';
/**
 * COMPONENT
 */
export const Home = (props) => {
  const { email } = props;
  const [data, setData] = React.useState('Not Found');
  async function onUpdate(err, result) {
    if (result) {
      setData(result.text);
      console.log(result);
      props.setBarcode(result);
    }
  }
  return (
    <div>
      <h3>Welcome, {email}</h3>

      <BarcodeScannerComponent
        width={500}
        height={500}
        onUpdate={(err, result) => {
          onUpdate(err, result);
        }}
      />
      <p>{data}</p>
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
