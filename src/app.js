import React, { Component } from 'react';
import { InstantSearch } from 'react-instantsearch-dom';

import './app.scss';

import FakeSearchBar from './FakeSearchBar';
import SearchBar from './SearchBar';
import LeftColumn from './LeftColumn';
import RightColumn from './RightColumn';

import { searchClient, createURL, urlToSearchState, searchStateToUrl } from './shared/Tools';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      overlayDisplayed: true,
      searchState: urlToSearchState(props.location),
      lastLocation: props.location
    };

    this.toggleDisplay = this.toggleDisplay.bind(this);
    this.onSearchStateChange = this.onSearchStateChange.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.location !== state.lastLocation) {
      return {
        searchState: urlToSearchState(props.location),
        lastLocation: props.location,
      };
    }

    return null;
  }

  onSearchStateChange = searchState => {
    clearTimeout(this.debouncedSetState);

    this.debouncedSetState = setTimeout(() => {
      this.props.history.push(
          searchStateToUrl(this.props, searchState),
          searchState
      );
    }, 400);

    this.setState({ searchState });
  };

  toggleDisplay(overlayDisplayed = true) {
    this.setState({ overlayDisplayed });
  };

  render() {
    const { overlayDisplayed, searchState } = this.state;

    return (
      <React.Fragment>
        <FakeSearchBar onInputClick={() => this.toggleDisplay(true)} />

        {overlayDisplayed &&
          <InstantSearch
                  searchClient={searchClient}
                  indexName="products"
                  searchState={searchState}
                  onSearchStateChange={this.onSearchStateChange}
                  createURL={createURL}
              >
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
