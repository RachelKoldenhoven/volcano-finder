import React, {Component} from 'react';
import './styles/App.css';
import './styles/normalize.css';
import './styles/skeleton.css';

import MapContainer from './MapContainer';
import Address from './Address';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: ''
        };
    }

    search(location) {
        this.setState({...this.state, location: location});

        console.log(this.state.location);
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Welcome to Volcano Finder</h1>
                </header>
                <div className="myContainer">
                    <Address location={this.state.location}
                             search={(location) => this.search(location)}/>
                    <MapContainer className="mapContainer"
                                  google={this.props.google}
                                  location={this.state.location}/>
                </div>
            </div>
        );
    }
}

export default App;
