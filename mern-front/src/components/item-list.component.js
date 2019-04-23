import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Item = props => (
    <tr>
        <td className={props.item.item_complete ? 'completed' : ''}>{props.item.item_description}</td>
        <td className={props.item.item_complete ? 'completed' : ''}>{props.item.item_responsible}</td>
        <td className={props.item.item_complete ? 'completed' : ''}>{props.item.item_priority}</td>
        <td>
            <Link to={"/edit/"+props.item._id}>Edit</Link>
        </td>
    </tr>
)

class ItemList extends Component {
    constructor(props){
        super(props);
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        console.log(this.props);
        axios.get('http://localhost:4000/items/'+this.props.auth.user.id)
            .then(res => {
                this.setState({items: res.data});
            })
            .catch(function(err) {
                console.log(err);
            })
    }

    componentDidUpdate() {
        axios.get('http://localhost:4000/items/'+this.props.auth.user.id)
            .then(res => {
                this.setState({items: res.data});
            })
            .catch(function(err) {
                console.log(err);
            })
    }

    itemList(){
        return this.state.items.map(function(currentItem, i){
            return <Item item = {currentItem} key={i}/>
        });
    }

    render() {
        return(
            <div>
                <h3>Item List</h3>
                <table className="table table-striped" style={{ marginTop: 20}}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.itemList()}
                    </tbody>
                </table>
            </div>
        )
    }
}

ItemList.propTypes = {
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps
)(ItemList);