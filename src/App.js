import React, {Component} from 'react';
import './styles/App.css';
import './styles/normalize.css';
import './styles/skeleton.css';

import MapContainer from './MapContainer';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Welcome to Volcano Finder</h1>
                </header>
                <div className="myContainer">
                    <MapContainer className="mapContainer" google={this.props.google}/>
                </div>
            </div>
        );
    }
}

export default App;
