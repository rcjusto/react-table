import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {generateData, TYPES} from "./services";

class App extends Component {
    render() {

        const config = {
            size: {
                columns: 10,
                rows: 1000
            },
            columns: [
                {},
                {type: TYPES.INTEGER},
                {type: TYPES.SENTENCE},
                {type: TYPES.DECIMAL}
            ]
        };

        const data = generateData(config);
        console.log(data);

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>
        );
    }
}

export default App;
