import React, { Component } from 'react';
import { InstantSearch } from 'react-instantsearch-dom';

import config from './config.json';

import FakeSearchBar from './top/FakeSearchBar';
import SearchBar from './top/SearchBar';
import LeftColumn from './left-column/LeftColumn';
import RightColumn from './right-column/RightColumn';

import Configuration from './shared/Configuration';
import QueryRulesHandler from './shared/QueryRulesHandler';
import {
  searchClient,
  createURL,
  urlToSearchState,
  searchStateToUrl,
  shouldDisplayOverlayAtLaunch,
} from './shared/Tools';

import './app.scss';

class App extends Component {
  constructor(props) {
    super(props);

    const searchState = urlToSearchState(props.location);

    this.state = {
      searchState: searchState,
      lastLocation: props.location,
      overlayDisplayed: shouldDisplayOverlayAtLaunch(searchState)
    };

    this.displaySearchOverlay = this.displaySearchOverlay.bind(this);
    this.onSearchStateChange = this.onSearchStateChange.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (typeof props.location.state === 'undefined' || props.location !== state.lastLocation) {
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

      if (config.GOOGLE_ANALYTICS) {
        window.ga('send', 'pageView', `?query=${searchState.query}`);
      }
    }, 400);

    this.setState({ searchState });
  };

  displaySearchOverlay = (overlayDisplayed = true) => {
    this.setState({ overlayDisplayed });
  };

  render() {
    const { overlayDisplayed, searchState } = this.state;

    return (
      <React.Fragment>
        <FakeSearchBar onInputClick={() => this.displaySearchOverlay(true)} />

        {overlayDisplayed &&
          <InstantSearch searchClient={searchClient}
                         indexName="products"
                         searchState={searchState}
                         onSearchStateChange={this.onSearchStateChange}
                         createURL={createURL}>
            <Configuration searchState={searchState} />
            <QueryRulesHandler searchState={searchState} />
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
