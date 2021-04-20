import axios from 'axios';
import { toast } from 'react-toastify';
import { GET_ALL_COLLECTIONS } from '../types';

// Action creator
export const getAllCollections = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/collections');
    dispatch({
      type: GET_ALL_COLLECTIONS,
      payload: res.data,
    });
  } catch (err) {
    const error = err.response.data;
    if (error) {
      toast.error(error.message);
    }
  }
}