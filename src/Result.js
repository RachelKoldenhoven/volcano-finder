import React, {Component} from 'react';

export default class Result extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <p>Volcano: {this.props.result.volcano}</p>
                <p>Distance from chosen location: {this.props.result.distance} Km</p>
            </div>
        )
    }
}