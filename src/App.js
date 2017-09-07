import React, { Component } from 'react';
import Header from './components/Header'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="Header">
          <h2>Hello World!</h2>
          <Header />
          {this.props.children}
         
        </div>

      </div>
    );
  }
}

export default App;
