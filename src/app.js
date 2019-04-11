import React, { Component } from 'react';

import './app.scss';

import FakeSearchBar from './FakeSearchBar';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      overlayDisplayed: false
    };

    this.toggleDisplay = this.toggleDisplay.bind(this);
  }

  toggleDisplay(overlayDisplayed = true) {
    this.setState({ overlayDisplayed });
  };

  render() {
    const { overlayDisplayed } = this.state;

    return (
        <React.Fragment>
          <FakeSearchBar onInputClick={() => this.toggleDisplay(true)} />

          {overlayDisplayed &&
              <div id="euip-wrapper">
                <div className="euip">
                  <div className="euip--searchBar">
                    <h3>Searchbar</h3>
                  </div>
                  <div className="euip--categorieSuggestions">
                    <h3>Category Suggestions</h3>
                  </div>
                  <div className="euip--leftColumn">
                    <h3>Left Column</h3>
                  </div>
                  <div className="euip--rightColumn">
                    <h3>Right Column</h3>
                    <h3>Right Column</h3>
                    <h3>Right Column</h3>
                    <h3>Right Column</h3>
                    <h3>Right Column</h3>
                    <h3>Right Column</h3>
                    <h3>Right Column</h3>
                    <h3>Right Column</h3>
                    <h3>Right Column</h3>
                    <h3>Right Column</h3>
                    <h3>Right Column</h3>
                    <h3>Right Column</h3>
                    <h3>Right Column</h3>
                    <h3>Right Column</h3>
                    <h3>Right Column</h3>
                    <h3>Right Column</h3>
                    <h3>Right Column</h3>
                    <h3>Right Column</h3>
                    <h3>Right Column</h3>
                    <h3>Right Column</h3>
                    <h3>Right Column</h3>
                    <h3>Right Column</h3>
                    <h3>Right Column</h3>
                    <h3>Right Column</h3>
                    <h3>Right Column</h3>
                    <h3>Right Column</h3>
                    <h3>Right Column</h3>
                    <h3>Right Column</h3>
                    <h3>Right Column</h3>
                    <h3>Right Column</h3>
                    <h3>Right Column</h3>
                    <h3>Right Column</h3>
                    <h3>Right Column</h3>
                    <h3>Right Column</h3>
                    <h3>Right Column</h3>
                    <h3>Right Column</h3>
                    <h3>Right Column</h3>
                    <h3>Right Column</h3>
                    <h3>Right Column</h3>
                    <h3>Right Column</h3>
                    <h3>Right Column</h3>
                    <h3>Right Column</h3>
                    <h3>Right Column</h3>
                    <h3>Right Column</h3>
                    <h3>Right Column</h3>
                  </div>
                </div>
              </div>
          }
        </React.Fragment>
    );
  }
}

export default App;
