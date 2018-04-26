import React, {Component} from 'react';


export default class Address extends Component {
    constructor(props) {
        super(props);
        this.state = JSON.parse(JSON.stringify(props.location));
    }

    changed = (event) => {
        const newState = {
            location: event.target.value
        };
        this.setState(newState);
    };

    render() {
        return (
            <div>
                <span>Enter a Location</span>
                <input
                    type="text"
                    name="location"
                    value={this.state.location}
                    onChange={(event) => this.changed(event)}
                />
                <button onClick={() => this.props.search(this.state.location)}>
                    Search
                </button>
            </div>
        )
    }
}