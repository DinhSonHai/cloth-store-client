
import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store.js';

import Routes from './routes';
import { NavBar, Footer } from './pages';
import setAuthToken from './utils/setAuthToken.js';
import { loadUser } from './redux/actions/auth.js';
import axios from 'axios';
import { LOG_OUT } from './redux/types.js';

function App() {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());
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
          <NavBar />
          <Routes />
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
