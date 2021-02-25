import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const FETCH_PRODUCTS = 'FETCH_PRODUCTS';

/**
 * ACTION CREATORS
 */
const _fetchProducts = (products) => ({ type: FETCH_PRODUCTS, products });

/**
 * THUNK CREATORS
 */
export const fetchProducts = () => async (dispatch) => {
  const data = await axios.get('/api/products/');
  if (data) {
    return dispatch(_fetchProducts(data.data));
  }
};

const initState = {
  products: [],
};

/**
 * REDUCER
 */
export default function (state = initState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return { ...state, products: action.products };
    default:
      return state;
  }
}
