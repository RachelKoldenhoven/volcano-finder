import React, {Component} from 'react';


export default class Address extends Component {
    constructor(props) {
        super(props);
        this.state = {location: JSON.parse(JSON.stringify(props.location))};
    }

    changed = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({...this.state, [name]: value});
    };

    render() {
        return (
            <div className="AddressComp">
                <span>Enter a Location to Find the Nearest Volcano</span>
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