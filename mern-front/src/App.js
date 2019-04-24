import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import {Provider} from 'react-redux';
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css";
import Landing from "./components/landing";
import Login from "./components/login";
import Register from "./components/register";
import CreateItem from "./components/create-item.component";
import EditItem from "./components/edit-item.component";
import ItemList from "./components/item-list.component";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./navbar";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="container">
            <Navbar />
            <Route path="/" exact component={Landing} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Switch>
              <PrivateRoute path="/list" component={ItemList} />
              <PrivateRoute path="/edit/:id" component={EditItem} />
              <PrivateRoute path="/create" component={CreateItem} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
