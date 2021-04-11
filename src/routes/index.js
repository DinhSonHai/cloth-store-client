import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import * as pages from '../pages';

export default function routes() {
  return (
    <div className="container">
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={pages.HomePage} />
        <Route exact path="/products" component={pages.ProductList} />
        <Route exact path="/cart" component={pages.Cart} />
      </Switch>
    </div>
  )
}
