import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import volcanoes from './volcano.json';


export default class Map extends Component {
    locations = [];

    componentDidMount() {
        this.loadMap();

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }
    }

    loadMap() {
        if (this.props && this.props.google) {
            const {google} = this.props;
            const maps = google.maps;
            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);

            let zoom = 2;
            let lat = 37.774929;
            let lng = -122.419416;
            const center = new maps.LatLng(lat, lng);
            const mapConfig = Object.assign({}, {
                center: center,
                zoom: zoom
            });
            this.map = new maps.Map(node, mapConfig);
            volcanoes.forEach(volcano => {
                const mapData = {lat: volcano.Latitude, lng: volcano.Longitude, name: volcano.Name};
                const marker = new google.maps.Marker({
                    position: {lat: mapData.lat, lng: mapData.lng},
                    map: this.map,
                    title: mapData.name
                })
            });

        }

    }

    render() {
        return (
            <div className="map" ref='map'>
                Loading map...
            </div>
        )
    }
}