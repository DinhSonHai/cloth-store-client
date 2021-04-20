import axios from 'axios';
import { toast } from 'react-toastify';
import { GET_ALL_USERS_ORDERS } from '../types';
import { loadUser } from '../actions/auth';

// Action creator
export const getAllUsersOrders = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/orders');
    dispatch({
      type: GET_ALL_USERS_ORDERS,
      payload: res.data,
    });
  } catch (err) {
    const error = err.response.data;
    if (error) {
      toast.error(error.message);
    }
  }
}

export const cancelOrder = (orderId) => async (dispatch) => {
  try {
    await axios.put(`/api/orders/${orderId}`);
    dispatch(loadUser());
  } catch (err) {
    const error = err.response.data;
    if (error) {
      toast.error(error.message);
    }
  }
}