import React, {Component} from 'react';
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";

class EditItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            item_description: '',
            item_responsible: '',
            item_priority: '',
            item_complete: false
        }
    }

    componentDidMount(){
        axios.get('http://localhost:4000/items/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    item_description: response.data.item_description,
                    item_responsible: response.data.item_responsible,
                    item_priority: response.data.item_priority,
                    item_complete: response.data.item_complete
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onChangeComplete = (e) => {
        this.setState({
            item_complete: !this.state.item_complete
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const obj = {
            item_description: this.state.item_description,
            item_responsible: this.state.item_responsible,
            item_priority: this.state.item_priority,
            item_complete: this.state.item_complete
        };
        axios.post('http://localhost:4000/items/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/');
    }

    render() {
        return(
            <div>
                <h3>Update Item</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                                className="form-control"
                                name="item_description"
                                value={this.state.item_description}
                                onChange={this.onChange}
                                />
                    </div>
                    <div className="form-group">
                        <label>Responsible: </label>
                        <input type="text"
                                className="form-control"
                                name="item_responsible"
                                value={this.state.item_responsible}
                                onChange={this.onChange}
                                />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  type="radio"
                                    name="item_priority"
                                    id="priority-low"
                                    className="form-check-input"
                                    value="Low"
                                    checked={this.state.item_priority === 'Low'}
                                    onChange={this.onChange}
                                    />
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  type="radio"
                                    name="item_priority"
                                    id="priority-medium"
                                    className="form-check-input"
                                    value="Medium"
                                    checked={this.state.item_priority === 'Medium'}
                                    onChange={this.onChange}
                                    />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  type="radio"
                                    name="item_priority"
                                    id="priority-high"
                                    className="form-check-input"
                                    value="High"
                                    checked={this.state.item_priority === 'High'}
                                    onChange={this.onChange}
                                    />
                            <label className="form-check-label">High</label>
                        </div>
                    </div>
                    <div className="form-check">
                        <input type="checkbox"
                                className="form-check-input"
                                id="completedCheckbox"
                                name="item_complete"
                                onChange={this.onChangeComplete}
                                checked={this.state.item_complete}
                                value={this.state.item_complete}
                                />
                        <label className="form-check-label" htmlFor="completedCheckbox">Completed</label>
                    </div>
                    <br />
                    <div className="form-group">
                        <input type="submit" value="Update Item" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}

EditItem.propTypes = {
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps
)(EditItem);