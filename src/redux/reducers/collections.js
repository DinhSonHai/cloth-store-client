import {
  GET_ALL_COLLECTIONS
} from '../types';

const initialState = {
  collections: []
};

export default function collections(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_COLLECTIONS:
      return {
        ...state,
        collections: payload
      }
    default:
      return state;
  }
}
