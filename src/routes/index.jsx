import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import * as pages from '../pages';
import PrivateRoute from './PrivateRoute';
import AuthRoute from './AuthRoute';

export default function routes() {
  return (
    <div className="container">
      <ToastContainer hideProgressBar={true} />
      <Switch>
        <Route exact path="/" component={pages.HomePage} />
        <Route exact path="/products" component={pages.ProductList} />
        <Route exact path="/products/types/:typeId" component={pages.ProductList} />
        <Route exact path="/cart" component={pages.Cart} />
        <Route exact path="/products/:productId" component={pages.ProductInfo} />
        <AuthRoute exact path="/auth/resetpassword" component={pages.ResetPasswordPage} />
        <PrivateRoute exact path="/profile" component={pages.Profile} />
        <PrivateRoute exact path="/orders/me" component={pages.OrderList} />
      </Switch>
    </div>
  )
}
