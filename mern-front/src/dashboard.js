import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import {Provider} from 'react-redux';
import store from "./store";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import Landing from "./components/landing";
import CreateItem from "./components/create-item.component";
import EditItem from "./components/edit-item.component";
import ItemList from "./components/item-list.component";
import PrivateRoute from "./components/PrivateRoute";
import logo from "./logo.svg";

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
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <a className="navbar-brand" href="https://github.com/jkirk40" target="_blank">
                <img src={logo} width="30" height="30" alt="react logo"/>
              </a>
              <Link to="/" className="navbar-brand">Home!</Link>
              {/* <div className="collapse nav-collapse"> */}
              <div className="nav-collapse">
                <ul className="navbar-nav mr-auto">
                  <li className="navbar-item">
                    <Link to="/" className="nav-link">Item List</Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/create" className="nav-link">Create Item</Link>
                  </li>
                  <li className="navbar-item" onClick={this.onLogoutClick}>
                      Logout
                  </li>
                </ul>
              </div>
            </nav>
            <Route path="/" exact component={Landing} />
            <Route path="/edit/:id" component={EditItem} />
            <Route path="/create" component={CreateItem} />
            <Switch>
              <PrivateRoute exact path="/list" component={ItemList} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

App.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(App);
