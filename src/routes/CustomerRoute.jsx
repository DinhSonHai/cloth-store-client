import React from 'react';
import { Route } from 'react-router-dom';

import * as pages from '../pages';
import PrivateRoute from './PrivateRoute';
import { NavBar, Footer } from '../pages';

function CustomerRoute(props) {
  return (
    <div className="customer-page">
      <NavBar />

      <Route exact path="/" component={pages.HomePage} />
      <Route exact path="/products" component={pages.ProductList} />
      <Route exact path="/products/types/:typeId" component={pages.ProductList} />
      <Route exact path="/cart" component={pages.Cart} />
      <Route exact path="/products/:productId" component={pages.ProductInfo} />
      <Route exact path="/auth/resetpassword/:token" component={pages.ResetPasswordPage} />
      <PrivateRoute exact path="/profile" component={pages.Profile} />
      <PrivateRoute exact path="/orders/me" component={pages.OrderList} />

      <Footer />
    </div>
  );
}

export default CustomerRoute;