import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import PrivateRoute from './PrivateRoute';

import * as pages from '../pages';

export default function routes() {
  return (
    <div className="container">
      <ToastContainer hideProgressBar={true} />
      <Switch>
        <Route exact path="/" component={pages.HomePage} />
        <Route exact path="/products" component={pages.ProductList} />
        <Route exact path="/cart" component={pages.Cart} />
        <Route exact path="/products/:productId" component={pages.ProductInfo} />
        <Route exact path="/profile" component={pages.Profile} />
        <PrivateRoute exact path="/orders/me" component={pages.OrderList} />
      </Switch>
    </div>
  )
}
