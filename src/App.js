
import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store.js';

import Routes from './routes';
import setAuthToken from './utils/setAuthToken.js';
import { loadUser } from './redux/actions/auth.js';
import { UPDATE_CART } from './redux/types';
import { getAllProductsCart } from './redux/actions/products.js';

function App() {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    if (JSON.parse(localStorage.cart).length > 0) {
      store.dispatch({
        type: UPDATE_CART,
        payload: { isHaveCart: true, cart: JSON.parse(localStorage.cart) },
      });

      let cartCopy = JSON.parse(localStorage.cart);

      if (cartCopy.length > 0) {
        let list = cartCopy.map(item => item.productId);
        store.dispatch(getAllProductsCart(list));
      }
    }
    // window.addEventListener('storage', () => {
    //   if (
    //     !localStorage.token ||
    //     axios.defaults.headers.common['x-auth-token'] !== localStorage.token
    //   ) {
    //     store.dispatch({ type: LOG_OUT });
    //   }
    // });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Routes />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
