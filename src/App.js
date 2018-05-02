import React, {Component} from 'react';
import './styles/App.css';
import './styles/normalize.css';
import './styles/skeleton.css';

import MapContainer from './MapContainer';
import Address from './Address';
import Result from "./Result";

const headerImg = require('./assets/jack-ebnet-391376-unsplash.jpg');

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: '',
            result: {
                volcano: '',
                distance: undefined
            }
        };
    }

    search(location) {
        this.setState({...this.state, location: location});

        console.log(this.state.location);
    }

    updateResult(result) {
        this.setState({...this.state, result: result});
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={headerImg} className="App-logo" alt="Jack Ebnet on Unsplash"
                         title="Photo by Jack Ebnet on Unsplash"/>
                    <h1 className="App-title">Welcome to Volcano Finder</h1>
                </header>
                <div className="myContainer">
                    <div className="Sidebar">
                        <Address location={this.state.location}
                                 search={(location) => this.search(location)}/>
                        <Result result={this.state.result}/>
                    </div>
                    <MapContainer className="mapContainer"
                                  google={this.props.google}
                                  location={this.state.location}
                                  updateResult={(result) => this.updateResult(result)}/>
                </div>
            </div>
        );
    }
}

export default App;
