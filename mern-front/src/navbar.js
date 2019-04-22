import React, { Component } from 'react';
import { BrowserRouter as Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo.svg";

class Navbar extends Component {

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
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;