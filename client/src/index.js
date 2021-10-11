import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import AdminActivation from './components/auth/admin_activation';
import ProtectedContent from './components/protected_content';
import AdminArea from './components/admin_area';
import RequireAuth from './components/auth/require_auth';
import RequireAdmin from './components/auth/require_admin';
import Default from './components/default';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';
import { SET_ADMIN_PRIVILEGES } from './actions/types';
import jwt_decode from 'jwt-decode';




const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
// update application state with token information if needed
if (token) {
  // update authentication flag
  store.dispatch({ type: AUTH_USER });

  // update admin privileges if needed
  let decoded_token = jwt_decode(token);
  if (decoded_token.role == 'admin') {
    store.dispatch({ type: SET_ADMIN_PRIVILEGES });
  }

}


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Default} />
        <Route path="signin" component={Signin} />
        <Route path="signout" component={Signout} />
        <Route path="signup" component={Signup} />
        <Route path="protected_content" component={RequireAuth(ProtectedContent)} />
        <Route path="admin_area" component={RequireAdmin(AdminArea)} />
        <Route path="admin_activation" component={RequireAdmin(AdminActivation)} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
