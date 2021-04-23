import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import * as pages from '../pages';
import PrivateRoute from './PrivateRoute';
import CustomerRoute from './CustomerRoute';

export default function routes() {
  return (
    <div className="container">
      <ToastContainer hideProgressBar={true} />
      <Switch>
        {/* <Route exact path="/admin" component={pages.AdminPage} /> */}
        <Route exact path="/admin/login" component={pages.AdminLoginPage} />

        <Route component={CustomerRoute} />
      </Switch>
    </div>
  )
}
