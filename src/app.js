import React, { Component } from 'react';

import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-dom';

import './app.scss';

import FakeSearchBar from './FakeSearchBar';
import SearchBar from './SearchBar';
import LeftColumn from './LeftColumn';
import RightColumn from './RightColumn';

const searchClient = algoliasearch('testingKGR8YDKK66', '184ad8b85ddf60550a7a38ec812606d0');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      overlayDisplayed: true
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
              <InstantSearch searchClient={searchClient} indexName="products">
                <div id="euip-wrapper">
                  <div className="euip">
                    <SearchBar />
                    <LeftColumn />
                    <RightColumn />
                  </div>
                </div>
              </InstantSearch>
          }
        </React.Fragment>
    );
  }
}

export default App;
