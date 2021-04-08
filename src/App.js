import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegiterModal';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { NavBar, Footer, HomePage, ProductList, Cart } from './pages';

function App() {
  return (
    <Router>
      <div className="app">
        <NavBar />
        {/* <LoginModal /> */}
        {/* <RegisterModal /> */}
        {/* <HomePage /> */}
        {/* <ProductList /> */}
        <Cart />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
