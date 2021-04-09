import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store.js';

import { NavBar, Footer, ProductList } from './pages';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <NavBar />
          {/* <HomePage /> */}
          <ProductList />
          {/* <Cart /> */}
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
