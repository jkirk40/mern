import React, { Component } from "react";
import {Link} from "react-router-dom";

class Landing extends Component {
    render() {
        return (
        <div className="">
            <div className="">
                <Link to="/register" className="btn btn-large waves-effect waves-light hoverable blue accent-3">Register</Link>
                <Link to="/login" style={{
                    marginLeft: "2rem"
                }}
                className="btn btn-large waves-effect white hoverable black-text"
                >Log In</Link>
            </div>
        </div>
        );
    }
}

export default Landing;