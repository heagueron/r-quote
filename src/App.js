import React, { Component } from 'react';

import './App.css';
import Quote from './quote';

class App extends Component {
  render() {
    return (
      <div>

        <div className="App">
          <header className="App-header">
            <h1 className="App-title">r-Quote Simple Quotation Form</h1>
            <p> Built with: ReactJS, RXJS, CSS Grid </p>
            <p> Developer: Héctor Agüero / heagueron@gmail.com </p>
          </header>
        </div>

        <div className="quote-container">
          <Quote />
        </div>

      </div>
    );
  }
}

export default App;
