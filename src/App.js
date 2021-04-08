import { BrowserRouter as Router } from 'react-router-dom';

import { NavBar, Footer } from './pages';

function App() {
  return (
    <Router>
      <div className="app">
        <NavBar />
        {/* <HomePage /> */}
        {/* <ProductList /> */}
        {/* <Cart /> */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
