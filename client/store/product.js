import axios from 'axios';
import history from '../history';

const storage = () => window.localStorage;
const TOKEN = 'token';

/**
 * ACTION TYPES
 */
const SET_BARCODE = 'SET_BARCODE';

/**
 * ACTION CREATORS
 */
const _setBarcode = (bc, bcData) => ({ type: SET_BARCODE, bc, bcData });

/**
 * THUNK CREATORS
 */
export const setBarcode = (bc) => async (dispatch) => {
  const data = await axios.post('/api/lookup/', {
    bc,
  });
  if (data) {
    console.log(data);
    return dispatch(_setBarcode(bc, data.data));
  }
};

const initState = {
  bc: '',
  bcData: {},
};

/**
 * REDUCER
 */
export default function (state = initState, action) {
  switch (action.type) {
    case SET_BARCODE:
      return { ...state, bc: action.bc, bcData: action.bcData };
    default:
      return state;
  }
}
