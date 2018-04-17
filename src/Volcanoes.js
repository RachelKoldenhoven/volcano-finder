import React, {Component} from 'react';

import volcanoes from './volcano.json';

export default class Volcanoes extends Component {
    constructor(props) {
        super();
        this.state = {
            volcanoes: []
        }
    }

    componentDidMount() {
        let locations = [];
        volcanoes.forEach(volcano => {
            const mapData = {lat: volcano.Latitude, lng: volcano.Longitude, name: volcano.Name};
            locations.push(mapData);
        });
        console.log(locations);
    }

    render() {
        return (
            <div>Volcanoes</div>
        )
    }

}