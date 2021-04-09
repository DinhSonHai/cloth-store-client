import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store.js';

import Routes from './routes';
import { NavBar, Footer } from './pages';

function App() {
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
