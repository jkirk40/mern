import React, { Component } from 'react';
import { Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo.svg";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "./actions/authActions";

class Navbar extends Component {

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="https://github.com/jkirk40" target="_blank">
          <img src={logo} width="30" height="30" alt="react logo"/>
        </a>
        <Link to="/" className="navbar-brand">Home!</Link>
        {/* <div className="collapse nav-collapse"> */}
        <div className="nav-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/list" className="nav-link">Item List</Link>
            </li>
            <li className="navbar-item">
              <Link to="/create" className="nav-link">Create Item</Link>
            </li>
            <li className="navbar-item">
              <a className="nav-link" onClick={this.onLogoutClick}>Log Out</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);