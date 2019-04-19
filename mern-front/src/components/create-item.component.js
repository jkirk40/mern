import React, {Component} from 'react';
import axios from 'axios';

export default class CreateItem extends Component {

    constructor(props){
        super(props);

        this.state = {
            item_description: '',
            item_responsible: '',
            item_priority: '',
            item_complete: false
        }
    }

    onChangeFormText = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onChangePriority = (e) => {
        this.setState({
            item_priority: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();

        console.log('Form submitted');
        console.log(`Description: ${this.state.item_description}`);
        console.log(`Responsible: ${this.state.item_responsible}`);
        console.log(`Priority: ${this.state.item_priority}`);
        console.log(`Completed: ${this.state.item_complete}`);

        const newItem = {
            item_description: this.state.item_description,
            item_responsible: this.state.item_responsible,
            item_priority: this.state.item_priority,
            item_complete: this.state.item_complete,
        }

        axios.post('http://localhost:4000/items/add', newItem)
            .then(res => console.log(res.data));

        this.setState({
            item_description: '',
            item_responsible: '',
            item_priority: '',
            item_complete: false
        })
    }

    render() {
        return(
            <div style={{marginTop: 20}}>
                <h3>Create New Item</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Description:</label>
                        <input  type="text"
                                name="item_description"
                                className="form-control"
                                value={this.state.item_description}
                                onChange={this.onChangeFormText}
                                />
                    </div>
                    <div className="form-group">
                        <label>Responsible:</label>
                        <input  type="text"
                                name="item_responsible"
                                className="form-control"
                                value={this.state.item_responsible}
                                onChange={this.onChangeFormText}
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
                                    onChange={this.onChangePriority}
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
                                    onChange={this.onChangePriority}
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
                                    onChange={this.onChangePriority}
                                    />
                            <label className="form-check-label">High</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Item" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}