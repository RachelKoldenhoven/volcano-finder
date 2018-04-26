import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import volcanoes from './volcano.json';


export default class Map extends Component {

    componentDidMount() {
        this.loadMap();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }
        if (prevProps.location !== this.props.location) {
            this.loadMap();
        }
    }

    loadMap() {
        if (this.props && this.props.google) {
            const {google} = this.props;
            const maps = google.maps;
            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);
            const geocoder = new maps.Geocoder();


            let zoom = 2;
            let lat = 37.774929;
            let lng = -122.419416;

            if (this.props.location !== '') {
                geocoder.geocode({'address': this.props.location}, ((results, status) => {
                    if (status === google.maps.GeocoderStatus.OK) {
                        const userLocation = new maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
                        let minDistance = 10000000;
                        let closestVolcano = "";
                        for (let volcano of volcanoes) {
                            let volcanoLoc = new google.maps.LatLng(volcano.Latitude, volcano.Longitude);
                            let distance = google.maps.geometry.spherical.computeDistanceBetween(userLocation, volcanoLoc);
                            if (distance <= minDistance) {
                                minDistance = distance;
                                closestVolcano = volcano;
                                console.log(closestVolcano);
                            }
                        }
                    } else {
                        alert("Geocode was not successful for the following reason: " + status);
                    }
                }))
            }

            const center = new maps.LatLng(lat, lng);
            const mapConfig = Object.assign({}, {
                center: center,
                zoom: zoom,
                gestureHandling: 'cooperative'
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