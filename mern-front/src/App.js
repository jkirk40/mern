import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateItem from "./components/create-item.component";
import EditItem from "./components/edit-item.component";
import ItemList from "./components/item-list.component";
import logo from "./logo.svg";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="https://github.com/jkirk40" target="_blank">
              <img src={logo} width="30" height="30" alt="react logo"/>
            </a>
            <Link to="/" className="navbar-brand">Home</Link>
            {/* <div className="collapse nav-collapse"> */}
            <div className="nav-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Item List</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Item</Link>
                </li>
              </ul>
            </div>
          </nav>
          <Route path="/" exact component={ItemList} />
          <Route path="/edit/:id" component={EditItem} />
          <Route path="/create" component={CreateItem} />
        </div>
      </Router>
    );
  }
}

export default App;
