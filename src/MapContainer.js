import React, {Component} from 'react';
import {GoogleApiWrapper} from 'google-maps-react';
import Map from './Map';

export class MapContainer extends Component {

    render() {
        const style = {
            width: '100vw',
            height: '100vh'
        };
        return (
            <div style={style}>
                <Map google={this.props.google}
                     location={this.props.location}/>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBeI_wgf899Ko6UgJL7sVq9xu0ZRN-Oog0',
    libraries: ['places', 'geometry']
})(MapContainer)