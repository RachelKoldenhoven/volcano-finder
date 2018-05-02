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

            let zoom = 2;
            let lat = 37.774929;
            let lng = -122.419416;

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

            if (this.props.location !== '') {
                this.loadSearchResult();
            }
        }
    }

    loadSearchResult() {
        const {google} = this.props;
        const maps = google.maps;
        const geocoder = new maps.Geocoder();

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
                    }
                }

                const displayDistance = Math.round(minDistance / 1000);
                const displayName = closestVolcano.Name;
                this.map.setCenter(results[0].geometry.location);
                this.map.setZoom(6);
                var marker = new google.maps.Marker({
                    icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
                    map: this.map,
                    position: results[0].geometry.location
                });
                const result = {
                    volcano: displayName,
                    distance: displayDistance
                };
                this.props.updateResult(result);
            } else {
                alert("Geocode was not successful for the following reason: " + status);
            }
        }))
    }

    render() {
        return (
            <div className="map" ref='map'>
                Loading map...
            </div>
        )
    }
}