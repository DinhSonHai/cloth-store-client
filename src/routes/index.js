import { Route, Switch } from 'react-router-dom';

import * as pages from '../pages';

export default function routes() {
  return (<Switch>
    <Route exact path="/" component={pages.HomePage} />
    <Route exact path="/products" component={pages.ProductList} />
    <Route exact path="/cart" component={pages.Cart} />
  </Switch>)
}
